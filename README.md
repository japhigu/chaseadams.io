# chaseadams.io

chaseadams.io is a NodeJS static site generator, leveraging react components for rendering static html at build time and rendering react components on the client at run-time.

## Features

- Use React components for rendering static HTML
- Write content in Markdown

## Installation

Install chaseadamsio by running:

    npm install

## Building Static Site

To generate content:

    npm run build

## What It Does

It generates two sets of files for each post, a static html file for initial page render and a `json` file for rendering with ajax on the client.

