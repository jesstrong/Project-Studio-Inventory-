export default {
    ContactPage,
    NavContact
}

const appDiv = document.getElementById('app');

function ContactPage() {
    return `
    <h2>Contact Info</h2>
    
    <br/>

    <section id="ContactAddress">
        <p><strong>Location:</strong></p>
        <p>Example Studios</p>
        <p>0000 Street Ave.</p>
        <p>Akron, OH 44144</p>
    </section>

    <br/>
    <br/>

    <section id="ContactPhone">
        <p><strong>Phone:</strong> (216) 123-1234</p>
    </section>

    <section id="ContactEmail">
        <p><strong>Email:</strong> vinnie@example.studio</p>
    </section>

    <br/>
    <br/>

    <section id="ContactHours">
        <p><strong>Hours:</strong></p>
        <p>Sunday: Closed</p>
        <p>Monday: 10am-5pm</p>
        <p>Tuesday: 10am-6pm</p>
        <p>Wednesday: 9am-5pm</p>
        <p>Thursday: 9am-5pm</p>
        <p>Friday: Closed</p>
        <p>Saturday: 12pm-6pm</p>
        <br/>
        <p>Note: These are regular hours, but special accomodations can be made. Be sure to email or call us at least a week ahead of time, and we will do our best to accomodate your needs.</p>
    </section>

    <br/>

    `;
}

function NavContact() {
    const homeLink = document.querySelector(".nav_contact");
    homeLink.addEventListener('click', function (){
        appDiv.innerHTML = ContactPage();
    })
}