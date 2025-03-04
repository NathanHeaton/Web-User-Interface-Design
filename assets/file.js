const nav = document.getElementsByClassName("main-nav");
const buttonPortfolio = document.getElementById("nav-button-content");

const gamesPage = document.getElementById("games")
const gameCards = Array.from(document.querySelectorAll(".game-cards")); // auto makes array from class elements

const websitesPage = document.getElementById("websites");
const webCards = Array.from(document.querySelectorAll(".web-cards"));

const otherPage = document.getElementById("other");
const otherCards = Array.from(document.querySelectorAll(".other-cards"));

const digitalpage = document.getElementById("digital");
const digitalcards = Array.from(document.querySelectorAll(".digital-cards"));

const tradpage = document.getElementById("trad");
const tradcards = Array.from(document.querySelectorAll(".trad-cards"));

const threeDpage = document.getElementById("threeD");
const threeDcards = Array.from(document.querySelectorAll(".threeD-cards"));

const sketchpage = document.getElementById("sketches");
const sketchcards = Array.from(document.querySelectorAll(".sketch-cards"));

const cardTitleHover = document.getElementsByClassName("card-titles");

let cardCount = 0;
let tab = null;
let previousTab = null;
let cards = [null];

let openCardFromStorage = false;

let isCardEnlarged = false; // keep track of if another card is enlarged

let previousEnlarged= null;
let previousEnlargedWidth= null ;

let openCards = [{name:"VLE", open: false, previousWidth: 66, classIndex: 1, tab: 6},
                {name:"DN", open: false, previousWidth: 66, classIndex: 4, tab: 6},
                {name:"STROW", open: false, previousWidth: 66, classIndex: 0, tab: 1},
                {name:"PHIAST", open: false, previousWidth: 66, classIndex: 11, tab: 7},
                {name:"RETROGRADE", open: false, previousWidth: 66, classIndex: 2, tab: 6},
                {name:"CAR", open: false, previousWidth: 66, classIndex: 11, tab: 2}
            ]; // stores cards that can be opened from other pages

// carousel Ai written and page fade transition
//==========================


document.addEventListener("DOMContentLoaded", function() {

    pageLoad();
    // this code was commented out
   barba.init({
        transitions: [
            {
                name: "fade",
                leave(data) {
                    return new Promise((resolve) => {
                        data.current.container.style.opacity = 0;
                        setTimeout(resolve, 125); // Wait for animation
                    });
                },
                enter(data) {
                    data.next.container.style.opacity = 0;
                    setTimeout(() => {
                        data.next.container.style.opacity = 1;
                    }, 125);
                },
                after() {

                    pageLoad(); 

                }
            }
        ]
    });
    
});

if(window.innerWidth > 768)
{
    document.addEventListener("mousemove",mouseEffect)
    document.addEventListener("wheel",mouseEffectWheel)
}

let customMouse = document.getElementById("mouse");
let mouseText = document.getElementById("mouse-over-text");
let mousePreviousPosition = {x: 0, y: 0}

let mouseScale = 1;
let mouseSize = 15;

let mousesEnlarged = false;
let animationIsPlaying = false;

function mouseEffect(event)
{
    let mouse = {x: event.pageX, y: event.pageY}
    let element = document.elementFromPoint(event.clientX,event.clientY)// finds the element the user is hovering over
    let cursorStyle = window.getComputedStyle(element).cursor;
    if (cursorStyle === "pointer" && mousesEnlarged == false && element.tagName == "DIV")
        {
            animationIsPlaying = true;
            mousesEnlarged = true;
            mouseText.style.display = "flex";
            $(customMouse).css("background-color", "#0066cc");
            $(customMouse).animate(
            {
                scale: mouseScale,
                width: "75px",
                height: "75px"
            }
           , 300)
        }
    else if (cursorStyle === "pointer" && mousesEnlarged == false)
    {
        animationIsPlaying = true;
        mousesEnlarged = true;
        mouseScale = 2
        $(customMouse).css("background-color", "#0066cc");
        $(customMouse).animate(
        {
            scale: mouseScale,
        }
       , 500)

    }

    
    if (cursorStyle != "pointer" && mousesEnlarged == true )
    {
        mousesEnlarged = false;
        mouseText.style.display = "none";
        
        console.log("shrinking")
        $(customMouse).stop("stopAll")
        mouseScale = 1
        $(customMouse).css("background-color", "#69de90");
        $(customMouse).animate(
            {
                scale: mouseScale,
                width: mouseSize,
                height: mouseSize
            }
           ,100)
    }

    //console.log(element)
    //stored for when page scrolls
    mousePreviousPosition.x = mouse.x;
    mousePreviousPosition.y = mouse.y;

    customMouse.style.left = mouse.x - (mouseSize/2)  + "px";
    customMouse.style.top = mouse.y - (mouseSize/2) + "px";

    

}

function mouseEffectWheel(event)
{

    customMouse.style.left = event.pageX + "px";
    customMouse.style.top = event.clientY + document.documentElement.scrollTop + "px";
    //console.log(mousePreviousPosition.y +"+"+ document.documentElement.scrollTop + "px")

}


