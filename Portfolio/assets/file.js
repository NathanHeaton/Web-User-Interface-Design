document.getElementById("hamburger").addEventListener('click', toggleDropDown);
const nav = document.getElementsByTagName("nav");




$(document).ready(function(){
    if(window.innerWidth > 800)
    {
       $(nav).show();
    }
}) 

function toggleDropDown()
{
    $(nav).toggle();

}