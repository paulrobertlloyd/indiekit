const Color = require('color');
const dateFns = require('date-fns');
const locales = require('date-fns/locale/index.js');
const markdownIt = require('../markdown-it.js');

const {format, parseISO} = dateFns;

/**
 * Darken a color
 *
 * @param {string} string Color string
 * @param {string} value Darken amount
 * @returns {string} Hex color
 */
const darken = (string, value) => {
  const color = new Color(string);
  return color.darken(value).hex();
};

/**
 * Lighten a color
 *
 * @param {string} string Color string
 * @param {string} value Lighten amount
 * @returns {string} Hex color
 */
const lighten = (string, value) => {
  const color = new Color(string);
  return color.lighten(value).hex();
};

/**
 * Format a date
 *
 * @param {string} string ISO 8601 date
 * @param {string} tokens Tokenised date format
 * @param {string} locale ISO 639-1 (plus optional country code)
 * @returns {string} Formatted date
 */
const date = (string, tokens, locale = 'en') => {
  locale = locales[locale.replace('-', '')];
  const date = (string === 'now') ? new Date() : parseISO(string);
  const datetime = format(date, tokens, {locale});
  return datetime;
};

/**
 * Transform errors provided by express-validator into array that can be
 * consumed by the error summary component.
 *
 * @param {object} errorMap Mapped error response from express-validator
 * @returns {Array} List of errors
 */
const errorList = errorMap => {
  const camelToSnakeCase = string =>
    string.replace(/[A-Z]/g, letter =>
      `-${letter.toLowerCase()}`);

  // For each field that has errors, return only the first error
  const errorList = [];
  const fieldsWithErrors = Object.entries(errorMap);
  fieldsWithErrors.forEach(fieldError => {
    errorList.push({
      text: fieldError[1].msg,
      href: `#${camelToSnakeCase(fieldError[1].param)}`
    });
  });

  return errorList;
};

/**
 * Render Markdown string as HTML
 *
 * @param {string} string Markdown
 * @param {string} value If 'inline', HTML rendered without paragraph tags
 * @returns {string} HTML
 */
const markdown = (string, value) => {
  if (string) {
    if (value === 'inline') {
      return markdownIt.renderInline(string);
    }

    return markdownIt.render(string);
  }
};

/**
 * Transform object into an array that can be consumed by
 * the summary component.
 *
 * @param {object} object Object
 * @returns {Array} Rows
 */
const summaryRows = object => {
  const rows = [];

  Object.entries(object).forEach(
    ([key, value]) => rows.push({
      key: {
        text: key
      },
      value: {
        text: typeof value === 'string' ? value : JSON.stringify(value)
      }
    })
  );

  return rows;
};

module.exports = {
  darken,
  lighten,
  date,
  errorList,
  markdown,
  summaryRows
};
