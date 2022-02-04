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
    "Spider-Man": null,
    "Iron-man": null,
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

var characterSearched = document.querySelector(".hero-searched");
var searchButton = document.querySelector(".btn");
// Displaying hero name in the side information card.
var heroName = document.getElementById("#hero-name");

// fetch all information then console log to see it!
function getCharacterInfo() {
  var URLforCharacters =
    "https://gateway.marvel.com/v1/public/characters?name=Hulk&apikey=" +
    APIkey;

  fetch(URLforCharacters)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      // Testing to see what data console logs
      console.log(data);
    });
}

getCharacterInfo();

// This function will get the value of the users search
function getUserSearch() {
  // If the user entered a value..
  if (characterSearched.value) {
    // Proceed with this function.

    console.log(characterSearched.value.trim());
  } else {
    // If the user clicks search without entering a value, they will get an alert.
    // Change this to a materialize alert!
    alert("Please Type a Character Name!");
  }
}

// The 'search' Button is waiting for a 'click' to fun getUserSearch
searchButton.addEventListener("click", getUserSearch);
