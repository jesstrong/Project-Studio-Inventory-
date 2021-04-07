using System;
using Xunit;
using Studio_Inventory_API.Models;

namespace Studio_Inventory_API.Tests
{
    public class EquipmentTests
    {
        Equipment sut = new Equipment(1, "name", "", 1);

        [Fact]
        public void Equipment_Constructer_Should_Set_Id()
        {
            int resultId = sut.Id;
            Assert.Equal(1, resultId);
        }
    }
}
