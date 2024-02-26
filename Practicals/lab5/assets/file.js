window.onload = function(){


};
let playingDropDown = document.getElementById("dropDown");
let username = "name";
let email = "email";
let DOB = "10102005";
let fan = 0;

playingDropDown.style.display = "block";
$("#dropDown").hide();

// ready function after page is fully loaded
$(document).ready(function(){

    $("#dropdownButton").click(function(){
        $("#dropDown").fadeToggle();//toggles news section
     
    });

});

function validateForm()
{
    // sets variables to user input
    username = document.getElementById("username").value;
    email = document.getElementById("useremail").value;
    DOB = document.getElementById("DOB").value;
    console.log("form is being validate")
    // makes sure you have enterd something into username
    if(username == "")
    {
        alert("please enter name");
    }
    else if(email == "")
    {
        alert("please enter email");
    }
    else if(DOB == "")
    {
        alert("please DOB");
    }
    else
    {
        saveInfo();
    }

    


}
let cost = 10;
function changeTableData()
{
    // changes the cost of one of the tickets
    document.getElementById("table-of-data").rows[1].cells[3].innerHTML = cost.toString();
    cost = cost + cost;
}

function saveInfo()
{


   // fan = document.getElementById("fan").value;
    alert("form is being validate" + username +" is your name")

    // sets all of the user data to local storage
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
    localStorage.setItem("DOB", DOB);
    localStorage.setItem("fan", fan);
    

}

// retrieves data from contact us page
function retriveData()
{
    if(localStorage.getItem("name")!="")
    {
        username = localStorage.getItem("username");
        email = localStorage.getItem("email");
        DOB = localStorage.getItem("DOB");
        fan = localStorage.getItem("fan");
        console.log("username "+ username);
        console.log("email: "+ email);
        console.log("DOB "+ DOB);
        console.log("fan "+ fan);
    }
    else
    {
        alert("no saved data");
    }
}


function openpage()
{
    window.location.href= "https://www.wikipedia.org/";
}

function openWindow()
{
    window.open("contactUs.html")
}

// made easier with jQuery
//
/* toggles news on homepage
function toggleNews()
{
    if(playingDropDown.style.display == "none")// checks if drop down i displayed
    {
     //   playingDropDown.style.display = "block";// shows drop down
        document.getElementById("dropdownButton").innerHTML = "less";
    }
    else
    {
      //  playingDropDown.style.display = "none";// hide drop down
        document.getElementById("dropdownButton").innerHTML = "more";
    }
    
}
*/
document.querySelector('#dropdownButton').addEventListener('mouseover', function(){
    playingDropDown.style.background = "blue";
})

document.querySelector('#dropdownButton').addEventListener('mouseout', function(){
    playingDropDown.style.background = "red";
})