const themeToggle = document.getElementById("themeToggle");
const themeReveal = document.getElementById("themeReveal");
const body = document.body;

// Load saved theme
let dark = localStorage.getItem("theme") !== "light";

if (!dark) {
    body.classList.add("light");
    themeToggle.textContent = "☀️";
} else {
    body.classList.remove("light");
    themeToggle.textContent = "🌙";
}

themeToggle.addEventListener("click", () => {

    if (themeReveal) {
        const rect = themeToggle.getBoundingClientRect();

        themeReveal.style.left = rect.left + rect.width / 2 - 10 + "px";
        themeReveal.style.top = rect.top + rect.height / 2 - 10 + "px";

        themeReveal.style.background = dark ? "#ffffff" : "#050505";

        themeReveal.classList.remove("reveal");
        void themeReveal.offsetWidth;
        themeReveal.classList.add("reveal");
    }

    setTimeout(() => {
        dark = !dark;

        body.classList.toggle("light", !dark);
        themeToggle.textContent = dark ? "🌙" : "☀️";

        localStorage.setItem("theme", dark ? "dark" : "light");
    }, 250);
});

// Live Search
const search = document.getElementById("search");

search.addEventListener("input", () => {

    const value = search.value.toLowerCase();

    document.querySelectorAll(".card").forEach(card => {

        card.style.display =
            card.innerText.toLowerCase().includes(value)
                ? ""
                : "none";

    });

});

const toast = document.getElementById("toast");

document.querySelectorAll(".card button").forEach(button=>{

    button.addEventListener("click",()=>{

        navigator.clipboard.writeText(
            button.parentElement.innerText
        );

        toast.classList.add("show");

        setTimeout(()=>{

            toast.classList.remove("show");

        },2000);

    });

});

// Favorite Button with Local Storage

const favoriteButtons = document.querySelectorAll(".favBtn");

favoriteButtons.forEach((button, index) => {

    if (localStorage.getItem("fav" + index) === "true") {
        button.classList.add("active");
        button.textContent = "❤️";
    }

    button.addEventListener("click", () => {

        button.classList.toggle("active");

        const active = button.classList.contains("active");

        button.textContent = active ? "❤️" : "🤍";

        localStorage.setItem("fav" + index, active);

    });

});

// Category Filter

const filters = document.querySelectorAll(".filter");

filters.forEach(button => {

    button.addEventListener("click", () => {

        filters.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const filter = button.dataset.filter;

        document.querySelectorAll(".card").forEach((card, index) => {

            if (filter === "all") {
                card.style.display = "";
            }

            else if (filter === "favorites") {
                const isFav = localStorage.getItem("fav" + index) === "true";
                card.style.display = isFav ? "" : "none";
            }

            else {
                card.style.display =
                    card.dataset.category === filter ? "" : "none";
            }

        });

    });

});

// ===== Premium Prompt Modal =====

const modal = document.getElementById("promptModal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const closeModal = document.getElementById("closeModal");
const modalCopy = document.getElementById("modalCopy");
const modalShare = document.getElementById("modalShare");

// Open modal when a prompt card is clicked
document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", () => {
        const title = card.querySelector("h2").innerText;
        const text = card.querySelector("p").innerText;

        modalTitle.textContent = title;
        modalText.textContent = text;

        modal.classList.add("active");
    });
});

// Close modal
closeModal.addEventListener("click", () => {
    modal.classList.remove("active");
});

// Close when clicking outside
modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.remove("active");
    }
});

// Share prompt
// Share prompt
modalShare.addEventListener("click", async () => {
    const content = `${modalTitle.textContent}\n\n${modalText.textContent}`;

    if (navigator.share) {
        await navigator.share({
            title: modalTitle.textContent,
            text: content
        });
    } else {
        await navigator.clipboard.writeText(content);
        showToast("📤 Prompt copied!");
    }
});

// Close modal with Escape key
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        modal.classList.remove("active");
    }
});

const toastMessage = document.getElementById("toastMessage");

/* ===== Scroll Reveal ===== */

const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }
    });
},{
    threshold:0.15
});

document.querySelectorAll(".card").forEach(card=>{
    observer.observe(card);
});

/* ===== Ripple Effect ===== */

document.querySelectorAll("button,.heroBtn,.featuredBtn").forEach(btn=>{
    btn.addEventListener("click",function(e){
        const ripple=document.createElement("span");
        ripple.className="ripple";

        const size=Math.max(this.clientWidth,this.clientHeight);

        ripple.style.width=size+"px";
        ripple.style.height=size+"px";

        ripple.style.left=e.offsetX-size/2+"px";
        ripple.style.top=e.offsetY-size/2+"px";

        this.appendChild(ripple);

        setTimeout(()=>ripple.remove(),600);
    });
});

/* ===== Back To Top ===== */

const backToTop=document.getElementById("backToTop");

window.addEventListener("scroll",()=>{
    if(window.scrollY>400){
        backToTop.classList.add("show");
    }else{
        backToTop.classList.remove("show");
    }
});

backToTop.addEventListener("click",()=>{
    window.scrollTo({
        top:0,
        behavior:"smooth"
    });
});

/* ===== Result Counter ===== */

const resultCount = document.getElementById("resultCount");

function updateResultCount(){
    const visibleCards = [...document.querySelectorAll(".card")]
        .filter(card => card.style.display !== "none");

    resultCount.textContent =
        `Showing ${visibleCards.length} prompt${visibleCards.length !== 1 ? "s" : ""}`;
}

updateResultCount();

search.addEventListener("input", updateResultCount);

filters.forEach(button=>{
    button.addEventListener("click", updateResultCount);
});

/* ===== Keyboard Shortcuts ===== */

document.addEventListener("keydown",(e)=>{

    // Focus search with "/"
    if(
        e.key === "/" &&
        document.activeElement.tagName !== "INPUT" &&
        document.activeElement.tagName !== "TEXTAREA"
    ){
        e.preventDefault();
        search.focus();
    }

    // Clear search with Escape
    if(e.key === "Escape"){

        search.value="";

        document.querySelector('.filter.active')?.click();

        filterPrompts();

        search.blur();
    }

});

/* ===== Back To Top ===== */

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }
});

backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

/* ===== Navbar Scroll Effect ===== */

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});