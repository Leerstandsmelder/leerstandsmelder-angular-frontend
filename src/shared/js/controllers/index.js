'use strict';

var app = require('angular').module('leerstandsmelder');

// TODO: there should be quite a bit of redundancy here... look into abstracting all CRUD-related stuff

app.controller('Application', require('./application'));

app.controller('Locations.Create', require('./locations/create'));
app.controller('Locations.RegionIndex', require('./locations/region-index'));
app.controller('Locations.RegionList', require('./locations/region-list'));
app.controller('Locations.Show', require('./locations/show'));
app.controller('Locations.User', require('./locations/user'));

app.controller('Messages.List', require('./messages/list'));
app.controller('Messages.Create', require('./messages/create'));

app.controller('Posts.List', require('./posts/list'));
app.controller('Posts.Show', require('./posts/show'));
app.controller('Posts.Update', require('./posts/update'));

app.controller('Regions.List', require('./regions/list'));
app.controller('Regions.MapIndex', require('./regions/map-index'));
app.controller('Regions.Show', require('./regions/show'));
app.controller('Regions.Update', require('./regions/update'));

app.controller('Users.Confirm', require('./users/confirm'));
app.controller('Users.Create', require('./users/create'));
app.controller('Users.Forgot', require('./users/forgot'));
app.controller('Users.Login', require('./users/login'));
app.controller('Users.Logout', require('./users/logout'));
app.controller('Users.Update', require('./users/update'));
app.controller('Users.Update.Admin', require('./users/update-admin'));
app.controller('Users.List', require('./users/list'));

app.controller('Comments.List', require('./comments/list'));
app.controller('Comments.ListAll', require('./comments/list-all'));
app.controller('Comments.Show', require('./comments/show'));
app.controller('Comments.Update', require('./comments/update'));


app.controller('Widgets.Alerts', require('./widgets/alerts'));
app.controller('Widgets.Navbar', require('./widgets/navbar'));
app.controller('Widgets.StaticPage', require('./widgets/static-page'));