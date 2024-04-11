const nav = document.getElementsByClassName("main-nav");
const gamesPage = document.getElementById("games")
const websitesPage = document.getElementById("websites")
const webCards = [document.getElementById("web-card1"),document.getElementById("web-card2"),document.getElementById("web-card3"),document.getElementById("web-card4")];  
const gameCards = [document.getElementById("game-card1"), document.getElementById("game-card2"), document.getElementById("game-card3"), document.getElementById("game-card4") , document.getElementById("game-card5")]
let cardCount = 0;

let isCardEnlarged = false; // keep track of if another card is enlarged

let previousEnlarged= null;
let previousEnlargedWidth= null ;

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
    if (isCardEnlarged) // if card is enlarged this card is shrinked
    {
        shrinkCard(previousEnlarged, previousEnlargedWidth);//this shrink that previous card
    }
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


// enlarge card
function enlargeCard(t_this, t_width)
{
    if (isCardEnlarged) // if card is enlarged this card is shrinked
    {
        shrinkCard(previousEnlarged, previousEnlargedWidth);//this shrink that previous card
    }

        previousEnlarged = t_this;
        previousEnlargedWidth = t_width;

        isCardEnlarged = true;
        // gets all the elements that need to be altered
        let element = t_this.closest("section");// gets the full card content to alter
        let image1 = element.querySelectorAll(".image-card");
        let text = element.querySelectorAll(".card-text");
        let cardTitle = element.querySelectorAll(".card-titles");
        let backButton = element.querySelectorAll(".back-button");

        element.scrollIntoView({ behavior: 'smooth', block: 'start' }); // auto scrolls to element


        if(window.innerWidth < 800) // if on mobile
        {
            element.style.width = "100vw"
            //element.style.padding = "-50px"

        }
        else{ 
            element.style.width = "100%"
        }
        element.style.backgroundColor = "#0c0c0c";

        // hide hover effect
        $(cardTitle[0]).hide();

        // alters image
        if(window.innerWidth < 800) // if on mobile
        {
            image1[0].style.width = "100%";
        }
        else{ // for desktop
            image1[0].style.width = "calc(50% - 50px";
            image1[0].style.margin = "25px";
        }

        // fades in text
        $(text[0]).fadeIn();

        // fades in button
        $(backButton[0]).fadeIn();


}

function shrinkCard(t_this, t_width_before)
{
    isCardEnlarged = false;
    // gets all the elements that need to be altered
    let element = t_this.closest("section");// gets the full card content to alter
    let image1 = element.querySelectorAll(".image-card");
    let text = element.querySelectorAll(".card-text");
    let cardTitle = element.querySelectorAll(".card-titles");
    let backButton = element.querySelectorAll(".back-button");

    // changes card back to original size
    if(window.innerWidth < 800) // if on mobile
    {
        element.style.width = "100%"
    }
    else{
        element.style.width = t_width_before+"%"; // for desktop
    }

    element.style.backgroundColor = "#e1e1e100";

    image1[0].style.width = "100%";
    image1[0].style.margin = "10px";

    $(text[0]).hide();

    
    $(backButton[0]).hide();

    // show hover effect
    $(cardTitle[0]).show();


}