using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TakeTheArtAndRunAPI.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Artists",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Bio = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Artists", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Auctions",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT", nullable: false),
                    Title = table.Column<string>(type: "TEXT", nullable: false),
                    Artist = table.Column<string>(type: "TEXT", nullable: false),
                    ImageUrl = table.Column<string>(type: "TEXT", nullable: false),
                    HighestBid = table.Column<decimal>(type: "TEXT", nullable: false),
                    BidCount = table.Column<int>(type: "INTEGER", nullable: false),
                    Medium = table.Column<string>(type: "TEXT", nullable: false),
                    Dimensions = table.Column<string>(type: "TEXT", nullable: false),
                    ArtistBio = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Auctions", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Artists");

            migrationBuilder.DropTable(
                name: "Auctions");
        }
    }
}
