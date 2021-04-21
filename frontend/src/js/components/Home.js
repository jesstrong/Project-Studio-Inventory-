export default {
  Home,
  NavHome,
  ShowSlides,
};

const appDiv = document.getElementById("app");
var slides = document.getElementsByClassName("mySlides");

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
    <p>This site was created out of a need for having inventory accessibility for studio equipment along with an entire studio readily available. As a collaborative team effort, keeping in mind the user will have an ease of viewing inventoried items by category and open rental date(s). As equipment becomes available, the administrator can readily upload new pieces of equipment and as a logged-in user, that user can choose their required items and set up their own studio in minutes! No more streams of paper or antiquated filing systems to try and find out what is available and when it can be used. 
    We would love to hear your thoughts as well on how you like our studio equipment inventory solution, questions you may have and always your feedback is welcome!
    </p>
</section>


    `;
}

function NavHome() {
  const homeLink = document.querySelector(".nav_home");
  homeLink.addEventListener("click", function () {
    appDiv.innerHTML = Home();
    slides[0].style.display = "block";
  });
}

var slideIndex = 0;

function ShowSlides() {
  if (slides.length != 0) {
    var i;
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
      slideIndex = 1;
    }
    slides[slideIndex - 1].style.display = "block";
  }
}
