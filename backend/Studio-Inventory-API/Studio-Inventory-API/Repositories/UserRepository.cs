using Studio_Inventory_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Studio_Inventory_API.Repositories
{
    public class UserRepository : Repository<User>, IRepository<User>
    {
        public UserRepository(StudioContext context) : base(context)
        {

        }

    }
}
