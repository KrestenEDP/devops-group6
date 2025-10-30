using Microsoft.EntityFrameworkCore;
using TakeTheArtAndRunAPI.Models;

namespace TakeTheArtAndRunAPI.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options) { }

    public DbSet<Auction> Auctions => Set<Auction>();
    public DbSet<Artist> Artists => Set<Artist>();
}
