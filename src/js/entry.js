require('../sass/app.scss');
var React = require('react');
var Router = require('react-router');


var Routes = require('./routes.jsx');

Router.run(Routes, Router.HistoryLocation, (Root) => {
  var initialProps = [];
  React.render(React.createElement(Root, initialProps), document);
});

require('./3party/googleAnalytics.js')();
