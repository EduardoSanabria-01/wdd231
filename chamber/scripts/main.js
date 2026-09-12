const menuButton = document.querySelector('#menu-button');
const menuItems = document.querySelector('.menu-items');

if (menuButton) {
    menuButton.addEventListener('click', () => {
        menuItems.classList.toggle('open');
    });
}

const lastModifiedSpan = document.querySelector('#lastModified');
if (lastModifiedSpan) {
    lastModifiedSpan.textContent = `Last Modification: ${document.lastModified}`;
}