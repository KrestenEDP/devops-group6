namespace TakeTheArtAndRunAPI.Controllers;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TakeTheArtAndRunAPI.Data;
using TakeTheArtAndRunAPI.Models;

[ApiController]
[Route("api/[controller]")]
public class ArtistsController : ControllerBase
{
    private readonly AppDbContext _context;

    public ArtistsController(AppDbContext context)
    {
        _context = context;
    }

    // GET /api/artists
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Artist>>> GetArtistsAsync()
    {
        var artists = await _context.Artists.ToListAsync();
        return Ok(artists);
    }
}