using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Studio_Inventory_API.Models
{
    public class User
    {
        public int Id {get;set;}
        public string Name {get; set;}
        public bool IsAdmin{get; set;}

        public User()
        {

        }

        public User(int id, string name, bool isAdmin)
        {
            Id = id;
            Name = name;
            IsAdmin = isAdmin;
        }
    }
}
