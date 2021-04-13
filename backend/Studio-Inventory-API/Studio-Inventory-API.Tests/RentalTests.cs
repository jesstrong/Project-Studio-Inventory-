using Studio_Inventory_API.Models;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit; 

namespace Studio_Inventory_API.Tests
{
    public class RentalTests
    {
        Rental sut = new Rental(1, true, false, "feedback", "05/15/2021", 1 );

       
    

    [Fact]

    public void Rental_Constructor_Should_Set_Id()
    {
       int resultId = sut.Id;
       Assert.Equal(1, resultId);
    }

    [Fact]

    public void Constructor_sets_Approval_Bool()
        {
            bool resultIsApproved = sut.IsApproved;
            Assert.True(resultIsApproved);
        }

    [Fact]

    public void Constructor_sets_Denied_Bool()
        {
            bool resultIsDenied = sut.IsDenied;
            Assert.False(resultIsDenied);
        }

    [Fact]
        public void Constructor_Sets_Feedback()
        {
            string resultFeedback = sut.FeedBack;
            Assert.Equal("feedback", resultFeedback);
        }

    [Fact]
    public void Constructor_Sets_Rental_Date()
    {
        string resultRentalDate = sut.RentalDate;
        Assert.Equal("05/15/2021", resultRentalDate);
    }

    [Fact]

    public void Rental_Constructor_Should_Set_UserId()
        {
            int resultUserId = sut.UserId;
            Assert.Equal(1, resultUserId);
        }


    }

}
