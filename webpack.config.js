var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');

module.exports = {
    resolve: {
        modulesDirectories: ['node_modules', 'sass'],
        extensions: ['', '.json', '.jsx', '.js']
    },
    entry: {
        app: './src/js/entry.js',
        vendor: ['superagent']
    },
    output: {
        path: __dirname + '/dist',
        filename: '/js/bundle.js'
    },
    plugins: [
        new webpack.ProvidePlugin({
            React: 'react',
            Router: 'react-router'
        }),
        new webpack.DefinePlugin({
            API_HOST: JSON.stringify(process.env.NODE_ENV === 'production' ? 'http://chaseadamsio-api.apps.chaseadams.io/' : 'http://localhost:8080/')
        }),
        new ExtractTextPlugin("css/[name].css"),
    ],
    module: {
        loaders: [
            { test: /\.(?:jsx|js)$/, loader: 'jsx-loader?insertPragma=React.DOM&harmony' },
            { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css-loader?sourceMap!sass?sourceMap')},
            { test: /\.json$/, loader: 'json-loader' }
        ]
    }
};
