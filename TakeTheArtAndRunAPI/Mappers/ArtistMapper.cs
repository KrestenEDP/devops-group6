using TakeTheArtAndRunAPI.Models;
using ArtistReadDto = TakeTheArtAndRunAPI.DTOs.ArtistReadDto;

namespace TakeTheArtAndRunAPI.Mappers;

public static class ArtistMapper
{
    public static ArtistReadDto ToDto(this Artist artist)
    {
        return new ArtistReadDto
        {
            Id = artist.Id,
            Name = artist.Name,
            Bio = artist.Bio,
            ImageUrl = artist.ImageUrl,
            Email = artist.Email
        };
    }
}
