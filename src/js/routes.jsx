var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;
var moment = require('moment-timezone');
var zone = 'America/Los_Angeles';
moment.tz.setDefault(zone);
var marked = require('marked');
marked.setOptions({ smartypants: false });
var request = require('superagent');

var Post = React.createClass({
    render () {
        var title = this.props.isIndex ? <a href={this.props.attributes.slug}>{this.props.attributes.title}</a> : this.props.attributes.title;
        return (
            <div className="post">
                <div>
                    <time>{moment.tz(this.props.attributes.date, zone).format("MMMM DD, YYYY")}</time>
                </div>
                <h1 className="post-title">{title}</h1>
                <div className="post-summary" dangerouslySetInnerHTML={{ __html: marked(this.props.body)}} />
            </div>
        );
    }
});

var Home = React.createClass({
    comoonentWillMount () {
        reqest
    },

    render () {
        var posts = this.props.posts.map(function (post, idx) {

            if (post.attributes.hasOwnProperty('blogroll') && post.attributes.blogroll === false) {
                return;
            }

            return (
                <div key={idx} className="post">
                    <time>{moment.tz(post.attributes.date, zone).format("YYYY/MM/DD")}</time>
                    <Link to="post" params={{ slug: post.attributes.slug}} className="post-title">{post.attributes.title}</Link>
                </div>
            );
        });

        return (
            <div className="blogroll">
                {posts}
            </div>
        );
    }
});

var Sidebar = React.createClass({
    render () {
        return (
            <div id="sidebar">
                <div className="component">
                    <h1>Site Navigation</h1>
                    <ul className="site-nav">
                        <li><a href="/about">About</a></li>
                        <li><a href="/">Blog</a></li>
                    </ul>
                </div>
            </div>
        );
    }
});

var App = React.createClass({
    render () {
        return (
            <html>
                <head>
                    <link href='http://fonts.googleapis.com/css?family=Merriweather:400,700,400italic,700italic' rel='stylesheet' type='text/css' />
                    <link href="/css/app.css" rel="stylesheet" type="text/css" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                </head>
                <body>
                    <div id="globalNavContainer">
                        <ul id="globalNav" className="nav cf">
                            <li>
                                <h1><a href="/" className="site-title">Chase Adams</a></h1>
                                <h2>intentional input for outstanding output.</h2>
                            </li>
                        </ul>
                    </div>
                    <div id="content">
                        <div id="main">
                            <RouteHandler {...this.props} />
                        </div>
                        <Sidebar />
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
        <Route name="post" path="/:slug" handler={Post} />
        <DefaultRoute handler={Home} />
    </Route>
);

module.exports = Routes;
