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
        public bool IsApproved { get; set; }
        public bool IsDenied { get; set; }
        public string FeedBack { get; set; }
        public virtual ICollection<Equipment> EquipmentList { get; set; }        
        public int UserId { get; set; }
        public virtual User User { get; set; }
        
        public Rental()
        {
        }

        public Rental(int id, bool isApproved, bool isDenied, string feedback, string rentalDate, int userId)
        {
            Id = id;
            IsApproved = isApproved;
            IsDenied = isDenied;
            FeedBack = feedback; 
            RentalDate = rentalDate;
            UserId = userId; 
        }
    }
}
