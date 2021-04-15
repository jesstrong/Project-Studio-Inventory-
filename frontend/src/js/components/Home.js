export default {
    Home,
    NavHome
}

const appDiv = document.getElementById('app');

function Home() {
    return `
    <section id="studioImages">
    <div id="images_Container">
        <div class="text">
        </div>
        <!-- <img class="studioImage"src="images/StudioInventoryProjectPhoto1.jpg"> -->
    </div>
    <div class="slideshow-container">

        <!-- Full-width images with number and caption text -->
        <div class="mySlides fade">
          <img class="studioImage" src='/images/StudioInventoryProjectPhoto1.jpg'>
          <!-- <div class="text"><button>CLICKABLE BUTTON?</button></div> -->
        </div>
      
    </div>

</section>


<section id="aboutUs">
    <h2>ABOUT US</h2>
    <p>We do stuff and thing.  Sometimes we're busy doing stuff, other times we're busy doing things.  
    It just depends on who you ask.  But don't ask me.  I don't know any thing.  Rent some stuff ya idiot.  
    Or maybe I should have added that lorem ipsum BS here.  Whatever. We do stuff and thing.  
    Sometimes we're busy doing stuff, other times we're busy doing things.  It just depends on who you ask.  
    But don't ask me.  I don't know any thing.  Rent some stuff ya idiot.  Or maybe I should have added that lorem ipsum BS here.  Whatever. We do stuff and thing.  Sometimes we're busy doing stuff, other times we're busy doing things.  It just depends on who you ask.  But don't ask me.  I don't know any thing.  Rent some stuff ya idiot.  Or maybe I should have added that lorem ipsum BS here.  Whatever. We do stuff and thing.  Sometimes we're busy doing stuff, other times we're busy doing things.  It just depends on who you ask.  But don't ask me.  I don't know any thing.  Rent some stuff ya idiot.  Or maybe I should have added that lorem ipsum BS here.  Whatever.</p>
</section>


    `;
}

function NavHome() {
    const homeLink = document.querySelector(".nav_home");
    homeLink.addEventListener('click', function (){
        appDiv.innerHTML = Home();
    })
}