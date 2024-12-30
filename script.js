// Background Music
const backgroundMusic = new Audio('https://example.com/your-background-music.mp3');
backgroundMusic.loop = true;
backgroundMusic.volume = 0.2;
document.getElementById('toggle-music').addEventListener('click', () => {
  if (backgroundMusic.paused) {
    backgroundMusic.play();
    document.getElementById('toggle-music').innerText = 'Pause Music';
  } else {
    backgroundMusic.pause();
    document.getElementById('toggle-music').innerText = 'Play Music';
  }
});

// Dark Mode Toggle
const toggleDarkMode = () => {
  document.body.classList.toggle('dark-mode');
  const modeButton = document.getElementById('dark-mode-toggle');
  if (document.body.classList.contains('dark-mode')) {
    modeButton.innerText = 'Light Mode';
  } else {
    modeButton.innerText = 'Dark Mode';
  }
};
document.getElementById('dark-mode-toggle').addEventListener('click', toggleDarkMode);

// Weather Information
const weatherApiKey = 'b2f5a31713cd9cf1d6d79e14439fc163';
const fetchWeather = async (city = 'Karachi') => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric`
  );
  const data = await response.json();
  document.getElementById('weather-location').innerText = `${data.name}, ${data.sys.country}`;
  document.getElementById('weather-temp').innerText = `${data.main.temp}°C`;
  document.getElementById('weather-desc').innerText = data.weather[0].description;
};

document.getElementById('weather-search-btn').addEventListener('click', () => {
  const city = document.getElementById('weather-search-input').value;
  fetchWeather(city);
});

// Smooth Scroll to Top
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
document.getElementById('scroll-to-top').addEventListener('click', scrollToTop);

// Initial Setup
document.addEventListener('DOMContentLoaded', () => {
  fetchWeather();
  document.getElementById('scroll-to-top').style.display = 'none';

  window.addEventListener('scroll', () => {
    const scrollToTopButton = document.getElementById('scroll-to-top');
    if (window.scrollY > 300) {
      scrollToTopButton.style.display = 'block';
    } else {
      scrollToTopButton.style.display = 'none';
    }
  });
});


// Recipe Search using Spoonacular API
const spoonacularApiKey = '08975685f2de46edba42550b2904f53e';
const fetchRecipes = async (query = 'pasta') => {
  const response = await fetch(
    `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${spoonacularApiKey}&number=5`
  );
  const data = await response.json();
  const recipeList = document.getElementById('recipe-list');
  recipeList.innerHTML = '';

  data.results.forEach((recipe) => {
    const recipeItem = document.createElement('div');
    recipeItem.classList.add('recipe-item');
    recipeItem.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.title}">
      <h3>${recipe.title}</h3>
      <button class="view-recipe-btn" data-id="${recipe.id}">View Recipe</button>
    `;
    recipeList.appendChild(recipeItem);
  });
};

document.getElementById('recipe-search-btn').addEventListener('click', () => {
  const query = document.getElementById('recipe-search-input').value;
  fetchRecipes(query);
});

// View Recipe Details
document.getElementById('recipe-list').addEventListener('click', async (event) => {
  if (event.target.classList.contains('view-recipe-btn')) {
    const recipeId = event.target.getAttribute('data-id');
    const response = await fetch(
      `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${spoonacularApiKey}`
    );
    const data = await response.json();

    const recipeDetails = document.getElementById('recipe-details');
    recipeDetails.innerHTML = `
      <h2>${data.title}</h2>
      <img src="${data.image}" alt="${data.title}">
      <p>${data.summary}</p>
      <a href="${data.sourceUrl}" target="_blank">Full Recipe</a>
    `;
    recipeDetails.scrollIntoView({ behavior: 'smooth' });
  }
});

