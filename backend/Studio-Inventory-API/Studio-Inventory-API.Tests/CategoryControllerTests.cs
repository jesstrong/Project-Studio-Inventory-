using System;
using System.Collections.Generic;
using System.Text;
using Xunit;
using NSubstitute;
using Studio_Inventory_API.Controllers;
using Studio_Inventory_API.Models;
using Studio_Inventory_API.Repositories;


namespace Studio_Inventory_API.Tests
{
    public class CategoryControllerTests
    {
        CategoryController sut;
        IRepository<Category> categoryRepo;

        public CategoryControllerTests()
        {
            categoryRepo = Substitute.For<IRepository<Category>>();
            sut = new CategoryController(categoryRepo);
        }

        [Fact]
        public void GetCategories_Returns_A_List()
        {
            IEnumerable<Category> expectedList = new List<Category>();
            categoryRepo.GetAll().Returns(expectedList);

            var result = sut.GetCategories();

            Assert.Equal(expectedList, result);
        }
        [Fact]
        public void GetCategory_Returns_A_Category()
        {
            var expectedCategory = new Category();
            categoryRepo.GetById(999).Returns(expectedCategory);

            var result = sut.GetCategory(999);

            Assert.Equal(expectedCategory, result);
        }
    }
}
