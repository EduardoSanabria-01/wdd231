const hamburgerBtn = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

if (hamburgerBtn && navigation) {
    hamburgerBtn.addEventListener('click', () => {
        navigation.classList.toggle('open');
        hamburgerBtn.classList.toggle('open');
    });
}

const currentYearSpan = document.querySelector('#currentyear');
const lastModifiedSpan = document.querySelector('#lastModified');

if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
}

if (lastModifiedSpan) {
    lastModifiedSpan.textContent = `Last Modification: ${document.lastModified}`;
}

const lat = '49.75';
const lon = '6.64';
const apiKey = '0d226ded3879e04cde7903fa87ee2f95'; 

const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const weatherDesc = document.querySelector('#weather-desc');
const forecastContainer = document.querySelector('#forecast-container');

async function apiFetch() {
    try {
        const responseCurrent = await fetch(currentWeatherUrl);
        if (responseCurrent.ok) {
            const dataCurrent = await responseCurrent.json();
            displayCurrentWeather(dataCurrent);
        } else {
            throw Error(await responseCurrent.text());
        }

        const responseForecast = await fetch(forecastUrl);
        if (responseForecast.ok) {
            const dataForecast = await responseForecast.json();
            displayForecast(dataForecast);
        } else {
            throw Error(await responseForecast.text());
        }

    } catch (error) {
        console.log('Error fetching weather data:', error);
    }
}

function displayCurrentWeather(data) {
    if (currentTemp) currentTemp.innerHTML = `${Math.round(data.main.temp)}`;
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    let desc = data.weather[0].description;
    
    desc = desc.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    if (weatherIcon) {
        weatherIcon.setAttribute('src', iconsrc);
        weatherIcon.setAttribute('alt', desc);
    }
    if (weatherDesc) {
        weatherDesc.textContent = desc;
    }
}

function displayForecast(data) {
    if (!forecastContainer) return;
    forecastContainer.innerHTML = '';

    const filteredForecast = data.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 3);

    filteredForecast.forEach(day => {
        const date = new Date(day.dt * 1000);
        const options = { weekday: 'short' };
        const dayName = date.toLocaleDateString('en-US', options);
        const temp = Math.round(day.main.temp);
        const iconCode = day.weather[0].icon;
        const iconSrc = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const dayDiv = document.createElement('div');
        dayDiv.classList.add('forecast-day');
        dayDiv.innerHTML = `
            <p><strong>${dayName}</strong></p>
            <img src="${iconSrc}" alt="${day.weather[0].description}">
            <p>${temp}&deg;F</p>
        `;
        forecastContainer.appendChild(dayDiv);
    });
}

if (currentTemp) {
    apiFetch();
}

const spotlightsContainer = document.querySelector('.spotlights-container');
const membersJsonUrl = 'data/members.json'; 

async function getSpotlightMembers() {
    try {
        const response = await fetch(membersJsonUrl);
        if (response.ok) {
            const data = await response.json();
            displaySpotlights(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log('Error loading members JSON:', error);
    }
}

function displaySpotlights(members) {
    if (!spotlightsContainer) return;

    const eligibleMembers = members.filter(member => 
        member.membershipLevel === 2 || 
        member.membershipLevel === 3 || 
        member.membershipLevel === 'Gold' || 
        member.membershipLevel === 'Silver'
    );

    const shuffled = eligibleMembers.sort(() => 0.5 - Math.random());
    const selectedMembers = shuffled.slice(0, 3);

    spotlightsContainer.innerHTML = '';

    selectedMembers.forEach(member => {
        const card = document.createElement('section');
        card.classList.add('card', 'spotlight-card');

        card.innerHTML = `
            <h3>${member.name}</h3>
            <p class="tagline"><em>${member.address || 'Local Business'}</em></p>
            <img src="images/${member.image}" alt="${member.name} Logo" class="spotlight-img">
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Membership:</strong> ${typeof member.membershipLevel === 'number' ? (member.membershipLevel === 3 ? 'Gold' : 'Silver') : member.membershipLevel}</p>
            <p><a href="${member.website}" target="_blank">Visit Website</a></p>
        `;
        spotlightsContainer.appendChild(card);
    });
}

if (spotlightsContainer) {
    getSpotlightMembers();
}