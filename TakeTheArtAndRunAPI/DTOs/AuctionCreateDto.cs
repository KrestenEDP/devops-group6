namespace TakeTheArtAndRunAPI.DTOs;

public class AuctionCreateDto
{
    public string Title { get; set; } = string.Empty;
    public string Artist { get; set; } = string.Empty;
    public string ImageUrl { get; set; } = string.Empty;
    public decimal Limit { get; set; } = 0m;
    public string Medium { get; set; } = string.Empty;
    public string Dimensions { get; set; } = string.Empty;
    public string ArtistBio { get; set; } = string.Empty;
}
