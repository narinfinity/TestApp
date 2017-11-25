var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');

module.exports = {
    devServer: {
        host: 'localhost',
        port: '65155'
    },
    context: path.join(__dirname, "wwwroot"),
    devtool: debug ? "inline-source-map" : null,
    entry: { app: "./js/site.jsx" },
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
				query: {
                    presets: ["es2015", "react", "stage-1"],
                    plugins: [
                        'react-html-attrs',
                        'transform-class-properties',
                        'transform-runtime',
                        'add-module-exports',
                        'transform-decorators-legacy'
                    ]
				}
			},
            { test: /\.css$/, loader: "style-loader!css-loader" },
        ]
    },
    output: {
        path: path.join(__dirname, "wwwroot", "js"),
        publicPath: "/",
        filename: "site.min.js"
    },
    plugins: debug ? [] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    ],
};
