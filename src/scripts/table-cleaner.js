const cleaner = markup =>
  markup
    .replace(/<table/gi, '<div class="table"')
    .replace(/<\/table/gi, '</div')
    .replace(/<tr/gi, '<div class="row"')
    .replace(/<\/tr/gi, '</div')
    .replace(/<th/gi, '<div class="cell heading"')
    .replace(/<\/th/gi, '</div')
    .replace(/<td/gi, '<div class="cell"')
    .replace(/<\/td/gi, '</div')
    .replace(/<tbody>/gi, '')
    .replace(/<\/tbody>/gi, '');

export default cleaner;
