namespace TakeTheArtAndRunAPI.Models;

public class Artist
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string Name { get; set; } = "";
    public string Bio { get; set; } = "";
}
