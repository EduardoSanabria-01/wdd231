// Menú de navegación responsivo (Hamburguesa)
const menuButton = document.querySelector('#menu-button');
const menuItems = document.querySelector('#menu-items');

if (menuButton && menuItems) {
    menuButton.addEventListener('click', () => {
        menuItems.classList.toggle('open');
        menuButton.classList.toggle('open');
    });
}

// Actualización automática del año en el Footer
const currentYearElement = document.querySelector('#currentyear');
if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}

// Actualización automática de la fecha de última modificación en el Footer
const lastModifiedElement = document.querySelector('#lastModified');
if (lastModifiedElement) {
    lastModifiedElement.textContent = `Last Modification: ${document.lastModified}`;
}