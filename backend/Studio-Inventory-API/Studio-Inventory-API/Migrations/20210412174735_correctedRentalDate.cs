using Microsoft.EntityFrameworkCore.Migrations;

namespace Studio_Inventory_API.Migrations
{
    public partial class correctedRentalDate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "RentalDate",
                table: "Rental",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "EquipmentList",
                keyColumn: "Id",
                keyValue: 1,
                column: "RentalDates",
                value: ",");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RentalDate",
                table: "Rental");

            migrationBuilder.UpdateData(
                table: "EquipmentList",
                keyColumn: "Id",
                keyValue: 1,
                column: "RentalDates",
                value: null);
        }
    }
}
