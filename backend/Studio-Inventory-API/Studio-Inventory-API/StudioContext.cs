using Microsoft.EntityFrameworkCore;
using Studio_Inventory_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace Studio_Inventory_API
{

    public class StudioContext : DbContext
    {
        public DbSet<Category> Categories { get; set; }
        public DbSet<Equipment> EquipmentList { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Rental> Rental { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var connectionString = "Server=(localdb)\\mssqllocaldb;Database=StudioDb;Trusted_Connection=True;";

            optionsBuilder.UseSqlServer(connectionString)
                            .UseLazyLoadingProxies();

            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Category>().HasData(
                new Category()
                {
                    Id = 1,
                    Name = "Microphone"
                }
                );
            modelBuilder.Entity<Equipment>().HasData(
                new Equipment()
                {
                    Id = 1,
                    SerialNumber = "123",
                    Name = "SM57",
                    Description = "Good all around microphone.",
                    CategoryId = 1
                }
                );
            modelBuilder.Entity<User>().HasData(
                new User()
                {
                    Id = 1,
                    Name = "Jeff",
                    IsAdmin = false,
                    Password = "123"
                }
                );
            modelBuilder.Entity<Rental>().HasData(
                new Models.Rental()
                {
                    RentalDate = "04/13/2021",
                    Id = 1,
                    IsApproved = false,
                    IsDenied = false,
                    FeedBack = "seeded feedback",
                    UserId = 1
                });
        }

    }
}
