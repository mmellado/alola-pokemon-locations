# Alola Pokemon Locations

I recently started playing Pokémon Ultra Sun, and one of the things I like doing when I play any Pokémon titles is actually catch them all from the very beginning. This means, it's important for me to know which Pokémon appear on which locations, at what time of the day, area and rate. With Pokémon Sun/Moon and Ultra Sun/Moon, it's also important to know which Pokémon only appear as part of an SOS encounter. This means Pokémon can be found in many different ways.

Despite all this information being out there in Bulbapedia and Smogon, I found it extremely difficult to consume. Not only was the information in a page surrounded by other information that wasn't necessarily relevant to my goal, but moving to a new region in the game meant having to search for a new wiki page and find the information. On top of that, the game's information is displayed in the same wiki page for both the US and USUM, meaning that after finding the information I had to make sure it was that for the game I'm actually playing.

NO MORE!

I spent the last few days building an app to fix this and I figured I'd share it with you all in case anyone else goes through the same struggle I did.

I manually sourced all the relevant wiki pages in Bulbapedia and crawled the information on Pokémon location around the Alola region in the same order as you'd visit every location in the games. I then categorised it per game, making it easy to navigate the information in a linear and easy to consume way as you play the games.

Since I'm using the HTML crawled from Bulbapedia, there is only so much that can be done for styling. For this reason, the CSS of the project is a CSS hell full of important rules. If you use this app and find any visual problems, please feel free to file an issue.

There's is also a chance the information in the app may appear out of date compared to that found on Bulbapedia. This is because the information is not crawled every time you open the app but only when a new version is built. If information is out of date (or missing), please file an issue.

Enjoy catching the all around Alola!

## Development

The app is split into 2 parts.

1. The crawler
2. A Vue.js app acting as a frontend for the information crawled

After cloning the repo, first install the dependencies

```
npm install
```

Then, crawl the data from Bulbapedia. This may take a some time depending on your connection

```
npm run crawl
```

Finally, you can run the development environment to start testing your changes

```
npm run dev
```

Pull requests with bug fixes and new features are always welcome :)

## License

Original Bulbapedia content is licensed under the [Creative Commons Attribution-NonCommercial-ShareAlike](https://creativecommons.org/licenses/by-nc-sa/2.5/) license. This basically means that:

- You may copy and modify this content, provided you attribute it to Bulbapedia.
- You may copy and modify this content, provided it is not for commercial purposes.
- You may copy and modify this content, provided the resulting work is also licensed under the same copyright as the Bulbapedia content.

![CC License](https://licensebuttons.net/l/by-sa/3.0/88x31.png)
