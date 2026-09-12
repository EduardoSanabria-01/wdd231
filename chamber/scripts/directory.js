const url = '/wdd231/chamber/data/members.json';
const membersContainer = document.querySelector('#members-container');
const gridButton = document.querySelector('#grid');
const listButton = document.querySelector('#list');
const menuButton = document.querySelector('#menu-button');
const menuItems = document.querySelector('#menu-items');


if (menuButton) {
    menuButton.addEventListener('click', () => {
        menuItems.classList.toggle('open');
        menuButton.classList.toggle('open');
    });
}


async function getMembersData() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayMembers(data.companies);
    } catch (error) {
        console.error('Error fetching members data:', error);
    }
}


const displayMembers = (companies) => {
    membersContainer.innerHTML = '';
    companies.forEach((company) => {
        let card = document.createElement('section');
        let logo = document.createElement('img');
        let name = document.createElement('h3');
        let address = document.createElement('p');
        let phone = document.createElement('p');
        let website = document.createElement('a');
        let membership = document.createElement('p');

        logo.setAttribute('src', `images/${company.image}`);
        logo.setAttribute('alt', `Logo of ${company.name}`);
        logo.setAttribute('loading', 'lazy');
        logo.setAttribute('width', '120');
        logo.setAttribute('height', '120');

        name.textContent = company.name;
        address.textContent = company.address;
        phone.textContent = company.phone;
        
        website.setAttribute('href', company.website);
        website.setAttribute('target', '_blank');
        website.textContent = company.website;

        let levelText = company.membership === 3 ? 'Gold Member' : company.membership === 2 ? 'Silver Member' : 'Member';
        membership.textContent = `Level: ${levelText}`;
        membership.classList.add(`level-${company.membership}`);

        card.appendChild(logo);
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);
        card.appendChild(membership);

        membersContainer.appendChild(card);
    });
};

if (gridButton && listButton) {
    gridButton.addEventListener('click', () => {
        membersContainer.classList.add('grid');
        membersContainer.classList.remove('list');
    });

    listButton.addEventListener('click', () => {
        membersContainer.classList.add('list');
        membersContainer.classList.remove('grid');
    });
}


document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Modification: ${document.lastModified}`;


getMembersData();