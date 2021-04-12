using Studio_Inventory_API.Models;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit; 

namespace Studio_Inventory_API.Tests
{
    public class RentalTests
    {
        Rental sut = new Rental(1, "serialnumber", "name", true, "testFeedBack", "05/15/2021" );

        [Fact]
    public void Get_Serial_Number_from_Rental()
    {
        string resultSerialNumber = sut.SerialNumber;
        Assert.Equal("serialnumber", resultSerialNumber);
    }

    [Fact]
    public void Get_Rental_Name_From_Constructor()
    {
        string resultName = sut.Name;
        Assert.Equal("name", resultName);
    }
            

    [Fact]
    public void Get_Rental_Date()
    {
        string resultRentalDate = sut.RentalDate;
        Assert.Equal("05/15/2021", resultRentalDate);
    }

    }
       
    



}
