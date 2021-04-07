using System;
using Xunit;
using Studio_Inventory_API.Models;

namespace Studio_Inventory_API.Tests
{
    public class EquipmentTests
    {
        Equipment sut = new Equipment(1, "serialnumber", "name", 1);

        [Fact]
        public void Equipment_Constructor_Should_Set_Id()
        {
            int resultId = sut.Id;
            Assert.Equal(1, resultId);
        }

        [Fact]
        public void Equipment_Cunstructor_Should_Set_Serial_Number()
        {
            string resultSerialNumber = sut.SerialNumber;
            Assert.Equal("serialnumber", resultSerialNumber);
        }

        [Fact]
        public void Equipment_Cunstructor_Should_Set_Name()
        {
            string resultName = sut.Name;
            Assert.Equal("name", resultName);
        }

        [Fact]
        public void Equipment_Cunstructor_Should_Set_Category_Id()
        {
            int resultCategoryId = sut.CategoryId;
            Assert.Equal(1, resultCategoryId);
        }
    }
}