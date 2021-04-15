export default {
    Footer,
    SetupFooter
}

function Footer(){
    return `
    <section id="footerStuff">   
        <div class="footerContent">
            <h4>Categories</h4>
            <ul>
                <li>Amps </li>
                <li>Mics</li>
                <li>Instruments</li>
                <li>Drums</li>
                <li>More</li>
            </ul>
        </div>
        <div class="footerContent">
            <h4>Contact Us</h4>
            <ul>
                <li>Email | vinnie@blah.edu </li>
                <li>Phone | (216)123-1234</li>
                <li>Address | 0000 Street Ave<br>Cleveland, OH 44144</li>
            </ul>
        </div>
    </section>
    `;
}

function SetupFooter() {
    const footerElement = document.querySelector(".footer");
    footerElement.innerHTML = Footer();
}