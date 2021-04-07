using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Studio_Inventory_API.Models; 

namespace Studio_Inventory_API.Repositories
{
   public class EquipmentRepository : Repository<Equipment>, IRepository<Equipment>
       {
            public EquipmentRepository(StudioContext context) : base(context)
            {

            }


    }

} 
