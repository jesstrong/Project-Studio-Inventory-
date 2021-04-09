using Microsoft.EntityFrameworkCore.Migrations;

namespace Studio_Inventory_API.Migrations
{
    public partial class updateEquipmentModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Password",
                table: "Users",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "EquipmentList",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RentalDates",
                table: "EquipmentList",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "EquipmentList",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Description", "RentalDates" },
                values: new object[] { "Good all around microphone.", "," });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "EquipmentList");

            migrationBuilder.DropColumn(
                name: "RentalDates",
                table: "EquipmentList");

            migrationBuilder.AlterColumn<string>(
                name: "Password",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string));
        }
    }
}
