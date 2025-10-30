namespace TakeTheArtAndRunAPI.Controllers;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using TakeTheArtAndRunAPI.Data;
using TakeTheArtAndRunAPI.DTOs;
using TakeTheArtAndRunAPI.Mappers;
using TakeTheArtAndRunAPI.Models;

[ApiController]
[Route("api/[controller]")]
public class AuctionsController(AppDbContext context) : ControllerBase
{
    private readonly AppDbContext _context = context;

    // GET /api/auctions
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Auction>>> GetAuctionsAsync()
    {
        var auctions = await _context.Auctions
            .Where(a => !a.IsSold)
            .ToListAsync();

        var dtos = auctions.Select(a => a.ToDto()).ToList();

        return Ok(auctions);
    }

    // GET /api/auctions/{id}
    [HttpGet]
    [Route("{id}")]
    public async Task<ActionResult<Auction>> GetAuctionByIdAsync(Guid id)
    {
        var auction = await _context.Auctions
            .Where(a => !a.IsSold)
            .FirstOrDefaultAsync(a => a.Id == id);

        if (auction == null)
            return NotFound();

        return Ok(auction.ToDto());
    }

    // POST /api/auctions
    [HttpPost]
    [Authorize(Roles = "Artist")]
    public async Task<ActionResult<Auction>> CreateAuctionAsync([FromBody] AuctionWriteDto dto)
    {
        var artistId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var newAuction = new Auction
        (
            title: dto.Title,
            artistId: artistId,
            imageUrl: dto.ImageUrl,
            limit: dto.Limit,
            medium: dto.Medium,
            dimensions: dto.Dimensions,
            artistBio: dto.ArtistBio
        );

        _context.Auctions.Add(newAuction);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetAuctionByIdAsync), new { id = newAuction.Id }, newAuction);
    }

    // PUT /api/auctions/{id} - only the artist who created it
    [HttpPut("{id}")]
    [Authorize(Roles = "Artist")]
    public async Task<IActionResult> UpdateAuctionAsync(string id, [FromBody] AuctionWriteDto dto)
    {
        var auction = await _context.Auctions.FindAsync(id);
        if (auction == null)
            return NotFound();

        var currentUserIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(currentUserIdString, out var currentUserId))
            return Forbid("Invalid user ID.");
        if (auction.ArtistId != currentUserId)
            return Forbid("You can only update your own auctions.");

        auction.Title = dto.Title;
        auction.ImageUrl = dto.ImageUrl;
        auction.Limit = dto.Limit;
        auction.Medium = dto.Medium;
        auction.Dimensions = dto.Dimensions;
        auction.ArtistBio = dto.ArtistBio;

        await _context.SaveChangesAsync();
        return NoContent();
    }

    // POST /api/auctions/{id}/bid - any logged-in user
    [HttpPost("{id}/bid")]
    [Authorize]
    public async Task<IActionResult> PlaceBidAsync(string id, [FromBody] decimal bidAmount)
    {
        var auction = await _context.Auctions.FindAsync(id);
        if (auction == null) return NotFound();

        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (string.IsNullOrEmpty(userId))
            return Forbid("Invalid user ID.");

        var success = auction.PlaceBid(userId, bidAmount, out bool sold);

        if (!success) return BadRequest("Bid not accepted. Either too low or auction is sold.");

        // Only create transaction if auction sold
        if (sold)
        {
            var transaction = new Transaction(userId, auction.Id, auction.HighestBid);
            _context.Transactions.Add(transaction);
        }

        await _context.SaveChangesAsync();
        return Ok(auction);
    }
}

