const request = require('request-promise');
const cheerio = require('cheerio');
const sources = require('./sources.js');

const locPromises = [];

const crawlSourceData = () => {
  sources.forEach(loc => {
    const options = {
      uri: loc,
      transform: dom => cheerio.load(dom),
    };

    locPromises.push(
      request(options)
        .then($ => {
          const $title = $.html($('h1#firstHeading'));
          const $initialNode = $('span#Pok\\.C3\\.A9mon').parent();
          const nodes = [$.html($initialNode)];
          let $currentNode = $initialNode.next();

          do {
            nodes.push($.html($currentNode));
            $currentNode = $currentNode.next();
          } while ($currentNode.prop('tagName') !== 'H2');

          console.log($title, nodes);
        })
        .catch(err => console.log(err))
    );
  });
};
