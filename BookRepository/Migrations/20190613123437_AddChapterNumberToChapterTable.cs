using Microsoft.EntityFrameworkCore.Migrations;

namespace BookRepository.Migrations
{
    public partial class AddChapterNumberToChapterTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ChapterNumber",
                table: "Chapters",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ChapterNumber",
                table: "Chapters");
        }
    }
}
