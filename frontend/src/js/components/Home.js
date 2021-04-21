export default {
    Home,
    NavHome,
    ShowSlides
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

        <div class="mySlides fade">
          <img class="studioImage" src='/images/StudioInventoryProjectPhoto1.jpg'>
        </div>

        <div class="mySlides fade">
        <img src="/images/StudioInventoryMicrophone.jpg">
      </div>
    
      <div class="mySlides fade">
        <img src="/images/StudioInventoryAmp.jpg">
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
      ShowSlides();
    })
}

var slideIndex = 0;

function ShowSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  setTimeout(ShowSlides, 5000);
}