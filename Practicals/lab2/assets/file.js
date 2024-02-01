window.onload = function(){


};

let username = "name";
let email = "email";
let DOB = "10102005";
let fan = 0;

function validateForm()
{
    username = document.getElementById("username").value;
    email = document.getElementById("useremail").value;
    DOB = document.getElementById("DOB").value;
    console.log("form is being validate")
    if(username == "")
    {
        alert("please fill text feilds");
    }
    else
    {
        saveInfo();
    }

    


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