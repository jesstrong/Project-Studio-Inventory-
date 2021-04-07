using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Studio_Inventory_API;
using Studio_Inventory_API.Models;
using Studio_Inventory_API.Repositories;

namespace Studio_Inventory_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        IRepository<Category> _categoryRepo;

        public CategoryController(IRepository<Category> categoryRepo)
        {
            this._categoryRepo = categoryRepo;
        }

        // GET: api/Category
        [HttpGet]
        public IEnumerable<Category> GetCategories()
        {
            return _categoryRepo.GetAll();
        }

        // GET: api/Category/5
        [HttpGet("{id}")]
        public Category GetCategory(int id)
        {
            var category = _categoryRepo.GetById(id);

            return category;
        }

        // PUT: api/Category/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public Category PutCategory(int id, Category category)
        {
            if (id != category.Id)
            {
                return null;
            }

            _categoryRepo.Update(category);
            return category;           
        }

        // POST: api/Category
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public Category PostCategory([FromBody]Category category)
        {
            _categoryRepo.Create(category);
            return category;
        }

        // DELETE: api/Category/5
        [HttpDelete("{id}")]
        public string DeleteCategory(int id)
        {
            var category = _categoryRepo.GetById(id);
            _categoryRepo.Delete(category);
            return "Deleted item successfully";
        }

        private bool CategoryExists(int id)
        {
            return _context.Categories.Any(e => e.Id == id);
        }
    }
}
