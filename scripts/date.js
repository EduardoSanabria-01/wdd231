const currentYearElement = document.querySelector("#currentyear");
const today = new Date();
currentYearElement.textContent = today.getFullYear();

const lastModifiedElement = document.querySelector("#lastModified");
lastModifiedElement.innerHTML = `Last Modification: <span class="highlight">${document.lastModified}</span>`;