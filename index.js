const Nunjucks = require('nunjucks');
const getOptions = require('loader-utils').getOptions;

const includeRe = /{%\s*include\s*['"](.*?)['"]\s+%}/g

module.exports = function (source) {
  const options = getOptions(this);
  options.options = options.options || {};
  options.options.noCache = true;
  const nunjucks = Nunjucks.configure(options.path, options.options);

  // Store includes in case future loaders want to support HMR and get Webpack to watch
  // for changes using require.
  let match;
  const includes = [];
  while (match = includeRe.exec(source)) {
    includes.push(match[1]);
  }
  let includesMarker = '';
  if (includes.length) {
    includesMarker = `\n<!-- <includes>${includes.join(',')}<end-includes> -->`;
  }
  const includeRootMarker = `\n<!-- <include-root>${options.path}<end-include-root> -->`;

  // Add globals.
  for (let global in options.globals) {
    nunjucks.addGlobal(global, options.globals[global]);
  }

  return nunjucks.renderString(source, options.context) + includesMarker + includeRootMarker;
};
