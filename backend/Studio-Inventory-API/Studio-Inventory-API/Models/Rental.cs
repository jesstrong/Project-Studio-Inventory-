using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Studio_Inventory_API.Models
{
    public class Rental
    {
          
        public string RentalDate { get; set; }
        public int Id { get; set; }
        public string SerialNumber { get; set; }
        public string Name { get; set; }
        public bool IsApproved { get; set; }
        public string FeedBack { get; set; }
        public virtual ICollection<Equipment> EquipmentList { get; set; }
        
        public virtual Category Category { get; set; }

        public Rental()
        {
        }

        public Rental(int id, string serialNumber, string name, bool isApproved, string feedBack, string rentalDate)
        {
            Id = id;
            SerialNumber = serialNumber;
            Name = name;
            IsApproved = isApproved;
            FeedBack = feedBack;
            RentalDate = rentalDate;
        }
    }
}
