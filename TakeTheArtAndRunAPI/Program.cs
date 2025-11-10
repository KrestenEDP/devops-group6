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
    options.Events = new JwtBearerEvents()
    {
        OnAuthenticationFailed = context =>
        {
            Console.WriteLine("Authentication failed: " + context.Exception.Message);
            return Task.CompletedTask;
        },
        OnMessageReceived = msg =>
        {
            var token = msg?.Request.Headers.Authorization.ToString();
            string path = msg?.Request.Path ?? "";
            if (!string.IsNullOrEmpty(token))
            {
                Console.WriteLine("Access token");
                Console.WriteLine($"URL: {path}");
                Console.WriteLine($"Token: {token}\r\n");
            }
            else
            {
                Console.WriteLine("Access token");
                Console.WriteLine("URL: " + path);
                Console.WriteLine("Token: No access token provided\r\n");
            }
            return Task.CompletedTask;
        },
        OnTokenValidated = ctx =>
        {
            Console.WriteLine();
            Console.WriteLine("Claims from the access token");
            if (ctx?.Principal != null)
            {
                foreach (var claim in ctx.Principal.Claims)
                {
                    Console.WriteLine($"{claim.Type} - {claim.Value}");
                }
            }
            Console.WriteLine();
            return Task.CompletedTask;
        }
    };
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

app.Run();

