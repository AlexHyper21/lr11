const helmet = require('helmet');
const sanitizeHtml = require('sanitize-html');

const isSecurityEnabled = () => process.env.SECURITY_ENABLED !== 'false';

const sanitizeOptions = {
  allowedTags: ['b', 'i', 'em', 'strong', 'br'],
  allowedAttributes: {},
  disallowedTagsMode: 'discard',
};

function cleanHtml(value) {
  if (!isSecurityEnabled()) {
    return value;
  }
  return sanitizeHtml(String(value), sanitizeOptions).trim();
}

function cleanText(value) {
  if (!isSecurityEnabled()) {
    return value;
  }
  return sanitizeHtml(String(value), { allowedTags: [], allowedAttributes: {} }).trim();
}

function securityHeaders() {
  if (!isSecurityEnabled()) {
    return (req, res, next) => next();
  }
  return helmet({
    contentSecurityPolicy: {
      useDefaults: false,
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", 'https://fonts.googleapis.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        imgSrc: ["'self'", 'data:'],
        connectSrc: ["'self'"],
        objectSrc: ["'none'"],
        baseUri: ["'self'"],
        formAction: ["'self'"],
        frameAncestors: ["'none'"],
      },
    },
    crossOriginEmbedderPolicy: false,
  });
}

module.exports = {
  isSecurityEnabled,
  cleanHtml,
  cleanText,
  securityHeaders,
};
