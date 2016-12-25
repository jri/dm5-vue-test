var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'build.js',
    publicPath: 'dist/'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          // vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules\/(?!vue-quill-editor)/
        // Without explicit inclusion of vue-quill-editor in babel processing the production build would fail
        // with "ERROR in build.js from UglifyJs. SyntaxError: Unexpected token ..." which basically indicates
        // the UglifyJsPlugin accpets only ES5 (not ES6).
        // Evan You (yyx990803), the creator of vue.js writes: "Most npm modules export pre-compiled JS.
        // If we apply babel to every npm module it will be hugely inefficient."
        // https://github.com/vuejs-templates/webpack/issues/216
        // My guess is that npm modules are normally distributed as ES5. Fact is: the vue-quill-editor distro
        // contains a .vue file, so it needs to be processed by the vue-loader while production build. My guess
        // is that the vue-loader emits ES6. So we must exclude vue-quill-editor from babel exclusion.
        // Note: regex x(?!y) matches x only if x is not followed by y. Only x is part of the match results.
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
        // css-loader enables calling require() on .css files (vue-quill-editor does so). Without css-loader
        // Webpack throws "You may need an appropriate loader to handle this file type."
        // The style-loader injects the style in the DOM then (by generating <style> elements). Without
        // style-loader the css file would be loaded but not injected into the DOM. You could still apply
        // style-loader programmatically, e.g. require("style-loader!dragula/dist/dragula.css")
        // Note: the pipe (!) is processed right-to-left.
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
  },
  devServer: {
    proxy: [
      {
        context: ["/core", "/accesscontrol", "/websockets", "/infobits"],
        target: "http://localhost:8080"
      }
    ],
    historyApiFallback: true,
    noInfo: true
  },
  devtool: '#eval-source-map',
  performance: {
    hints: process.env.NODE_ENV === 'production'
  }
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
