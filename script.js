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
            body.style.background = "#050505";
            body.style.color = "#ffffff";
            themeToggle.textContent = "🌙";
        } else {
            body.style.background = "#f5f5f5";
            body.style.color = "#111111";
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