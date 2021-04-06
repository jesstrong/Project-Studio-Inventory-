using Microsoft.EntityFrameworkCore.Migrations;

namespace Studio_Inventory_API.Migrations
{
    public partial class initialMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    IsAdmin = table.Column<bool>(nullable: false),
                    Password = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "EquipmentList",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SerialNumber = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    CategoryId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EquipmentList", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EquipmentList_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "Name" },
                values: new object[] { 1, "Microphone" });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "IsAdmin", "Name", "Password" },
                values: new object[] { 1, false, "Jeff", "123" });

            migrationBuilder.InsertData(
                table: "EquipmentList",
                columns: new[] { "Id", "CategoryId", "Name", "SerialNumber" },
                values: new object[] { 1, 1, "SM57", "123" });

            migrationBuilder.CreateIndex(
                name: "IX_EquipmentList_CategoryId",
                table: "EquipmentList",
                column: "CategoryId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EquipmentList");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Categories");
        }
    }
}
