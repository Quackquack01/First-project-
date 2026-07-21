const themeToggle = document.getElementById("themeToggle");

let dark = true;

themeToggle.addEventListener("click", () => {
    dark = !dark;

    if (dark) {
        document.body.style.background = "#050505";
        document.body.style.color = "#ffffff";
        themeToggle.textContent = "🌙";
    } else {
        document.body.style.background = "#f5f5f5";
        document.body.style.color = "#111111";
        themeToggle.textContent = "☀️";
    }
});

// Search functionality
const search = document.getElementById("search");

search.addEventListener("keyup", () => {

    const value = search.value.toLowerCase();

    document.querySelectorAll(".card").forEach(card => {

        card.style.display =
            card.innerText.toLowerCase().includes(value)
            ? "block"
            : "none";

    });

});