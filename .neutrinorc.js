const path = require('path');

const neutrino = require('neutrino');
const react = require('@neutrinojs/react');
const airbnb = require('@neutrinojs/airbnb');
const jest = require('@neutrinojs/jest');
const devServer = require('@neutrinojs/dev-server');
const babelMerge = require('babel-merge');

const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  options: {
    root: __dirname,
  },
  use: [
    airbnb(),
    react({
      html: {
        title: 'COSMOS Web',
      },
      style: {
        // Override the default file extension of `.css` if needed
        test: /\.(css|sass|scss)$/,
        modulesTest: /\.module\.(css|sass|scss)$/,
        loaders: [
          // Define loaders as objects. Note: loaders must be specified in reverse order.
          // ie: for the loaders below the actual execution order would be:
          // input file -> sass-loader -> postcss-loader -> css-loader -> style-loader/mini-css-extract-plugin
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('tailwindcss'),
                require('autoprefixer'),
              ],
            },
          },
        ],
      },
    }),
    jest({
      setupFiles: [
        './test/setupTests.js',
      ],
      moduleNameMapper: {
        "\\.(obj|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
        "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js"
      },
      moduleFileExtensions: ['jsx', 'js'],
    }),
    devServer({
      disableHostCheck: true,
      host: '0.0.0.0'
    }),
    (neutrino) => {
      neutrino.config
        .externals({
          cesium: 'Cesium'
        });

      neutrino.config.module
        .rule('compile')
          .test(/\.(js|jsx)$/)
          .exclude
            .add(/node_modules/)
            .end()
          .use('babel')
          .tap(options =>
            babelMerge(
              {
                plugins: [
                  'styled-jsx/babel'
                ],
              },
              options,
            ),
          );

      neutrino.config.module
        .rule('file-loader')
          .test(/\.(glb|czml|obj|png)$/)
          .exclude
            .add(/node_modules/)
            .end()
          .use('file-loader')
            .loader('file-loader')

      neutrino.config
        .plugin('Dotenv')
        .use(Dotenv, [{
          defaults: true
        }])
        .end()
          .plugin('CopyWebpackPlugin')
          .use(CopyWebpackPlugin, [[
            {
              from: "node_modules/cesium/Build/Cesium",
              to: "cesium",
            },
          ]])
          .end()
            .plugin('HtmlWebpackPlugin')
            .use(HtmlWebpackPlugin, [{
              template: './src/public/index.html'
            }])
            .end()
              .plugin('HtmlWebpackTagsPlugin')
              .use(HtmlWebpackTagsPlugin, [{
                append: false,
                tags: ["cesium/Widgets/widgets.css", "cesium/Cesium.js"],
              }])
              .end()
                .plugin('DefinePlugin')
                .use(webpack.DefinePlugin, [{
                  CESIUM_BASE_URL: JSON.stringify("/cesium"),
                }])
                .end()
    },
  ]
};
