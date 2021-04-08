using Studio_Inventory_API.Helpers;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Studio_Inventory_API.Models
{
    public class User
    {
        private string _password;

        public int Id {get;set;}
        [Required]
        public string Name {get; set;}
        public bool IsAdmin {get; set;}
        [Required]
        public string Password {
            get { return _password; }
            set
            {
                _password = Helper.EncryptPassword(value);
            }
        }

        public User()
        {

        }

        public User(int id, string name, bool isAdmin, string password)
        {
            Id = id;
            Name = name;
            IsAdmin = isAdmin;
            Password = password;
        }
    }
}
