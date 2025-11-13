using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;
using TakeTheArtAndRunAPI.Controllers;
using TakeTheArtAndRunAPI.Data;
using TakeTheArtAndRunAPI.Models;

var builder = WebApplication.CreateBuilder(args);

// Add EF Core with SQLite database, database type can be changed here
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// Identity
builder.Services.AddIdentity<User, IdentityRole>()
    .AddEntityFrameworkStores<AppDbContext>()
    .AddDefaultTokenProviders();

// JWT Authentication
var jwtKey = builder.Configuration["Jwt:Key"] ?? throw new InvalidOperationException("JWT Key is not configured.");

var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.UseSecurityTokenValidators = true;
    options.RequireHttpsMetadata = false; // <--- allow HTTP for local testing
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = key,
        RoleClaimType = ClaimsIdentity.DefaultRoleClaimType,
        NameClaimType = ClaimTypes.NameIdentifier,
    };
});

builder.Services.AddAuthorizationBuilder()
    .AddPolicy(Policies.Admin, policy =>
        policy.RequireClaim(ClaimsIdentity.DefaultRoleClaimType, "Admin"))
    .AddPolicy(Policies.Artist, policy =>
        policy.RequireClaim(ClaimsIdentity.DefaultRoleClaimType, "Artist"));


// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod());
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseCors("AllowAll");
}
else
{
    app.UseHttpsRedirection();
}

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
var context = services.GetRequiredService<AppDbContext>();
var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();

// Seed roles
string[] roles = { "User", "Artist", "Admin" };
foreach (var roleName in roles)
{
    if (!await roleManager.RoleExistsAsync(roleName))
        await roleManager.CreateAsync(new IdentityRole(roleName));
}
// Seed admin user
var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
var adminEmail = "admin@example.com";
if (await userManager.FindByEmailAsync(adminEmail) == null)
{
    var admin = new User { UserName = adminEmail, Email = adminEmail, Role = UserRole.Admin };
    await userManager.CreateAsync(admin, "AdminPassword123!");
    await userManager.AddToRoleAsync(admin, "Admin");
}

// Seed Artists
var artistsData = new List<(string Name, string Email, string ImageUrl, string Bio)>
{
    ("Maelle Dessendre", "maelleDes@abracadabra.com", "https://images.steamusercontent.com/ugc/10549703576396892245/C9D46CDB01391AD4652F41B34904B3C75D084477/?imw=637&imh=358&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true",
    "Maelle is a fiercely talented artist and a masterful duelist,\r\nblending elegance and edge in everything she does. Her creations captivate,\r\nher blade commands respect—and whether on canvas or in combat, she never misses her mark."),

    ("Alex Shadow", "AlexDarktherThanEdge@abracadabra.com", "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
    "Alex is a bold and talented painter whose edgy, distinctive style turns heads and challenges norms.\r\nKnown in the art world as ‘Alex the Edger,’ their work cuts through convention with raw expression and fearless creativity.")
};
foreach (var artistInfo in artistsData)
{
    // Skip if already exists
    if (await context.Artists.AnyAsync(a => a.Email == artistInfo.Email)) continue;

    // Create User
    var user = new User
    {
        UserName = artistInfo.Email,
        Email = artistInfo.Email,
        Role = UserRole.Artist
    };
    await userManager.CreateAsync(user, "Password123!");
    await userManager.AddToRoleAsync(user, "Artist");

    // Create Artist
    var artist = new Artist
    {
        Name = artistInfo.Name,
        Email = artistInfo.Email,
        Bio = artistInfo.Bio,
        ImageUrl = artistInfo.ImageUrl,
        UserId = user.Id
    };
    context.Artists.Add(artist);
}

await context.SaveChangesAsync();

// Seed Auctions/Paintings
var maelle = await context.Artists.FirstOrDefaultAsync(a => a.Email == "maelleDes@abracadabra.com");
var alex = await context.Artists.FirstOrDefaultAsync(a => a.Email == "AlexDarktherThanEdge@abracadabra.com");

var auctionsData = new List<Auction>
    {
        new("Fencing Duel", maelle!.Id, maelle.Name, "https://images.unsplash.com/photo-1549289524-06cf8837ace5?w=800&q=80", 500, "Oil on Canvas", "24x36", maelle.Bio),
        new("Edge of Darkness", alex!.Id, alex.Name, "https://images.unsplash.com/photo-1583119912267-cc97c911e416?w=800&q=80", 750, "Acrylic", "30x40", alex.Bio)
    };

foreach (var auction in auctionsData)
{
    if (!context.Auctions.Any(a => a.Title == auction.Title)) // prevent duplicates
        context.Auctions.Add(auction);
}

await context.SaveChangesAsync();

app.Run();

