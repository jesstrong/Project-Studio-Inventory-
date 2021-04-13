using Microsoft.EntityFrameworkCore.Migrations;

namespace Studio_Inventory_API.Migrations
{
    public partial class RentalDataMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rental_Categories_CategoryId",
                table: "Rental");

            migrationBuilder.DropIndex(
                name: "IX_Rental_CategoryId",
                table: "Rental");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "Rental");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "Rental");

            migrationBuilder.DropColumn(
                name: "SerialNumber",
                table: "Rental");

            migrationBuilder.AddColumn<bool>(
                name: "IsDenied",
                table: "Rental",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Rental",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "EquipmentList",
                keyColumn: "Id",
                keyValue: 1,
                column: "RentalDates",
                value: ",");

            migrationBuilder.InsertData(
                table: "Rental",
                columns: new[] { "Id", "FeedBack", "IsApproved", "IsDenied", "RentalDate", "UserId" },
                values: new object[] { 1, "seeded feedback", false, false, "04/13/2021", 1 });

            migrationBuilder.CreateIndex(
                name: "IX_Rental_UserId",
                table: "Rental",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Rental_Users_UserId",
                table: "Rental",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rental_Users_UserId",
                table: "Rental");

            migrationBuilder.DropIndex(
                name: "IX_Rental_UserId",
                table: "Rental");

            migrationBuilder.DeleteData(
                table: "Rental",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DropColumn(
                name: "IsDenied",
                table: "Rental");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Rental");

            migrationBuilder.AddColumn<int>(
                name: "CategoryId",
                table: "Rental",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Rental",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SerialNumber",
                table: "Rental",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "EquipmentList",
                keyColumn: "Id",
                keyValue: 1,
                column: "RentalDates",
                value: null);

            migrationBuilder.CreateIndex(
                name: "IX_Rental_CategoryId",
                table: "Rental",
                column: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Rental_Categories_CategoryId",
                table: "Rental",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
