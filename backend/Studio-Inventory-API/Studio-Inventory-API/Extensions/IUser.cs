using Studio_Inventory_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Studio_Inventory_API.Extensions
{
    public interface IUser
    {
        LoginResult CheckLogin(string username, string password);
    }

    public class LoginResult
    {
        public bool Result { get; set; }
        public string Message { get; set; }
        public User User { get; set; }
    }
}
