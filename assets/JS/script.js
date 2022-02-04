// Side Navbar code
var sideNav = document.querySelector(".sidenav");
M.Sidenav.init(sideNav, {});

// Slider images code
var slider = document.querySelector(".slider");
M.Slider.init(slider, {
    indicators: false,
    height: 500,
    transition: 500,
    interval: 6000
});

// autocomplete
var autoComplete = document.querySelector(".autocomplete");
M.Autocomplete.init(autoComplete, {
    data: {
        "Avengers": null,
        "Spider-Man": null,
        "Iron-man": null,
        "Black Panther": null,
        "Deadpool": null,
        "Captain America": null,
        "Ant-Man": null,
        "Captain Marvel": null,
        "Guardians Of The Galaxy": null,
        "Wolverine": null,
        "Hulk": null,
        "Thor": null,
        "Drax": null,
        "Groot": null,
        "Celestials": null,
        "Eternals": null,
        "Thanos": null,
        "Doctor Strange": null,
        "Galactus": null,
        "Silver Surfer": null,
        "Loki": null,
        "Roket": null,
        "Loki": null,
    }
})
