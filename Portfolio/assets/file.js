document.getElementById("hamburger").addEventListener('click', toggleDropDown);
const nav = document.getElementsByTagName("nav");
const gamesPage = document.getElementById("games")
const websitesPage = document.getElementById("websites")
const webCards = [document.getElementById("web-card1"),document.getElementById("web-card2"),document.getElementById("web-card3"),document.getElementById("web-card4")];  
const gameCards = [document.getElementById("game-card1"), document.getElementById("game-card2"), document.getElementById("game-card3"), document.getElementById("game-card4")]
let cardCount = 0;


$(document).ready(function(){
    if(window.innerWidth > 800)
    {
       $(nav).show();
    }
    $(gamesPage).hide();
}) 

function toggleDropDown()
{
    $(nav).toggle();

}
var webcardinterval;
//shows websites on portfolio page
function displayWebsites()
{
    console.log("changing to web");
    
    // hides all game cards
    for (cardCount; cardCount <= 3; cardCount++)
    {
        $(webCards[cardCount]).hide();
    }

    webcardinterval = setInterval( function(){
        $(webCards[cardCount]).fadeIn();
        if (cardCount >= 3)
        {
            clearInterval(webcardinterval);
        }
        cardCount++
    },100)
    cardCount =0;
}

//shows games on portfolio page
function displayGames()
{
    cardCount = 0;
    console.log("changing to games");
    // hides all website cards
    for (cardCount; cardCount <= 3; cardCount++)
    {
        $(webCards[cardCount]).hide();
    }
    cardCount = 0;
    $(gamesPage).fadeIn();
}