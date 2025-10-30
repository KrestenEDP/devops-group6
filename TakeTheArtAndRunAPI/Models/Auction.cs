namespace TakeTheArtAndRunAPI.Models;

public class Auction
{
    public Guid Id { get; private set; } = Guid.NewGuid();

    public string Title { get; private set; } = string.Empty;
    public string Artist { get; private set; } = string.Empty;
    public string ImageUrl { get; private set; } = string.Empty;
    public decimal Limit { get; private set; }
    public decimal HighestBid { get; private set; } = 0;
    public int BidCount { get; private set; } = 0;
    public string Medium { get; private set; } = string.Empty;
    public string Dimensions { get; private set; } = string.Empty;
    public string ArtistBio { get; private set; } = string.Empty;
    public Boolean isSold { get; set; } = false;

    public Auction(string title, string artist, string imageUrl, decimal limit, string medium, string dimensions, string artistBio)
    {
        Title = title;
        Artist = artist;
        ImageUrl = imageUrl;
        Limit = limit;
        Medium = medium;
        Dimensions = dimensions;
        ArtistBio = artistBio;
    }

    public Boolean placeBid(decimal bidAmount)
    {
        if (isSold)
        {
            return false;
        }
        if (bidAmount >= Limit)
        {
            // Auction is sold
            // TODO: Log the auction and something more
            isSold = true;
            HighestBid = bidAmount;
            BidCount += 1;
            return true;
        }
        if (bidAmount > HighestBid)
        {
            HighestBid = bidAmount;
            BidCount += 1;
            return true;
        }
        return false;
    }
}
