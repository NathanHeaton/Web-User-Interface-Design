document.getElementById("hamburger").addEventListener('click', toggleDropDown);
const nav = document.getElementsByTagName("nav");
const gamesPage = document.getElementById("games")
const websitesPage = document.getElementById("websites")
const webCards = [document.getElementById("web-card1"),document.getElementById("web-card2"),document.getElementById("web-card3"),document.getElementById("web-card4")];  
const gameCards = [document.getElementById("game-card1"), document.getElementById("game-card2"), document.getElementById("game-card3"), document.getElementById("game-card4") , document.getElementById("game-card5")]
let cardCount = 0;


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
var webcardinterval;
//shows websites on portfolio page
function displayWebsites()
{
    console.log("changing to web");
    // hides all game cards
    for (let i = 0; i <= gameCards.length; i++)
    {
        $(gameCards[i]).hide();
    }
    cardCount =0;//resets counter
    
    // fades in all web cards 1 by 1
    webcardinterval = setInterval( function(){
        $(webCards[cardCount]).fadeIn();
        if (cardCount >= 3)
        {
            clearInterval(webcardinterval);
        }
        cardCount++
    },100)
    cardCount =0;//resets counter
}

//shows games on portfolio page
function displayGames()
{
    console.log("changing to games");
    
    // hides all web cards
    for (let i = 0; i < webCards.length; i++)
    {
        $(webCards[i]).hide();
    }
    cardCount =0;//resets counter
    
    // fades in all game cards 1 by 1
    webcardinterval = setInterval( function(){
        $(gameCards[cardCount]).fadeIn();
        if (cardCount >= 4)
        {
            clearInterval(webcardinterval);
        }
        cardCount++
    },100)
    cardCount =0;//resets counter
}