namespace TakeTheArtAndRunAPI.Models;

public class Auction
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string Title { get; set; } = "";
    public string Artist { get; set; } = "";
    public string ImageUrl { get; set; } = "";
    public decimal HighestBid { get; set; }
    public int BidCount { get; set; }
    public string Medium { get; set; } = "";
    public string Dimensions { get; set; } = "";
    public string ArtistBio { get; set; } = "";
}
