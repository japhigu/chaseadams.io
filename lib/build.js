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

var Build = {
    contentRoot: path.join(process.cwd(), 'content'),
    contentJSON: {
        posts: []
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

                if (!data.attributes.draft) {
                    this.contentJSON.posts.push(data);
                }

                next();
            },
            (err, files) => {
                if (err) throw err;
                this.generateFilesFromJSON();
                this.generateRootFromJSON();
            });
    },

    generateFilesFromJSON () {
        this.contentJSON.posts.forEach((post) => {
            var filePath = this.generateDirs(post.attributes.slug);
            this.generateStaticFile('/posts/:slug', filePath, post);
        });
    },

    generateRootFromJSON () {
        this.generateStaticFile('/', 'dist', this.contentJSON);
    },

    generateStaticFile (location, filePath, jsonObj) {
        var router = Router.create({location: location, routes: Routes});
        router.run((Handler, state) => {

            var html = '<!doctype html>' + React.renderToString(<Handler {...jsonObj} />, null);

            fs.writeFile(path.join(filePath, 'index.html'), html, function (err) {
                if (err) throw err;
                console.log('It\'s saved!');
            });

            fs.writeFile(path.join(filePath, 'index.json'), JSON.stringify(jsonObj), function (err) {
                if (err) throw err;
                console.log('It\'s saved!');
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
