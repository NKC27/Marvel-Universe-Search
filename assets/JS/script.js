// API key for marvel
var APIkey = "444d6366dd602b2c74da79df008bd617";

// Change to id characterSearched
var characterSearched = document.querySelector(".hero-searched");
var searchButton = document.querySelector(".btn");

// Setting Class 'hide' for section to be hidden from user until 'search' is clicked
var hideSection = document.querySelector(".hide");

// Info Card Sections
var infoSection = document.querySelector(".information-display");
var sideCardContent = document.querySelector(".card-content");

// Marvel API Display for Image and Description Elements
var heroName = document.getElementById("hero-name");
var ourDescription = document.getElementById("our-description");
var ourImg = document.getElementById("marvel-img");

// Local Storage Function to keep previously searched data on page
var previousSearchs = JSON.parse(localStorage.getItem("heroes-searched")) || [];

// Side Navbar code
var sideNav = document.querySelector(".sidenav");
M.Sidenav.init(sideNav, {});

// Banner Code allows us to add more image and create a transition Banner
var slider = document.querySelector(".slider");
M.Slider.init(slider, {
  indicators: false,
  height: 500,
  transition: 500,
  interval: 6000,
});

// Autocomplete feature for the searchbar
var autoComplete = document.querySelector(".autocomplete");
M.Autocomplete.init(autoComplete, {
  data: {
    // Spaced Characters
    "Silver Surfer": null,
    "Spider Man": null,
    "Iron man": null,
    "Black Panther": null,
    "Doctor Strange": null,
    "Captain America": null,
    "Ant-Man": null,
    "Captain Marvel": null,
    "Guardians Of The Galaxy": null,
    "Doctor Strange": null,
    "Silver Surfer": null,
    // None Spaced Characters
    Wolverine: null,
    Avengers: null,
    Deadpool: null,
    Hulk: null,
    Thor: null,
    Drax: null,
    Groot: null,
    Celestials: null,
    Eternals: null,
    Thanos: null,
    Galactus: null,
    Loki: null,
    Roket: null,
    Loki: null,
  },
});

// Function to fetch character information from the marvel api
function getCharacterInfo(heroSearched) {
  var URLforCharacters =
    "https://gateway.marvel.com/v1/public/characters?name=" +
    heroSearched +
    "&apikey=" +
    APIkey;

  return fetch(URLforCharacters).then(function (res) {
    return res.json();
  });
}

// Populate Description & Image using this function
function displayDescription(responseData) {
  // If API does not return any information on a given character
  if (responseData.data.results.length === 0) {
    M.toast({
      html:
        "Unfortunatley, We do not have any information on this character!" +
        `<i class="material-icons">flag</i>`,
      classes: "rounded red",
    });
    return;
  }

  // Variables for the data needed from api fetch
  var marvelDescr = responseData.data.results[0].description;
  var marvelImage = responseData.data.results[0].thumbnail.path;
  var marvelName = responseData.data.results[0].name;

  // If the description, Image or there is no result for that search...
  if (!marvelDescr || !marvelImage || responseData.data.count.length === 0) {
    // THEN display this alert message.
    M.toast({
      html:
        " Unfortunatley, We do not have enough information on this character!" +
        `<i class="material-icons">flag</i>`,
      classes: "rounded red",
    });
  } else {
    // Add these cards using materialize code, to our HTML to display the correct information
    var summaryArea = document.querySelector(".character-summary-container");
    // Setting the information from the data to index.html elements
    // This will populate a card that displays the description of the character searched, using the marvel api.
    summaryArea.innerHTML = `
      <div class="row information-display">
          <div class="row">
            <div class="biography-card">
              <div class="col m6 s6">
                <div class="card white">
                  <div class="card-content black-text">
                    <span class="card-title">CHARACTER SUMMARY</span>
                    <p id="our-description">${marvelDescr}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div> `;

    var statsArea = document.querySelector(".character-stats-container");

    // This will populate the side card and display the image and name using the marvel api
    statsArea.innerHTML = `   
            <div id="stats-card">
                <div class="card">
                  <div class="card-image">
                    <img id="marvel-img" src="${marvelImage}.jpg" />
                  </div>
            
                  <div class="card-content">
                    <h5 id="hero-name">${marvelName}</h5>
                    <p>For more Information:</p>
                  </div>

                  
                  <div class="card-action">
                    <a id="wiki-link" class="link-color">Wikipedia</a>
                  </div>

                  <div class="card-action">
                    <a id="comic-link" class="link-color">Comic Link</a>
                  </div>

                  <div class="card-action">
                    <a id="marvel-comics" class="link-color">Marvel Comics</a>
                  </div>

                </div>
            </div>`;
  }
}

