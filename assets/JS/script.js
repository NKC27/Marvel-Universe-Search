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
    infoSection.classList.remove("hide");

    // Setting the information from the data to index.html elements
    ourDescription.textContent = marvelDescr;
    ourImg.setAttribute("src", marvelImage + ".jpg");
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
function getMovieInfo() {
  fetch(
    "https://omdbapi.com/?s=" +
      characterSearched.value +
      "&page=1&apikey=c1cb5517"
  )
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
    // Added Materialize Alert pop-up with an icon
    M.toast({
      html:
        "  Please enter a Character Name!" +
        `<i class="material-icons">flag</i>`,
      classes: "rounded red",
    });
  }
}

// The 'search' Button is waiting for a 'click' to fun getUserSearch
searchButton.addEventListener("click", getUserSearch);
