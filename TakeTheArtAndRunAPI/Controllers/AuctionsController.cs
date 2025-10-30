namespace TakeTheArtAndRunAPI.Controllers;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TakeTheArtAndRunAPI.Data;
using TakeTheArtAndRunAPI.DTOs;
using TakeTheArtAndRunAPI.Models;

[ApiController]
[Route("api/[controller]")]
public class AuctionsController : ControllerBase
{
    private readonly AppDbContext _context;

    public AuctionsController(AppDbContext context)
    {
        _context = context;
    }

    // GET /api/auctions
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Auction>>> GetAuctionsAsync()
    {
        var auctions = await _context.Auctions.ToListAsync();
        return Ok(auctions);
    }

    // GET /api/auctions/{id}
    [HttpGet]
    [Route("{id}")]
    public async Task<ActionResult<Auction>> GetAuctionByIdAsync(string id)
    {
        var auction = await _context.Auctions.FindAsync(id);
        if (auction == null)
        {
            return NotFound();
        }
        return Ok(auction);
    }

    // POST /api/auctions
    [HttpPost]
    public async Task<ActionResult<Auction>> CreateAuctionAsync([FromBody] AuctionCreateDto dto)
    {
        var newAuction = new Auction
        (
            title: dto.Title,
            artist: dto.Artist,
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
}

