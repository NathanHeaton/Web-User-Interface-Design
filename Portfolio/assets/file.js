document.getElementById("hamburger").addEventListener('click', toggleDropDown);
const nav = document.getElementsByTagName("nav");


//$(nav).hide();

function toggleDropDown()
{
    $(nav).toggle();

}