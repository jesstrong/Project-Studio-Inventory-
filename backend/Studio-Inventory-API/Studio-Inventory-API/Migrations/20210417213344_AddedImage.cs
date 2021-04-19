using Microsoft.EntityFrameworkCore.Migrations;

namespace Studio_Inventory_API.Migrations
{
    public partial class AddedImage : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "EquipmentList",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "EquipmentList",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Image", "RentalDates" },
                values: new object[] { "https://media.sweetwater.com/api/i/b-original__w-300__h-300__bg-ffffff__q-85__ha-dde2192b5ddfa7d1__hmac-b5b5985e3aa2e68b005b31f94060a683b2ccf4fc/images/items/350/SM57.jpg", ",,2021-04-20" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Image",
                table: "EquipmentList");

            migrationBuilder.UpdateData(
                table: "EquipmentList",
                keyColumn: "Id",
                keyValue: 1,
                column: "RentalDates",
                value: ",2021-04-20");
        }
    }
}
