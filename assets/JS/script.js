// Side Navbar code
var sideNav = document.querySelector(".sidenav");
M.Sidenav.init(sideNav, {});

// Slider images code
var slider = document.querySelector(".slider");
M.Slider.init(slider, {
  indicators: false,
  height: 500,
  transition: 500,
  interval: 6000,
});

// autocomplete
var autoComplete = document.querySelector(".autocomplete");
M.Autocomplete.init(autoComplete, {
  data: {
    Avengers: null,
    "Spider Man": null,
    "Iron man": null,
    "Black Panther": null,
    Deadpool: null,
    "Captain America": null,
    "Ant-Man": null,
    "Captain Marvel": null,
    "Guardians Of The Galaxy": null,
    Wolverine: null,
    Hulk: null,
    Thor: null,
    Drax: null,
    Groot: null,
    Celestials: null,
    Eternals: null,
    Thanos: null,
    "Doctor Strange": null,
    Galactus: null,
    "Silver Surfer": null,
    Loki: null,
    Roket: null,
    Loki: null,
  },
});

// API key for marvel
var APIkey = "444d6366dd602b2c74da79df008bd617";
// var OMDBKey = "c1cb5517";

// Change to id characterSearched
var characterSearched = document.querySelector(".hero-searched");
var searchButton = document.querySelector(".btn");
// Displaying hero name in the side information card.
var heroName = document.getElementById("hero-name");
var hideSection = document.querySelector(".hide");
var infoSection = document.querySelector(".information-display");
var sideCardContent = document.querySelector(".card-content");
var ourImage = document.getElementById("marvel-img");
var ourDescription = document.getElementById("our-description");
var wikiLinkEl = document.getElementById("wiki-link");
var ourImg = document.getElementById("marvel-img");
var comicLinkEl = document.getElementById("comic-link");
var marvelComicsEl = document.getElementById("marvel-comics");

// add text content to nothing to stop enter repeate pattern

// fetch all information then console log to see it!
function getCharacterInfo() {
  var URLforCharacters =
    "https://gateway.marvel.com/v1/public/characters?name=" +
    characterSearched.value +
    "&apikey=" +
    APIkey;

  return fetch(URLforCharacters).then(function (res) {
    return res.json();
  });
}

// Populate Description & Image using this function
function displayDescription(responseData) {
  // Remove 'Hide' Attribute
  // 'classList' is a property of JavaScript and using .remove will allow us to
  // remove 'hide' specifically and allow the use to see that section of code.
  infoSection.classList.remove("hide");

  // Create a variable for the information we want to use.
  //debugger;
  var marvelDescr = responseData.data.results[0].description;
  ourDescription.textContent = marvelDescr;

  var marvelImage = responseData.data.results[0].thumbnail.path;
  ourImg.setAttribute("src", marvelImage + ".jpg");

  // If no description, display an error for no character search
}

// Display Name of Hero on Info Card
function displayName(responseData) {
  var marvelName = responseData.data.results[0].name;
  heroName.innerHTML = marvelName;

  //If no name, display an error.
}

// Display Links on Image Cards for heros
function displayLinks(responseData) {
  var wikiLink = responseData.data.results[0].urls[1].url;
  wikiLinkEl.setAttribute("href", wikiLink);
  var comicLink = responseData.data.results[0].urls[2].url;
  comicLinkEl.setAttribute("href", comicLink);
  var marvelLink = responseData.data.results[0].urls[0].url;
  marvelComicsEl.setAttribute("href", marvelLink);
}

// OMDb Fetch Function
function getMovieInfo() {
  fetch(
    "https://omdbapi.com/?s=" +
      characterSearched.value +
      "&page=1&apikey=c1cb5517"
  )
    .then(function (response) {
      // The API call was successful!
      return response.json();
    })
    .then(function (data) {
      // This is the JSON from our response
      console.log(data);
      // var movieTitle = data.Search[i].Title;
      // var movieYear = data.Search[i].Year;
      // var moviePoster = data.Search[i].Poster;
      for (i = 0; i < data.Search.length; i++) {
        var Movie = data.Search[i];
        var movieTitle = data.Search[i].Title;
        var movieYear = data.Search[i].Year;
        var moviePoster = data.Search[i].Poster;
        console.log(Movie);
      }
    });
}

// This function will get the value of the users search
function getUserSearch() {
  // If the user entered a value..
  if (characterSearched.value) {
    // Proceed with this function.
    getCharacterInfo().then(function (data) {
      console.log(data);

      // Run these other functions to display information for the characters.
      displayDescription(data);
      displayName(data);
      displayLinks(data);
    });

    // Run the function to request OMDb info VIA User Search

    getMovieInfo();
  } else {
    // If the user clicks search without entering a value, they will get an alert.
    // Change this to a materialize alert!
    alert("Please Type a Character Name!");
  }
}

// The 'search' Button is waiting for a 'click' to fun getUserSearch
searchButton.addEventListener("click", getUserSearch);
