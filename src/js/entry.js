require('../sass/app.scss');
require("static?!../favicon.ico?output=favicon.ico");
// var React = require('react');
// var Router = require('react-router');


// var Routes = require('./routes.jsx');

// Router.run(Routes, Router.HistoryLocation, (Root) => {
//   var initialProps = [];
//   React.render(React.createElement(Root, initialProps), document);
// });

var GA = require('./3party/googleAnalytics.js');
GA();
