const Nunjucks = require('nunjucks');
const getOptions = require('loader-utils').getOptions;

module.exports = function (source) {
  const options = getOptions(this);
  const nunjucks = Nunjucks.configure(options.path, options.options);

  for (let global in options.globals) {
    nunjucks.addGlobal(global, options.globals[global]);
  }

  return nunjucks.renderString(source, options.context);
};
