using Microsoft.EntityFrameworkCore.Migrations;

namespace Studio_Inventory_API.Migrations
{
    public partial class RentalData2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "EquipmentList",
                keyColumn: "Id",
                keyValue: 1,
                column: "RentalDates",
                value: ",");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "EquipmentList",
                keyColumn: "Id",
                keyValue: 1,
                column: "RentalDates",
                value: null);
        }
    }
}
