const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const markdownItDeflist = require('markdown-it-deflist');
const markdownItPrism = require('markdown-it-prism');

module.exports = (() => {
  const options = {
    html: true,
    breaks: true,
    linkify: true,
    typographer: true
  };

  const parser = markdownIt(options);
  parser
    .use(markdownItAnchor, {
      permalink: true,
      permalinkSpace: false,
      permalinkSymbol: '#'
    })
    .use(markdownItDeflist)
    .use(markdownItPrism);

  return parser;
})();
