---
date: 2013-11-08T16:04:40Z
title: Using Grunt For A Better Workflow
slug: 2013/11/using-grunt-for-a-better-workflow
---

<img alt="Grunt: The NodeJS Task Runner" src="/imgs/2013/11/grunt-logo.png" class="align-left small-size" /> Grunt is a NodeJS task runner that allows you to automate all the things! I use it to speed up my development workflow and enhancing the performance of my projects.

## 2 Years: A Sour Memory

It's Thursday. I've just started a front-end project that needs to be done...tomorrow. I've started a new WordPress site for a client that we needed to churn out quickly, so I open up Coda, start to manually scaffold out a theme, manually create my php and html files, manually start to add CSS, then I flip over to my browser, hit the refresh button and watch the page reload.

Fast forward to the next day, and I'm cleaning up code, trying to make files smaller (and doing an awful job) and I finally wrap it up, and manually drag files into ftp in Coda, then manually sanity the site and call it a day.

### And then I found Grunt.

As I'm writing this post, I've got Chrome open in the background and SublimeText 3 open taking half of the screen. I save my file and watch chrome magically update to my most recent markdown file's changes.

__This is just one advantage of Grunt__.

<img alt="Automate All The Things with Grunt" src="/imgs/2014/01/automateallthetasks.jpg" class="align-right mid-size" />Grunt has become one of those things in life where you didn't realize just how badly you needed it until you start using it and thinking, _"what have I been doing with my life?"_

By automating all the things I used to have to manually do, I make more time to do more things, and ultimately make more time to focus on the important things while Grunt takes care of the trivially mundane.

## Advantages to Using Grunt

- It has a huge library of plugins to automate almost anything you can think of, the community on a whole is using Grunt for all of their projects (jQuery, twitter, Modernizr) which leads to contributing, which leads to more plugins, which, as you guessed, leads to greater adoption.
- Easy to get up and running and lots of documentation.
- Options are passed in as Javascript objects, which is nice for front-end developers
- Robust enough that you can use it for any kind of tasks, but minimal enough that it's not bloated unless you need it to be.

## Getting Started

__I've added all of these code samples to a github gist, you can clone done the repo, and run the commands as you read rather than having to write out the examples yourself if it's more convenient.__

Project gist: [Grunt: Up &amp; Running](https://gist.github.com/realchaseadams/7354446/)

Grunt has a few dependencies that you'll need to have installed:

- [NodeJS >=0.8.8](http://nodejs.org/)
- npm (comes with the Node package)

From anywhere within your terminal run:

<script src="https://gist.github.com/realchaseadams/7354446.js?file=npm-install-grunt-cli"></script>

This is going to install the module for the command line tool globally (-g) so you can run _`grunt`_ anywhere on your machine and it will know what you're referencing.

### package.json

Next, in your project's root, you'll need to create a _`package.json`_ (run __`npm init`__ in your project) and a _`Gruntfile.js`_. The package.json file is a NodeJS file that tells Node about all the attributes of your project and the different Node modules your project will depend on.

Here's my sample _`package.json`_:

<script src="https://gist.github.com/realchaseadams/7354446/eac15c3d72b6c5ff8fbb0322ecb03cde1c23ff55.js?file=package.json"></script>

After you've created your _`package.json`_, you'll need to run __`npm install`__, which is going to install grunt, jshint and uglify (any dependencies you specify in your _`package.json`_).

### Gruntfile.js

The final piece of the Grunt puzzle is to create your _`Gruntfile.js`_.

In it we're going to have it run two tasks:

- __lint or javascript__
- __uglify it if there aren't any errors__

We'll create a default task and add the options to the __`initConfig`__:

<script src="https://gist.github.com/realchaseadams/7354446/630a5968789e310f90791de8a3e9398b8acde65f.js?file=Gruntfile.js"></script>

In our Gruntfile, we've very basically told it for jshint, we want to lint the javascript file _`script.js`_, the path being relative to the Gruntfile's location.

After that we want to use uglify to compress and minify our javascript file for performance, and add a banner with the project's name, the version and the date (useful for debugging).

At the very least for running __`grunt`__ to work, you have to:

- __`registerTask`__ of __default__ and add the tasks you want to run
- __`loadNpmTasks`__ of all the tasks that are in your configuration object.

The only thing we need to do for this to work is to add a _`script.js`_ to your project give it some javascript to execute. Here's a sample js file just for convenience:

<script src="https://gist.github.com/realchaseadams/7354446.js?file=realchaseadams.js"></script>

Now that we have everything setup, , and you can switch back to your terminal and run __`grunt`__ from anywhere in your project (I always run it from the project root just to be safe), and grunt will run jshint and uglify on your script with the package name!

Having to run __`grunt`__ every time you make a change can be a real hassle, so for convenience to almost every project I use, I add the __`grunt-contrib-watch`__ task, so let's go ahead and add it as a task:

<script src="https://gist.github.com/realchaseadams/7354446.js?file=npm-install-grunt-contrib-watch"></script>

When you do this as __`--save-dev`__ it will add it to your developer dependencies in your _`package.json`_ file, which will help you out in the long run, especially if you want other people to use your project. If you don't pass in the flag to save as a dependency, when someone else pulls down your project and tries to work with it, they'll have to manually install __node modules__ and most likely give up on your project.

Updated _`package.json`_ after saving dev dependency for watch:

<script src="https://gist.github.com/realchaseadams/7354446.js?file=package.json"></script>

### Updating Grunt

Now that we have the ability to watch files, we can add it to our _`Gruntfile.js`_:

<script src="https://gist.github.com/realchaseadams/7354446.js?file=Gruntfile.js"></script>

With an updated file, we can simply run __`grunt watch`__ from our terminal, update our javascript file, and watch as it magically runs our tasks everytime we save!

__If you're using Grunt, let me know what you like/don't like about it, or some of the really useful plugins you've found! I'll be adding posts every month about the plugins that I find useful for my workflow.__
