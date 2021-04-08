using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Studio_Inventory_API.Extensions;
using Studio_Inventory_API.Models; 

namespace Studio_Inventory_API.Repositories
{
    public interface IRepository<T>: IUser where T : class
    {
        IEnumerable<T> GetAll();
        T GetById(int id);
        void Create(T entity);
        void Delete(T entity);
        void Update(T entity);
    }

}
