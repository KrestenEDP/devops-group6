namespace TakeTheArtAndRunAPI.Controllers;

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TakeTheArtAndRunAPI.Data;
using TakeTheArtAndRunAPI.Models;

[ApiController]
[Route("api/[controller]")]
public class ArtistsController(AppDbContext context, UserManager<User> userManager) : ControllerBase
{
    // GET /api/artists
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Artist>>> GetArtistsAsync()
    {
        var artists = await context.Artists.ToListAsync();
        return Ok(artists);
    }

    // POST /api/artists
    [HttpPost]
    [Authorize(Policy = Policies.Admin)]
    public async Task<IActionResult> CreateArtist([FromBody] ArtistCreateDto dto)
    {
        var user = await userManager.FindByIdAsync(dto.UserId);
        if (user == null) return NotFound(new { message = "User not found" });

        user.Role = UserRole.Artist;
        await userManager.AddToRoleAsync(user, "Artist");

        var artist = new Artist
        {
            Name = dto.Name,
            Bio = dto.Bio,
            UserId = dto.UserId
        };

        context.Artists.Add(artist);
        await context.SaveChangesAsync();

        return Ok(new { message = "Artist created and role assigned", artistId = artist.Id });
    }

    // PUT /api/artists/{id}
    [HttpPut("{id}")]
    [Authorize(Policy = Policies.Admin)]
    public async Task<IActionResult> UpdateArtistAsync(Guid id, [FromBody] ArtistUpdateDto updatedArtist)
    {
        var artist = await context.Artists.FindAsync(id);
        if (artist == null)
        {
            return NotFound();
        }
        artist.Name = updatedArtist.Name;
        artist.Bio = updatedArtist.Bio;
        context.Artists.Update(artist);
        await context.SaveChangesAsync();
        return Ok();
    }
}

public record ArtistCreateDto(string UserId, string Name, string Bio);
public record ArtistUpdateDto(string Name, string Bio);