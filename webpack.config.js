var React = require('react');

module.exports = {

  devtool: 'eval',

  entry: './src/reactComponents.js',
  output: {
  	filename: "./app/components/react/reactComponents.js"
  },
  module: {
  	loaders: [
    /*{ test: /\.css$/, loader: "style-loader!css-loader" },*/
  		{test: /\.js$/, loader: 'jsx-loader?harmony'}
  	]
  },
    resolve: {
        alias: {
           React: ('/node_modules/react/dist/react.min.js')
        }
    },

};