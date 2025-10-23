namespace TakeTheArtAndRunAPI.Controllers;

using Microsoft.AspNetCore.Mvc;
using TakeTheArtAndRunAPI.Models;

[ApiController]
[Route("api/[controller]")]
public class AuctionsController : ControllerBase
{
    // GET /api/auctions
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Auction>>> GetAuctionsAsync()
    {
        throw new NotImplementedException();
    }
}

