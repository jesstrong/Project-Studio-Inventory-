using Microsoft.EntityFrameworkCore.Migrations;

namespace Studio_Inventory_API.Migrations
{
    public partial class RentalEquipmentIds : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EquipmentList_Rental_RentalId",
                table: "EquipmentList");

            migrationBuilder.DropIndex(
                name: "IX_EquipmentList_RentalId",
                table: "EquipmentList");

            migrationBuilder.DropColumn(
                name: "RentalId",
                table: "EquipmentList");

            migrationBuilder.AddColumn<string>(
                name: "EquipmentIds",
                table: "Rental",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "EquipmentList",
                keyColumn: "Id",
                keyValue: 1,
                column: "RentalDates",
                value: ",,2021-04-20");

            migrationBuilder.UpdateData(
                table: "Rental",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "EquipmentIds", "RentalDate" },
                values: new object[] { "1", "2021-04-20" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EquipmentIds",
                table: "Rental");

            migrationBuilder.AddColumn<int>(
                name: "RentalId",
                table: "EquipmentList",
                type: "int",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "EquipmentList",
                keyColumn: "Id",
                keyValue: 1,
                column: "RentalDates",
                value: null);

            migrationBuilder.UpdateData(
                table: "Rental",
                keyColumn: "Id",
                keyValue: 1,
                column: "RentalDate",
                value: "04/13/2021");

            migrationBuilder.CreateIndex(
                name: "IX_EquipmentList_RentalId",
                table: "EquipmentList",
                column: "RentalId");

            migrationBuilder.AddForeignKey(
                name: "FK_EquipmentList_Rental_RentalId",
                table: "EquipmentList",
                column: "RentalId",
                principalTable: "Rental",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
