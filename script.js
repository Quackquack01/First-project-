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

        document.querySelectorAll(".card").forEach(card => {

            if (filter === "all" || card.dataset.category === filter) {
                card.style.display = "";
            } else {
                card.style.display = "none";
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
document.querySelectorAll(".prompt-card").forEach(card => {
    card.addEventListener("click", () => {
        const title = card.querySelector("h3").innerText;
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

// Copy prompt
modalCopy.addEventListener("click", async () => {
    await navigator.clipboard.writeText(
        `${modalTitle.textContent}\n\n${modalText.textContent}`
    );

    modalCopy.textContent = "✅ Copied!";
    setTimeout(() => {
        modalCopy.textContent = "📋 Copy Prompt";
    }, 1500);
});

// Share prompt
modalShare.addEventListener("click", async () => {
    const content = `${modalTitle.textContent}\n\n${modalText.textContent}`;

    if (navigator.share) {
        navigator.share({
            title: modalTitle.textContent,
            text: content
        });
    } else {
        await navigator.clipboard.writeText(content);
        showToast("✅ Prompt copied!");

// Close modal with Escape key
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        modal.classList.remove("active");
    }
});

const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");

function showToast(message){
    toastMessage.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
}