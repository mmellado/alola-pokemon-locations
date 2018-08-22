const path = require('path');
const request = require('request-promise');
const cheerio = require('cheerio');
const chalk = require('chalk');
const fs = require('fs-extra');
const beautify = require('js-beautify').html;
const sanitizeHTML = require('sanitize-html');
const sources = require('./sources.js');

const OUT_DIR = path.resolve(__dirname, '../../data');
const MENU_FILE = path.resolve(OUT_DIR, 'menu.js');
const MENU = [];
const SANITIZE_HTML_OPTIONS = {
  allowedTags: [
    'h2',
    'h3',
    'h4',
    'img',
    'span',
    'p',
    'div',
    'table',
    'th',
    'tr',
    'td',
  ],
  allowedAttributes: {
    img: ['src'],
    th: ['colspan', 'rowspan', 'style'],
    td: ['colspan', 'rowspan', 'style'],
    h2: ['id'],
    table: ['class'],
    span: ['class'],
    p: ['class'],
    div: ['class', 'style'],
  },
};

const crawlSourceData = () => {
  const promises = [];
  sources.forEach(src => {
    const options = {
      uri: src,
      transform: dom => cheerio.load(dom),
    };

    promises.push(
      request(options)
        .then($ => {
          const area = $('h1#firstHeading').text();

          const $initialNode = $('span#Pok\\.C3\\.A9mon').parent();
          const nodes = [$initialNode];
          let $currentNode = $initialNode.next();

          do {
            if ($currentNode.prop('tagName') === 'TABLE') {
              const $spans = $currentNode.find('span');
              $spans.each((i, el) => {
                if (!$(el).find('img').length) {
                  $(el).addClass('table-span');
                }
              });
            }

            nodes.push($currentNode);
            $currentNode = $currentNode.next().length
              ? $currentNode.next()
              : null;
          } while (
            !$currentNode.next().find('th.roundytop').length &&
            $currentNode.prop('tagName') !== 'H2'
          );

          return { area, nodes, $ };
        })
        .catch(err => console.error(chalk.bold.red(err)))
    );
  });
  return Promise.all(promises)
    .then(data => data)
    .catch(err => console.error(chalk.bold.red(err)));
};

const buildGameMarkup = (data, area, id) => {
  let markup = `<h2 id="${id}"><span>${area}</span></h2>`;
  if (!data.length) {
    markup = `${markup}<p class="no-pkmn">No Pokemon data for this area</p>`;
  } else {
    data.forEach(node => {
      markup = `${markup}${node}`;
    });
  }
  return `<div class="area">\n${beautify(
    sanitizeHTML(markup, SANITIZE_HTML_OPTIONS)
  )}\n</div>`;
};

const buildHTMLFiles = () => {
  const srcData = crawlSourceData();
  const sunMoonFile = path.resolve(OUT_DIR, 'sun-moon.html');
  const ultraSunMoonFile = path.resolve(OUT_DIR, 'ultra-sun-moon.html');
  let sunMoonMarkup = '';
  let ultraSunMoonMarkup = '';

  return srcData
    .then(data => {
      data.forEach(pageData => {
        const { area, nodes, $ } = pageData;
        const id = area
          .toLowerCase()
          .replace(/ /g, '-')
          .replace(/'/g, '');
        const sunMoonData = [];
        const ultraSunMoonData = [];
        let game = '';

        nodes.forEach($node => {
          if ($node.prop('tagName') === 'H3') {
            game = $node.text();
          } else if (game.includes('Sun and Moon')) {
            sunMoonData.push($.html($node));
          } else if (game.includes('Ultra Sun')) {
            ultraSunMoonData.push($.html($node));
          }
        });

        sunMoonMarkup = `${sunMoonMarkup}\n${buildGameMarkup(
          sunMoonData,
          area,
          id
        )}`;
        ultraSunMoonMarkup = `${ultraSunMoonMarkup}\n${buildGameMarkup(
          ultraSunMoonData,
          area,
          id
        )}`;
        MENU.push({ name: area, id });

        console.info(`${chalk.blue.bold(area)} done`);
      });

      return fs
        .outputFile(sunMoonFile, sunMoonMarkup)
        .then(() => fs.outputFile(ultraSunMoonFile, ultraSunMoonMarkup))
        .catch(err => console.error(chalk.bold.red(err)));
    })
    .catch(err => console.error(chalk.bold.red(err)));
};

const buildMenu = () => {
  const menuData = `const menu = ${JSON.stringify(MENU)}; export default menu;`;
  fs.writeFile(MENU_FILE, menuData).catch(err => err);
};

const build = () => {
  fs.mkdirp(OUT_DIR)
    .then(() => buildHTMLFiles())
    .then(() => buildMenu())
    .catch(err => console.error(chalk.bold.red(err)));
};

build();
