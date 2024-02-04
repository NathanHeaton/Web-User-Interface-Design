window.onload = function(){


};

let username = "name";
let email = "email";
let DOB = "10102005";
let fan = 0;

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