// Leaflet Map
const initializeMap = () => {
  const map = L.map('map').setView([24.8607, 67.0011], 13); // Coordinates for Karachi
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
  }).addTo(map);

  L.marker([24.8607, 67.0011]).addTo(map).bindPopup('Karachi, Pakistan').openPopup();
};
initializeMap();

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach((question) => {
  question.addEventListener('click', () => {
    question.classList.toggle('active');
    const answer = question.nextElementSibling;
    if (answer.style.maxHeight) {
      answer.style.maxHeight = null;
    } else {
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});


// YouTube Embedded Video Player
document.getElementById('youtube-search-btn').addEventListener('click', () => {
  const query = document.getElementById('youtube-search-input').value;
  const videoEmbed = document.getElementById('youtube-video');
  const embedUrl = `https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(query)}`;
  videoEmbed.src = embedUrl;
  videoEmbed.scrollIntoView({ behavior: 'smooth' });
});

// Background Animation Effects
const createStars = () => {
  const starsContainer = document.getElementById('stars');
  for (let i = 0; i < 100; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.left = Math.random() * 100 + 'vw';
    star.style.top = Math.random() * 100 + 'vh';
    star.style.animationDuration = Math.random() * 5 + 2 + 's';
    starsContainer.appendChild(star);
  }
};
createStars();

// Notification for New Features
const showNotification = (message) => {
  const notification = document.createElement('div');
  notification.classList.add('notification');
  notification.innerText = message;
  document.body.appendChild(notification);
  setTimeout(() => {
    notification.remove();
  }, 5000);
};

// Trigger Example Notifications
document.getElementById('trigger-notification').addEventListener('click', () => {
  showNotification('New feature added! Check out our Recipe Search.');
});

// Real-Time Clock
const updateClock = () => {
  const clockElement = document.getElementById('real-time-clock');
  const now = new Date();
  clockElement.innerText = now.toLocaleTimeString();
};
setInterval(updateClock, 1000);
updateClock();

// Sound Effects on Interaction
const buttonClickSound = new Audio('https://example.com/button-click-sound.mp3');
document.querySelectorAll('button').forEach((button) => {
  button.addEventListener('click', () => {
    buttonClickSound.play();
  });
});

// User Greetings
const displayGreeting = () => {
  const hours = new Date().getHours();
  const greetingElement = document.getElementById('user-greeting');
  if (hours < 12) {
    greetingElement.innerText = 'Good Morning!';
  } else if (hours < 18) {
    greetingElement.innerText = 'Good Afternoon!';
  } else {
    greetingElement.innerText = 'Good Evening!';
  }
};
displayGreeting();



// Dark Mode Toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
});

// Load Dark Mode State from Local Storage
const loadDarkModePreference = () => {
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
  }
};
loadDarkModePreference();

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
});

// Search Suggestions (Dummy Data)
const searchSuggestions = ['Pasta', 'Pizza', 'Sushi', 'Tacos', 'Burgers'];
const showSuggestions = (query) => {
  const suggestionList = document.getElementById('suggestions-list');
  suggestionList.innerHTML = '';
  searchSuggestions.filter(item => item.toLowerCase().includes(query.toLowerCase())).forEach(item => {
    const suggestionItem = document.createElement('li');
    suggestionItem.textContent = item;
    suggestionList.appendChild(suggestionItem);
  });
};

document.getElementById('recipe-search-input').addEventListener('input', (e) => {
  showSuggestions(e.target.value);
});

// Weather Widget Updates
const fetchWeatherData = async (city = 'Karachi') => {
  const apiKey = 'your-weather-api-key';
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
  const data = await response.json();
  const weatherWidget = document.getElementById('weather-widget');
  weatherWidget.innerHTML = `
    <h3>Weather in ${data.name}</h3>
    <p>${data.weather[0].description}</p>
    <p>Temperature: ${data.main.temp}°C</p>
    <p>Humidity: ${data.main.humidity}%</p>
  `;
};
fetchWeatherData();

// Real-Time Location Weather Updates
const fetchLocationWeather = async () => {
  navigator.geolocation.getCurrentPosition(async (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const apiKey = 'your-weather-api-key';
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    const weatherWidget = document.getElementById('weather-widget');
    weatherWidget.innerHTML = `
      <h3>Weather at Your Location</h3>
      <p>${data.weather[0].description}</p>
      <p>Temperature: ${data.main.temp}°C</p>
      <p>Humidity: ${data.main.humidity}%</p>
    `;
  });
};
fetchLocationWeather();

// Scroll to Top Button
const scrollToTopButton = document.getElementById('scroll-to-top');
scrollToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});

// User Feedback Form (Dummy)
document.getElementById('feedback-form').addEventListener('submit', (event) => {
  event.preventDefault();
  alert('Thank you for your feedback!');
});



// YouTube Video Embedding (Dummy Implementation)
const youtubeVideos = [
  {
    title: 'Tasty Recipes for Beginners',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    title: 'Food Plating Techniques',
    url: 'https://www.youtube.com/embed/oHg5SJYRHA0',
  },
  {
    title: 'How to Make Perfect Pasta',
    url: 'https://www.youtube.com/embed/3JZ_D3ELwOQ',
  },
];

const embedYoutubeVideos = () => {
  const videoContainer = document.getElementById('youtube-video-container');
  youtubeVideos.forEach((video) => {
    const iframe = document.createElement('iframe');
    iframe.src = video.url;
    iframe.width = '560';
    iframe.height = '315';
    iframe.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    const title = document.createElement('h4');
    title.textContent = video.title;
    videoContainer.appendChild(title);
    videoContainer.appendChild(iframe);
  });
};
embedYoutubeVideos();

