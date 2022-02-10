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

// Side-Card Link Elements
var wikiLinkEl = document.getElementById("wiki-link");
var comicLinkEl = document.getElementById("comic-link");
var marvelComicsEl = document.getElementById("marvel-comics");

// get previous searchs OR create empty array for the new searchs
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

  var marvelDescr = responseData.data.results[0].description;
  var marvelImage = responseData.data.results[0].thumbnail.path;

  if (!marvelDescr || !marvelImage || responseData.data.count.length === 0) {
    M.toast({
      html:
        " Unfortunatley, We do not have enough information on this character!" +
        `<i class="material-icons">flag</i>`,
      classes: "rounded red",
    });
  } else {
    // Remove 'Hide' Attribute
    // 'classList' is a property of JavaScript and using .remove will allow us to
    // remove 'hide' specifically and allow the use to see that section of code.
    // infoSection.classList.remove("hide");
    var summaryArea = document.querySelector(".character-summary-container");
    // Setting the information from the data to index.html elements
    summaryArea.innerHTML = `
      <div class="row information-display">
     
          <!-- Section Character Summary Card -->
          <div class="row">
            <div class="biography-card">
              <div class="col m6 s6">
                <div class="card white">
                  <div class="card-content black-text">
                    <span class="card-title">CHARACTER SUMMARY</span>
                    <!-- Empty p Tag for Character Description from Marvel API -->
                    <p id="our-description">${marvelDescr}</p>
                  </div>
                </div>
        
            </div>
          </div>`;

    var statsArea = document.querySelector(".character-stats-container");

    statsArea.innerHTML = `   
            <div id="stats-card">
            
                <div class="card">
                  <!-- Image Card -->
                  <!-- Empty Img Tag for img from marvel API to populate here -->
                  <div class="card-image">
                    <img id="marvel-img" src="${marvelImage}.jpg" />
                  </div>
                  <!-- Information Card Below Image -->
                  <div class="card-content">
                    <h5 id="hero-name"></h5>
                    <p>For more Information:</p>
                    <!-- Populate list of Character information here -->
                  </div>
                  <!-- Empty Links will have a path after the api marvel function is ran -->
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

// Display Name of Hero on Info Card
function displayName(responseData) {
  var marvelName = responseData.data.results[0].name;
  heroName.innerHTML = marvelName;
}

// Display Links on Image Cards for characters
function displayLinks(responseData) {
  var wikiLink = responseData.data.results[0].urls[1].url;
  wikiLinkEl.setAttribute("href", wikiLink);
  var comicLink = responseData.data.results[0].urls[2].url;
  comicLinkEl.setAttribute("href", comicLink);
  var marvelLink = responseData.data.results[0].urls[0].url;
  marvelComicsEl.setAttribute("href", marvelLink);
}

// OMDb Fetch Function
// 2 console.logs in this function
function getMovieInfo(heroSearched) {
  fetch("https://omdbapi.com/?s=" + heroSearched + "&page=1&apikey=c1cb5517")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // This is the JSON from our response
      console.log(data);
      // For Each Movie in the array, create a card to display for the user.
      for (i = 0; i < data.Search.length; i++) {
        var Movie = data.Search[i];
        var movieTitle = data.Search[i].Title;
        var movieYear = data.Search[i].Year;
        var moviePoster = data.Search[i].Poster;
        //console.log(Movie);
      }
    });
}

// This function will get the value of the users search
// 1 console.log in this function
function getUserSearch() {
  // If the user entered a value..
  var heroSearched = characterSearched.value;
  if (heroSearched) {
    // Proceed with this function.
    getCharacterInfo(heroSearched).then(function (data) {
      console.log(data);

      // Run these other functions to display information for the characters.
      displayDescription(data);
      displayName(data);
      displayLinks(data);
    });

    // Run the function to request OMDb info VIA User Search
    getMovieInfo(heroSearched);
    //Check if the new search already exists in local storage
    if (previousSearchs.indexOf(heroSearched) === -1) {
      previousSearchs.push(heroSearched);
      localStorage.setItem("heroes-searched", JSON.stringify(previousSearchs));
    }
  } else {
    // Added Materialize Alert pop-up with an icon
    M.toast({
      html:
        "  Please enter a Character Name!" +
        `<i class="material-icons">flag</i>`,
      classes: "rounded red",
    });
  }
}

// console.log's 4
// The 'search' Button is waiting for a 'click' to fun getUserSearch
searchButton.addEventListener("click", getUserSearch);
console.log("previous", previousSearchs);
if (previousSearchs.length > 0) {
  console.log("creating auto");
  console.log(previousSearchs[-1]);
  getCharacterInfo(previousSearchs[previousSearchs.length - 1]).then(function (
    data
  ) {
    console.log(data);

    // Run these other functions to display information for the characters.
    displayDescription(data);
    displayName(data);
    displayLinks(data);
  });

  // Run the function to request OMDb info VIA User Search
  getMovieInfo(previousSearchs[previousSearchs.length - 1]);
}
