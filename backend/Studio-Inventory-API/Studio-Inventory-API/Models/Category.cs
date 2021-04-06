using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Studio_Inventory_API.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual ICollection<Equipment> EquipmentList { get; set; }

        public Category()
        {

        }

        public Category(int id, string name)
        {
            Id = id;
            Name = name;
        }
    }
}
