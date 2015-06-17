import React from 'react';
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var RouteHandler = Router.RouteHandler;
var moment = require('moment-timezone');
var zone = 'America/Los_Angeles';
moment.tz.setDefault(zone);
var marked = require('marked');
marked.setOptions({ smartypants: false });
// import { Route, Link, DefaultRoute, RouteHandler } from 'react-router';

var Post = React.createClass({
    render () {
        var title = this.props.isIndex ? <a href={this.props.attributes.slug}>{this.props.attributes.title}</a> : this.props.attributes.title;
        return (
            <div className="post">
                <h1 className="post-title">{title}</h1>
                <div className="post-content" dangerouslySetInnerHTML={{ __html: marked(this.props.body)}} />
            </div>
        );
    }
});

var Home = React.createClass({
    render () {
        var posts = this.props.posts.map(function (post, idx) {

            return (
                <div key={idx} className="post">
                    <h1 className="post-title"><a href={post.attributes.slug}>{post.attributes.title}</a></h1>
                    <div className="post-summary" dangerouslySetInnerHTML={{ __html: marked(post.body)}} />
                    <div className="post-footer">{moment.tz(post.attributes.date, zone).format("YYYY/MM/DD")}</div>
                </div>
            );
        });

        return (
            <div>
                {posts}
            </div>
        );
    }
});

var App = React.createClass({
    render () {
        return (
            <html>
                <head>
                    <link href="http://fonts.googleapis.com/css?family=Ubuntu:400,700" rel="stylesheet" type="text/css" />
                    <link href="/css/app.css" rel="stylesheet" type="text/css" />
                </head>
                <body>
                    <div id="globalNavContainer">
                        <ul id="globalNav" className="nav cf">
                            <li><h1><a href="/" className="site-title">Chase Adams</a></h1></li>
                            <ul className="site-nav">
                                <li><a href="">About</a></li>
                                <li><a href="">Blog</a></li>
                                <li><a href="">Contact</a></li>
                            </ul>
                        </ul>
                    </div>
                    <div id="content">
                        <RouteHandler {...this.props} />
                    </div>
                    <script src="/js/bundle.js" />
                </body>
            </html>
        );
    }
});

var Routes = (
    <Route name="app" path="/" handler={App}>
        <Route path="/posts" handler={Home} />
        <Route path="/posts/:slug" handler={Post} />
        <DefaultRoute handler={Home} />
    </Route>
);

module.exports = Routes;
