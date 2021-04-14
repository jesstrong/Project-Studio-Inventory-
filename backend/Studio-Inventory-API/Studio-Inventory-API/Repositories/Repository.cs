using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Studio_Inventory_API.Extensions;
using Studio_Inventory_API.Models; 

namespace Studio_Inventory_API.Repositories
{
    public class Repository<T> where T : class
    {
        private DbContext db;

        public Repository(DbContext db)
        {
            this.db = db;
        }
        public void Create(T entity)
        {
            db.Set<T>().Add(entity);
            db.SaveChanges();
        }
        public T GetById(int id)
        {
            return db.Set<T>().Find(id);
        }
        public void Delete(T entity)
        {
            db.Set<T>().Remove(entity);
            db.SaveChanges();
        }
        public void Save()
        {
            db.SaveChanges();
        }
        public IEnumerable<T> GetAll()
        {
            return db.Set<T>().ToList();
        }
        public void Update(T entity)
        {
            db.Set<T>().Update(entity);
            Save();
        }

        public LoginResult CheckLogin(string username, string password)
        {
            var user = db.Set<User>().Where(u => u.Name == username && u.Password == Helpers.Helper.EncryptPassword(password)).FirstOrDefault();

            if (user == null)
            {
                return new LoginResult() { Result = false, Message = "Invalid User Name or Password.", User = null };
            }
            else
            {
                return new LoginResult() { Result = true, Message = "", User = user };
            }
        }
    }
}
