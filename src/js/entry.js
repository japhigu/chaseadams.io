require('../sass/app.scss');
var React = require('react');
var Router = require('react-router');


var Routes = require('./routes.jsx');

Router.run(Routes, Router.HashLocation, (Root) => {
  React.render(<Root/>, document.body);
});React.render(<Routes />, document.getElementById('main'));