// Display Links on Image Cards for characters
function displayLinks(responseData) {
  // Side-Card Link Elements
  var wikiLinkEl = document.getElementById("wiki-link");
  var comicLinkEl = document.getElementById("comic-link");
  var marvelComicsEl = document.getElementById("marvel-comics");

  // Display marvel information in the elements
  var wikiLink = responseData.data.results[0].urls[1].url;
  wikiLinkEl.setAttribute("href", wikiLink);
  var comicLink = responseData.data.results[0].urls[2].url;
  comicLinkEl.setAttribute("href", comicLink);
  var marvelLink = responseData.data.results[0].urls[0].url;
  marvelComicsEl.setAttribute("href", marvelLink);
}

// OMDb Fetch information for movies Function
// This function also renders and displays all the movie cards
function getMovieInfo(heroSearched) {
  // Fetch from OMDb
  fetch("https://omdbapi.com/?s=" + heroSearched + "&page=1&apikey=c1cb5517")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // This is the JSON from our response
      var moviesHTML = document.querySelector(".movies-container");
      moviesHTML.innerHTML = "";

      // The title will dynamically appear when the movies display
      var featuredContent = document.getElementById("featured-content");
      featuredContent.textContent = "Featured Content";

      // For Each Movie in the array, create a card to display for the user.
      for (var i = 0; i < data.Search.length; i++) {
        var Movie = data.Search[i];

        // OMDb content Variables
        var movieTitle = Movie.Title;
        var movieYear = Movie.Year;
        var moviePoster = Movie.Poster;

        var newMovieHTML = document.createElement("div");
        newMovieHTML.setAttribute("class", "col s5 m3");

        // If the poster is unavailable, then remove the image section and display only the name.
        if (!moviePoster || moviePoster === "N/A") {
          newMovieHTML.innerHTML = ` <div class="card">
          <div class="card-action popular-title">
                  <div>${movieTitle} - ${movieYear}</div>
                </div>
          </div>`;
        } else {
          // If the poster is available, then add this information to index.html
          newMovieHTML.innerHTML = ` <div class="card">
          <div class="card-image">
          <img src="${moviePoster}.jpg">
          </div>
          <div class="card-action popular-title">
                  <div>${movieTitle} - ${movieYear}</div>
                </div>
          </div>`;
        }
        // Append information to the html
        moviesHTML.appendChild(newMovieHTML);
      }
    });
}

// This function will check if the user has entered a value into the search field
// And checks if local storage has previous searches logged to reload.
function getUserSearch() {
  var heroSearched = characterSearched.value;
  // If the user entered a value..
  if (heroSearched) {
    // Proceed with this function.
    getCharacterInfo(heroSearched).then(function (data) {
      // Run these other functions to display information for the characters.
      displayDescription(data);
      displayLinks(data);
    });
    // Run the function to request OMDb info VIA User Search
    getMovieInfo(heroSearched);

    // Local Storage
    // When you search a character,
    // This will store that information in local storage.
    if (previousSearchs.indexOf(heroSearched) === -1) {
      previousSearchs.push(heroSearched);
      localStorage.setItem("heroes-searched", JSON.stringify(previousSearchs));
    }
  } else {
    // If the user hasn't entered a value, then...
    // Added Materialize Alert pop-up with an icon
    M.toast({
      html:
        "  Please enter a Character Name!" +
        `<i class="material-icons">flag</i>`,
      classes: "rounded red",
    });
  }
}

// Local Storage
// If there ARE previous searches, Load that search when the page is opened.
function onPageLoad() {
  if (previousSearchs.length > 0) {
    getCharacterInfo(previousSearchs[previousSearchs.length - 1]).then(
      function (data) {
        // Run these other functions to display information for the characters.

        displayDescription(data);
        displayLinks(data);
      }
    );

    // Run the function to request OMDb info VIA User Search
    getMovieInfo(previousSearchs[previousSearchs.length - 1]);
  }
}

// The 'search' Button is waiting for a 'click' to fun getUserSearch
searchButton.addEventListener("click", getUserSearch);
onPageLoad();