const slides = document.querySelectorAll('.carousel-item');
const dots = document.querySelectorAll('.dot');
let currentIndex = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
        dots[i].classList.toggle('active', i === index);
    });
    currentIndex = index;
}

// Attach event listeners to dots
dots.forEach(dot => {
    dot.addEventListener('click', () => {
        const index = parseInt(dot.getAttribute('data-index'));
        showSlide(index);
    });
});


// Optional auto-slide functionality
setInterval(() => {
    const nextIndex = (currentIndex + 1) % slides.length;
    showSlide(nextIndex);
}, 6000); // Change slide every 3 seconds


function pageLoad(){
    let errorOpening = false;
    if(window.innerWidth > 768)
    {
        $(nav).show();
    }
    else
    {
        $(nav).fadeOut("slow");
        $(nav).animate({bottom: '250px'});
    }

    if (sessionStorage.length > 0)
        getStorage();
    // 
    try {

        openCards.find(o => o.open == true).open
    }
    catch{
        errorOpening = true;
    }

    if (errorOpening == false)
        {
            openCardFromStorage = true;
            displayTab(openCards.find(o => o.open == true).tab)
        }
    // only when the art page loads
    else if(document.getElementById("digital"))// checks if there is an id of digital which means pages must be art
    {
        displayTab(1); // loads digital page
    }
     // only when the code page loads
    else if(document.getElementById("websites"))// checks if there is an id of websites which means pages must be website
    {
        displayTab(6); // loads web page
    }

   
}

function getStorage()
{
    for (let i = 0; i <= openCards.length; i++)
        {
            if ( sessionStorage.getItem(openCards[i].name))
            {
                openCards[i].open = true;
                break;
            }
        }
}

function handleKey(event, card, t_num) {
    if (event.key === "Enter" || event.key === " ") {
        event.preventDefault(); // Prevent scrolling on space press
        enlargeCard(card, t_num);
    }
}

function enlargeCardFromSessionStorage()
{
    let cardData = openCards.find(n => n.open == true);
    numToTab(cardData.tab);
    let card = document.getElementsByClassName("image-card")[cardData.classIndex];

    if(previousTab != null) // hides the previous tab
    {
        $(previousTab).hide();
    }
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
        {$(cards[i]).fadeIn()};
        if (i == cards.length -1)
        {
            sessionStorage.clear()
            enlargeCard(card, 66)
        }
        
    } 
    cardCount =0;//resets counter


}
function toggleDropDown()
{
    $(nav).toggle();

}
let webcardinterval;
let gamecardinterval;
//shows websites on portfolio page
function displayTab(t_tab) // tab is the section the user clicked on e.g web or digital
{
    if (openCardFromStorage)
    {
        openCardFromStorage = false;
        enlargeCardFromSessionStorage()
    }
    else
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
        case 8 :
            tab = otherPage;
            cards.length = otherCards.length;
            cards = otherCards;
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
        if(t_this == previousEnlarged && window.innerWidth < 800)// togggle image if on mobile
        {
            return 0; // breaks out on shrinks card
        }
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
    let shortDescription = element.querySelectorAll(".short-description")

    if (t_this.classList.contains('has-extension'))
    {
        $(element.querySelectorAll(".card-extension")[0]).fadeIn();

    }
    
    if(window.innerWidth < 800) // if on mobile
    {
        element.style.width = "100vw"
        element.style.paddingBottom ="40px";
        element.style.marginBottom ="60px";

    }
    else{ 
        element.style.width = "100%"
    }
    element.style.backgroundColor = "#0c0c0c";
    // hide hover effect
    $(cardTitle[0]).hide();
    $(shortDescription[0]).hide();
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

    element.scrollIntoView({ behavior: 'smooth', block: 'start' }); // auto scrolls to element
        
}


function addCardToEnlarge(t_cardName) // adds a card to session storage so that in can be enlarged on another page
{
    let card = openCards.find(item => item.name == t_cardName) // card that need to be added to storage
    card.open = "true";
    console.log(openCards);

    sessionStorage.setItem(card.name, true); // placed in session storage
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
    let shortDescription = element.querySelectorAll(".short-description")

    $(element.querySelectorAll(".card-extension")[0]).hide();
  
    // changes card back to original size
    if(window.innerWidth < 800) // if on mobile
    {
        element.style.width = "100%"
        element.style.paddingBottom ="0px";
        element.style.margin ="0 0";
    }
    else{
        element.style.width = t_width_before+"%"; // for desktop
    }

    element.style.backgroundColor = "#e1e1e100";

    image1[0].style.width = "100%";
    image1[0].style.margin = "10px 10px 0 10px";
    $(shortDescription[0]).show();

        // fades in images
        $(extraImages[0]).hide();

    $(text[0]).hide();


    
    $(backButton[0]).hide();

    // show hover effect
    $(cardTitle[0]).show();




}