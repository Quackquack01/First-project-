const themeToggle = document.getElementById("themeToggle");
const themeReveal = document.getElementById("themeReveal");
const body = document.body;

let dark = true;

themeToggle.addEventListener("click", (e) => {

    // Position the reveal circle where the button was clicked
    const rect = themeToggle.getBoundingClientRect();

    themeReveal.style.left = rect.left + rect.width / 2 - 10 + "px";
    themeReveal.style.top = rect.top + rect.height / 2 - 10 + "px";

    // Set the reveal color
    if (dark) {
        themeReveal.style.background = "#ffffff";
    } else {
        themeReveal.style.background = "#050505";
    }

    // Restart animation
    themeReveal.classList.remove("reveal");
    void themeReveal.offsetWidth;
    themeReveal.classList.add("reveal");

    // Change theme after a short delay
    setTimeout(() => {
        dark = !dark;

        if (dark) {
    body.classList.remove("light");
    themeToggle.textContent = "🌙";
} else {
    body.classList.add("light");
    themeToggle.textContent = "☀️";
}
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

        document.querySelectorAll(".card").forEach(card => {

            if (filter === "all" || card.dataset.category === filter) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }

        });

    });

});