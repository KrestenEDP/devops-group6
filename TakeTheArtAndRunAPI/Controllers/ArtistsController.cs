namespace TakeTheArtAndRunAPI.Controllers;

using Microsoft.AspNetCore.Mvc;
using TakeTheArtAndRunAPI.Models;

[ApiController]
[Route("api/[controller]")]
public class ArtistsController : ControllerBase
{
    // GET /api/artists
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Artist>>> GetArtistsAsync()
    {
        throw new NotImplementedException();
    }
}