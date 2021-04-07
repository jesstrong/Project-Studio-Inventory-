using System;
using System.Collections.Generic;
using System.Text;
using Studio_Inventory_API.Models;
using Xunit;

namespace Studio_Inventory_API.Tests
{
    public class UserTests
    {

        User sut;

        public UserTests()
        {
            sut = new User();
            sut.Id = 1;
            sut.Name = "Test";
            sut.IsAdmin = false;
            sut.Password = "Password";
        }

        [Fact]
        public void User_Sets_Name_On_UserModel()
        {
            string name = sut.Name;
            Assert.Equal("Test", name);
        }

        [Fact]
        public void User_Sets_Id_On_UserModel()
        {
            int result = sut.Id;
            Assert.Equal(1, result);
        }

        [Fact]
        public void User_Sets_IsAdmin_On_UserModel()
        {
            bool isAdmin = sut.IsAdmin;
            Assert.False(isAdmin);
        }

        [Fact]
        public void User_Sets_Password_On_UserModel()
        {
            string password = sut.Password;
            Assert.Equal("Password", password);
        }

    }
}
