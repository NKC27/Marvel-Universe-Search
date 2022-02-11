# Marvel-Universe-Search

## Description

Marvel Universe Search is a search engine, which provides a user with a variety of information surrounding a character of their choice. Using the Marvel font and traditional red and white theme, we want to create a website that would appeal to the superhero fanbase that want to know a little more about their favourite characters. We have chosen to use [Materialize](https://materializecss.com/) as our CSS framework, which will allow us to create a clean, user-friendly database that will speed up our styling process.

---

## User Story:

```
AS A user

I WANT to find information about a Marvel character of my choice

AND any movies or other media related content the character has featured in
```

## Tasks:

```
WHEN I search for a character

THEN I am presented with information about the character and previous movies that character has been featured in.



WHEN I click refresh,

THEN the previously searched character's information will persist on the page

```

---

## The Api's we will be using are:

- [Marvel](https://developer.marvel.com/docs#!/public/getCharacterStoryCollection_get_5)

- [OMDb](http://www.omdbapi.com/)

## The Marvel API will provide us with the following information:

- Character Name

- Character Image

- Character Summary

- A link for comics related to the Character

- A link to the Wikipedia for the Character

- A link to the Marvel website for the Character

## OMDb API will provide us with the following information:

- Movie Title related to the character

- Movie Images related to the film

- Movie Description

- Movie Release Year

## Website:

[Search Marvel Universe](https://nkc27.github.io/Search-Marvel-Universe/)

Here is our website before you enter a search:
![Marvel-Website-Before-Search]()

Here is our website after you enter a search:
![Marvel-Website-After-Search]()

---

## Mock-Up

This was our initial idea for the website

![Mock-Up](https://github.com/NKC27/Marvel-Universe-Search/blob/a4906c5fe691e3de88d4d284917c43f0d9110bd7/assets/Images/Screenshot%202022-02-01%20at%2020.42.57.png)

---

## Resources:

[Materialize](https://materializecss.com/)

[Marvel-Docs](https://developer.marvel.com/docs#!/public/getCharacterStoryCollection_get_5)

[IMDb](https://developer.imdb.com/)

[OMDb](http://www.omdbapi.com/)

[Trello](https://trello.com/en-GB) for project managing for our team

[Reference](https://leagueoflegends.fandom.com/wiki/Gregor) for layout ideas

[Tutorial](https://www.pagecloud.com/blog/how-to-add-custom-fonts-to-any-website) for custom fonts

[DevResources](https://devresourc.es/) have a list of public API's

Grid [Layout](https://grid.layoutit.com/)

CSS Grid [Generator](https://cssgrid-generator.netlify.app/0)

[WordPress](https://buteauapi.wordpress.com/adding-a-picture/) Marvel API Guide

[Youtube](https://www.youtube.com/watch?v=1VjdxCTBfUI) Movie Search Applications to give us inspiration and guide help

[StackOverflow](https://stackoverflow.com/questions/19573031/cant-push-to-github-because-of-large-file-which-i-already-deleted) to answer a lot of our github problems

## Fixes & Bugs

---

### Bugs

404 FavIcon:
There is a icon that seems to not work on load and displays a 404 in the console despite all our icons used working.

Character Links:
The API provides the incorrect links despite what is stated. We did our best in labelling what information is provided however we could not predict that they would be given in incorrect orders or even duplicated.

### Fixes

Movie Search:
Currently, the API we are using does not allow for filtered movie search. When the user searches a movie, any movie related will come up. This is a problem as we are a marvel website and are currently trying to find a fix this.

Also, The movie search is currently not aligned. This is due to the API not providing the image data needed. Furthermore, the CSS framework we used, was extremely tempremental with resizing the 'cards' for the movies. Despite our best efforts, the layout was difficult to align in a more pleasing way. We are looking into alternatives for our future updates.

Characters MIA:
The other API we are using does not allow for certain information to be receieved. Whether that is the description or image of a character, some characters just do not have the full information needed for us to display them on our website. This is why an error may pop up when you attempt to search for a character. Sadly, this also includes popular characters. This is extremely frustrating and we are current working to find a new API to correct this problem.

Comics:
We were unable to display comics. We are trying to resolve this.

---

Copyright © [2022] [Alia Haven, Nick Clarke & Yasmin.B.A]
