using TakeTheArtAndRunAPI.DTOs;
using TakeTheArtAndRunAPI.Models;

namespace TakeTheArtAndRunAPI.Mappers;

public static class TransactionMapper
{
    public static TransactionReadDto ToDto(this Transaction transaction)
    {
        return new TransactionReadDto
        {
            Amount = transaction.AmountPaid,
            Auction = AuctionMapper.ToDto(transaction.Auction!),
            Date = transaction.PurchasedAt
        };
    }
}
