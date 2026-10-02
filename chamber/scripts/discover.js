import { discoverItems } from '../data/discover.mjs';

document.addEventListener("DOMContentLoaded", () => {
    // 1. Render Discover Cards
    const cardsContainer = document.getElementById("cards-container");

    discoverItems.forEach((item, index) => {
        const card = document.createElement("section");
        card.classList.add(`card-${index + 1}`, "discover-card");

        card.innerHTML = `
            <h2>${item.title}</h2>
            <figure>
                <img src="${item.photo}" alt="${item.title}" loading="lazy" width="300" height="200">
            </figure>
            <address>${item.address}</address>
            <p>${item.description}</p>
            <button>Learn More</button>
        `;

        cardsContainer.appendChild(card);
    });

    // 2. Visitor Message Logic using localStorage and Date Math
    const visitorMessage = document.getElementById("visitor-message");
    const lastVisit = localStorage.getItem("lastVisit_date");
    const now = Date.now();

    if (!lastVisit) {
        visitorMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const daysDifference = Math.floor((now - Number(lastVisit)) / (1000 * 60 * 60 * 24));

        if (daysDifference < 1) {
            visitorMessage.textContent = "Back so soon! Awesome!";
        } else if (daysDifference === 1) {
            visitorMessage.textContent = "You last visited 1 day ago.";
        } else {
            visitorMessage.textContent = `You last visited ${daysDifference} days ago.`;
        }
    }

    localStorage.setItem("lastVisit_date", now);

    // Footer Dates
    const currentYearEl = document.getElementById("currentyear");
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }
    
    const lastModifiedEl = document.getElementById("lastModified");
    if (lastModifiedEl) {
        lastModifiedEl.textContent = `Last Modification: ${document.lastModified}`;
    }
});