'use strict';

module.exports = [

    // Important: The routes are evaluated in this order so earlier routes have precedence!

    //
    //
    // Site

    {
        route: '/',
        templateUrl: '/locations/region_map.html',
        controller: 'Regions.MapIndex'
    },
    {
        route: '/site/:slug',
        templateUrl: '/site/static_page.html',
        controller: 'Widgets.StaticPage'
    },


    //
    //
    // Regions

    {
        route: '/regions',
        templateUrl: '/regions/region_map.html',
        controller: 'Regions.MapIndex'
    },
    {
        route: '/regions/:uuid',
        templateUrl: '/regions/show.html',
        controller: 'Regions.Show'
    },
    {
        route: '/admin/regions',
        templateUrl: '/regions/list.html',
        controller: 'Regions.List'
    },
    {
        route: '/admin/regions/create',
        templateUrl: '/regions/update.html',
        controller: 'Regions.Update'
    },
    {
        route: '/admin/regions/:uuid',
        templateUrl: '/regions/update.html',
        controller: 'Regions.Update'
    },

    //
    //
    // Posts

    {
        route: '/posts/:uuid',
        templateUrl: '/posts/show.html',
        controller: 'Posts.Show'
    },
    {
        route: '/admin/posts',
        templateUrl: '/posts/list.html',
        controller: 'Posts.List'
    },
    {
        route: '/admin/posts/static',
        templateUrl: '/posts/list.html',
        controller: 'Posts.List'
    },
    {
        route: '/admin/posts/create',
        templateUrl: '/posts/update.html',
        controller: 'Posts.Update'
    },
    {
        route: '/admin/posts/:uuid',
        templateUrl: '/posts/update.html',
        controller: 'Posts.Update'
    },
    //
    //
    // Comments

    {
        route: '/comments/:uuid',
        templateUrl: '/comments/show.html',
        controller: 'Comments.Show'
    },
    {
        route: '/admin/comments',
        templateUrl: '/comments/list.html',
        controller: 'Comments.List'
    },
    {
        route: '/admin/comments/create',
        templateUrl: '/comments/update.html',
        controller: 'Comments.Update'
    },
    {
        route: '/admin/comments/:uuid',
        templateUrl: '/comments/update.html',
        controller: 'Comments.Update'
    },
    {
        route: '/admin/regions/:region_uuid/comments',
        templateUrl: '/comments/list.html',
        controller: 'Comments.List'
    },
    {
        route: '/admin/regions/:region_uuid/comments/all',
        templateUrl: '/comments/list.html',
        controller: 'Comments.ListAll'
    },

    //
    //
    // Users

    {
        route: '/users/create',
        templateUrl: '/users/create.html',
        controller: 'Users.Create'
    },
    {
        route: '/users/login',
        templateUrl: '/users/login.html',
        controller: 'Users.Login'
    },
    {
        route: '/users/me',
        templateUrl: '/users/update.html',
        controller: 'Users.Update'
    },
    {
        route: '/users/me/locations',
        templateUrl: '/locations/list.html',
        controller: 'Locations.User'
    },
    {
        route: '/users/me/messages',
        templateUrl: '/messages/list.html',
        controller: 'Messages.List'
    },
    {
        route: '/users/logout',
        templateUrl: '/users/logout.html',
        controller: 'Users.Logout'
    },
    {
        route: '/users/forgot',
        templateUrl: '/users/forgot.html',
        controller: 'Users.Forgot'
    },
    {
        route: '/users/confirm/:token',
        templateUrl: '/users/confirm.html',
        controller: 'Users.Confirm'
    },
    {
        route: '/users/reset/:token',
        templateUrl: '/users/reset.html',
        controller: 'Users.Confirm'
    },

    //
    //
    // Admin Users
    {
        route: '/admin/users/list',
        templateUrl: '/users/list.html',
        controller: 'Users.List'
    },
    {
        route: '/admin/users/create',
        templateUrl: '/users/update-admin.html',
        controller: 'Users.Update.Admin'
    },
    {
        route: '/admin/users/:uuid',
        templateUrl: '/users/update-admin.html',
        controller: 'Users.Update.Admin'
    },


    //
    //
    // Regions

    {
        route: '/:uuid',
        templateUrl: '/regions/show.html',
        controller: 'Regions.Show'
    },
    {
        route: '/admin/regions',
        templateUrl: '/regions/list.html',
        controller: 'Regions.List'
    },

    //
    //
    // Messages

    {
        route: '/messages/create',
        templateUrl: '/messages/create.html',
        controller: 'Messages.Create'
    },
    {
        route: '/messages/list',
        templateUrl: '/messages/list.html',
        controller: 'Messages.List'
    },
    {
        route: '/messages/:uuid/reply',
        templateUrl: '/messages/reply.html',
        controller: 'Messages.Reply'
    },

    //
    //
    // Locations

    {
        route: '/locations/index',
        templateUrl: '/locations/region_index.html',
        controller: 'Locations.RegionIndex'
    },
    {
        route: '/locations/index/:region_uuid',
        templateUrl: '/locations/region_index.html',
        controller: 'Locations.RegionIndex'
    },
    {
        route: '/locations/create',
        templateUrl: '/locations/update.html',
        controller: 'Locations.Create'
    },
    {
        route: '/locations/update/:uuid',
        templateUrl: '/locations/update.html',
        controller: 'Locations.Create'
    },
    {
        route: '/:region_uuid/:uuid',
        templateUrl: '/locations/show.html',
        controller: 'Locations.Show'
    },
    {
        route: '/admin/regions/:region_uuid/locations',
        templateUrl: '/locations/list.html',
        controller: 'Locations.RegionList'
    }

];