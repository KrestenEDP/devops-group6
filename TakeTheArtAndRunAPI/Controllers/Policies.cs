using TakeTheArtAndRunAPI.Models;

namespace TakeTheArtAndRunAPI.Controllers;

public static class Policies
{
    public const string Admin = "AdminPolicy";
    public const string Artist = "ArtistPolicy";
    public static string ForRole(UserRole role) => $"{role}Policy";
}

