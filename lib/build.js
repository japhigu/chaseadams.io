'use strict';
require('node-jsx').install({extension: '.jsx'});

import path from 'path';
import fs from 'fs';
import rimraf from 'rimraf';
import dir from 'node-dir';
import fm from 'front-matter';
import React from 'react';
import Router from 'react-router';
import Routes from '../src/js/routes.jsx';

var moment = require('moment');

var Build = {
    contentRoot: path.join(process.cwd(), 'content'),
    contentJSON: {
        posts: [],
        pages: []
    },

    clean () {
        rimraf('dist', function (err) {
            if (err) throw err;
            fs.mkdirSync('dist');
        });
    },

    run () {

        console.log('Building...');
        this.clean();
        this.generateContentJSON(this.contentRoot);
    },

    generateContentJSON (startPath) {
        dir.readFiles(startPath, {
                exclude: /^\./
            }, (err, content, next) => {
                if (err) throw err;
                var data = fm(content.toString());

                if (!data.attributes.draft && this.belongsInBlogroll(data)) {
                    this.contentJSON.posts.push(data);
                } else if (!this.belongsInBlogroll(data)) {
                    this.contentJSON.pages.push(data);
                }

                next();
            },
            (err, files) => {
                if (err) throw err;

                this.generateFilesFromJSON();
                this.generateRootFromJSON();
            });
    },

    belongsInBlogroll (post) {
        return !(post.attributes.hasOwnProperty('blogroll') && post.attributes.blogroll === false);
    },

    generateFilesFromJSON () {
        this.contentJSON.posts.forEach((post) => {
            var filePath = this.generateDirs(post.attributes.slug);
            this.generateStaticFile('/:slug', filePath, post);
        });

        this.contentJSON.pages.forEach((page) => {
            var filePath = this.generateDirs(page.attributes.slug);
            this.generateStaticFile('/:slug', filePath, page);
        });
    },

    generateRootFromJSON () {
        this.generateStaticFile('/', 'dist', this.contentJSON);
    },

    generateStaticFile (location, filePath, jsonObj) {
        var router = Router.create({location: location, routes: Routes});
        router.run((Handler, state) => {

            if (jsonObj.posts) {
                jsonObj.posts = jsonObj.posts.sort(function (a, b) {
                    return +moment(a.attributes.date).format('x') < +moment(b.attributes.date).format('x');
                });
            }

            fs.writeFile(path.join(filePath, 'index.json'), JSON.stringify(jsonObj), function (err) {
                if (err) throw err;
                console.log('JSON is saved!');


                var html = '<!doctype html>' + React.renderToString(<Handler {...jsonObj} />, null);

                fs.writeFile(path.join(filePath, 'index.html'), html, function (err) {
                    if (err) throw err;
                    console.log('HTML is saved!');
                });
            });
        });
    },

    generateDirs (slugPath) {
        var concatDir = this.contentRoot.replace('content', 'dist');
        slugPath.split('/').forEach( function (dir) {
            concatDir = path.join(concatDir, dir);
            if (!fs.existsSync(concatDir)) fs.mkdirSync(concatDir);
        });
        return concatDir;
    }
};

module.exports = Build;
