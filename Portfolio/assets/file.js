const nav = document.getElementsByClassName("main-nav");
const buttonPortfolio = document.getElementById("nav-button-content");

const gamesPage = document.getElementById("games")
const gameCards = Array.from(document.querySelectorAll(".game-cards"));

const websitesPage = document.getElementById("websites")
const webCards = Array.from(document.querySelectorAll(".web-cards"));


const digitalpage = document.getElementById("digital");
const digitalcards = Array.from(document.querySelectorAll(".digital-cards"));

const tradpage = document.getElementById("trad");
const threeDpage = document.getElementById("threeD");
const sketchpage = document.getElementById("sketches");

let cardCount = 0;
let tab = null;
let previousTab = null;
let cards = [null];

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
let webcardinterval;
let gamecardinterval;
//shows websites on portfolio page
function displayTab(t_tab) // tab is the section the user clicked on e.g web or digital
{
    
    if(previousTab != null) // hides the previous tab
    {
        $(previousTab).hide();
    }
    numToTab(t_tab);

    for (let i = 0; i <= cards.length; i++)
    {
        $(cards[i]).hide();
    }

    $(tab).show();
    tab.style.display = "flex";
    previousTab = tab;
    cardCount =0;//resets counter
    
    // fades in all web cards 1 by 1
    for (let i = 0; i <= cards.length; i++)
    {
        setTimeout(function(){$(cards[i]).fadeIn()},i * 100);
        
    }
    
    cardCount =0;//resets counter




}

// translates tab in to it's class
function numToTab(num){

    switch(num){
        case 1 :
            tab = digitalpage;
            cards.length = digitalcards.length;
            cards = digitalcards;
            break;
        case 2 :
            tab = tradpage;
            break;
        case 3 :
            tab = threeDpage;
            break;
        case 4 :
            tab = sketchpage;
            break;
        case 6 :
            tab = websitesPage;
            cards.length = webCards.length;
            cards = webCards;
            break;
        case 7 :
            tab = gamesPage;
            cards.length = gameCards.length;
            cards = gameCards;
            break;
        default:
            console.log("tab doesn't exsit");
    }
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
    let extraImages = element.querySelectorAll(".Image-inner-card");

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
    // fades in images
    $(extraImages[0]).fadeIn();
    extraImages[0].style.display = "flex";
        
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
    let extraImages = element.querySelectorAll(".Image-inner-card");

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

        // fades in images
        $(extraImages[0]).hide();

    $(text[0]).hide();

    
    $(backButton[0]).hide();

    // show hover effect
    $(cardTitle[0]).show();




}