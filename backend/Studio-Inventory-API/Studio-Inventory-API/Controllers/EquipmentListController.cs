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
    public class EquipmentListController : ControllerBase
    {
        IRepository<Equipment> _equipmentRepo;

        public EquipmentListController(Irepository<Equipment> context)
        {
            this._equipmentRepo = context;
        }

        // GET: api/EquipmentList
        [HttpGet]
        public IEnumerable<Equipment> GetEquipmentList()
        {
            return _equipmentRepo.GetAll(); 
        }

        // GET: api/EquipmentList/5
        [HttpGet("{id}")]
        public Equipment GetEquipment(int id)
        {
            return _equipmentRepo.GetById(id);
        }

        // PUT: api/EquipmentList/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public Equipment PutEquipment(int id, Equipment equipment)
        {
            if(id != equipment.Id)
            {
                return null;
            }
            _equipmentRepo.Update(equipment);
            return equipment;
        }

        // POST: api/EquipmentList
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public Equipment PostEquipment([FromBody] Equipment equipment)
        {
            _equipmentRepo.Create(equipment);
            return equipment;
        }

        // DELETE: api/EquipmentList/5
        [HttpDelete("{id}")]
        public string DeleteEquipment(int id)
        {
            var equipment = _equipmentRepo.GetById(id);
            _equipmentRepo.Delete(equipment);
            return "Equipment Deleted.";
        }

        
    }
}