// Recipe Card Display (Dummy Data)
const displayRecipes = () => {
  const recipes = [
    {
      title: 'Spaghetti Bolognese',
      imageUrl: 'https://source.unsplash.com/1600x900/?spaghetti',
      description: 'A classic Italian pasta dish with rich meat sauce.',
    },
    {
      title: 'Chicken Curry',
      imageUrl: 'https://source.unsplash.com/1600x900/?chicken-curry',
      description: 'A flavorful and spicy chicken curry made with coconut milk.',
    },
    {
      title: 'Vegan Tacos',
      imageUrl: 'https://source.unsplash.com/1600x900/?tacos',
      description: 'Tasty and healthy vegan tacos with fresh toppings.',
    },
  ];

  const recipeContainer = document.getElementById('recipe-cards');
  recipes.forEach((recipe) => {
    const card = document.createElement('div');
    card.classList.add('recipe-card');
    card.innerHTML = `
      <img src="${recipe.imageUrl}" alt="${recipe.title}" />
      <h4>${recipe.title}</h4>
      <p>${recipe.description}</p>
    `;
    recipeContainer.appendChild(card);
  });
};
displayRecipes();

// Recipe Search (Dummy Data)
const searchRecipes = () => {
  const searchQuery = document.getElementById('recipe-search-input').value.toLowerCase();
  const allRecipes = document.querySelectorAll('.recipe-card');
  allRecipes.forEach((recipe) => {
    const title = recipe.querySelector('h4').textContent.toLowerCase();
    if (title.includes(searchQuery)) {
      recipe.style.display = 'block';
    } else {
      recipe.style.display = 'none';
    }
  });
};

document.getElementById('recipe-search-input').addEventListener('input', searchRecipes);

// Display Map using Leaflet (Location)
const displayMap = () => {
  const map = L.map('map').setView([24.8607, 67.0011], 10); // Karachi, Pakistan

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
  }).addTo(map);

  L.marker([24.8607, 67.0011]).addTo(map)
    .bindPopup('<b>Karachi</b>')
    .openPopup();
};

displayMap();

// Video Background Effect (Dummy)
const videoBackground = document.getElementById('video-background');
if (videoBackground) {
  videoBackground.src = 'https://www.w3schools.com/html/movie.mp4'; // Example video URL
  videoBackground.play();
  videoBackground.loop = true;
}

// Event Listener for Feedback Button
document.getElementById('feedback-button').addEventListener('click', () => {
  alert('We value your feedback! Thank you.');
});

// Light/Dark Theme Toggle Functionality
const toggleTheme = () => {
  const body = document.body;
  body.classList.toggle('dark-theme');

  const themeIcon = document.getElementById('theme-icon');
  if (body.classList.contains('dark-theme')) {
    themeIcon.src = 'https://www.flaticon.com/svg/static/icons/svg/929/929531.svg'; // Moon Icon
  } else {
    themeIcon.src = 'https://www.flaticon.com/svg/static/icons/svg/929/929318.svg'; // Sun Icon
  }
};

document.getElementById('theme-toggle-button').addEventListener('click', toggleTheme);

// Play Background Music (Dummy)
const playBackgroundMusic = () => {
  const audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'); // Example music file
  audio.loop = true;
  audio.play();
};

document.getElementById('play-music-button').addEventListener('click', playBackgroundMusic);

// Display Random Recipe on Button Click
const displayRandomRecipe = () => {
  const randomRecipes = [
    {
      title: 'Chocolate Cake',
      imageUrl: 'https://source.unsplash.com/1600x900/?cake',
      description: 'A rich and decadent chocolate cake for any occasion.',
    },
    {
      title: 'Grilled Cheese Sandwich',
      imageUrl: 'https://source.unsplash.com/1600x900/?grilled-cheese',
      description: 'A simple and delicious grilled cheese sandwich.',
    },
    {
      title: 'Salad Bowl',
      imageUrl: 'https://source.unsplash.com/1600x900/?salad',
      description: 'A healthy salad bowl with fresh ingredients.',
    },
  ];

  const randomRecipe = randomRecipes[Math.floor(Math.random() * randomRecipes.length)];

  const recipeDisplay = document.getElementById('random-recipe-display');
  recipeDisplay.innerHTML = `
    <img src="${randomRecipe.imageUrl}" alt="${randomRecipe.title}" />
    <h4>${randomRecipe.title}</h4>
    <p>${randomRecipe.description}</p>
  `;
};

document.getElementById('random-recipe-button').addEventListener('click', displayRandomRecipe);

// Initialize All Features and Call Functions
const initializeSite = () => {
  displayRecipes();
  embedYoutubeVideos();
  displayMap();
  playBackgroundMusic();
  displayRandomRecipe();
};

initializeSite();





