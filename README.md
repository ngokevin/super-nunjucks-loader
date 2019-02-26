## super-nunjucks-loader

[Nunjucks](https://mozilla.github.io/nunjucks/api.html) loader for Webpack.

### Usage

```
npm install --save super-nunjucks-loader
```

And in your Webpack configuration:

```
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.html/,
        exclude: /(node_modules)/,
        use: ['super-nunjucks-loader'],
        options: {
          globals: {
            PRODUCTION: process.env.NODE_ENV === 'production'
          },
          options: {
            noCache: true
          },
          path: `${__dirname}/src/`
        }
      }
    ]
  }
  // ...
};
```

#### Options

| Name    | Description                                      |
|---------|--------------------------------------------------|
| context | Object of variables to pass as Nunjucks context. |
| globals | Variables to add to Nunjucks global scope.       |
| options | Options passed into `Nunjucks.configure`.        |
| path    | Directory for Nunjucks to find templates.        |

Then require:

```
const htmlString = require('./index.html');
```

Personally, I am using it as an intermediary step alongside another loader that
injects the HTML to document.body.

#### Hot Reload Markers

This loader will scan and mark includes in case loaders down the chain want to use to enable hot reloading. Includes will be printed as HTML comments:

```html
<!-- <includes>templates/foo.html, bar.html<end-includes> -->
<!-- <include-root>/Users/doe/my-project/src/<end-include-root> -->
```
