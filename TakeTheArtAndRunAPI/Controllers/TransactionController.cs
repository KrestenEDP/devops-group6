using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TakeTheArtAndRunAPI.Data;
using TakeTheArtAndRunAPI.DTOs;
using TakeTheArtAndRunAPI.Mappers;

namespace TakeTheArtAndRunAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TransactionController(AppDbContext context) : ControllerBase
{
    private readonly AppDbContext _context = context;

    // GET /api/transactions
    [HttpGet]
    [Authorize]
    public async Task<ActionResult<IEnumerable<TransactionReadDto>>> GetTransactionsAsync()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var user = await _context.Users.FindAsync(userId);
        if (user == null) return Unauthorized();
        var transactions = user.Transactions;

        var dtos = transactions.Select(a => a.ToDto()).ToList();

        return Ok(dtos);
    }
}
