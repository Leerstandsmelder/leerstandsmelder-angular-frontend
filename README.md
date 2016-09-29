# Leerstandsmelder Angular Frontend #

[![Dependency Status](https://gemnasium.com/Leerstandsmelder/leerstandsmelder-angular-frontend.svg)](https://gemnasium.com/Leerstandsmelder/leerstandsmelder-angular-frontend) [![bitHound Code](https://www.bithound.io/github/Leerstandsmelder/leerstandsmelder-angular-frontend/badges/code.svg)](https://www.bithound.io/github/Leerstandsmelder/leerstandsmelder-angular-frontend)

The UI package for the [Leerstandsmelder](http://lm.htmhell.de) service based on [AngularJS](https://angularjs.org/) and [Angular Material](https://material.angularjs.org) for the browser and mobile devices.

## Browser UI ##

The web app consists of static code only so you can just clone the repo, set the ``dist/web`` folder as the document root and it should work.

Since the app uses Angular in HTML5 mode, you need to make sure that every 404 not found error gets redirected to index.html.

For Apache add the following line to either an existing ``.htaccess`` configuration in the app's document root or create a new one:

```
ErrorDocument 404 /index.html
```

Alternatively, you can just run ``./server`` from the repo root and the frontend will be served at ``http://localhost:9090``. **Important:** This server is not multithreaded thus introducing a bottleneck should it be used in production without something like [PM2](http://pm2.keymetrics.io/).

## Mobile UI ##

The mobile UI is built on [Apache Cordova](https://cordova.apache.org/) and is supported for Android and iOS.

## Development ##

### Requirements ###

[NodeJS](https://nodejs.org), [Bower](https://bower.io/) and [Gulp](http://gulpjs.com/) need to be installed. In order to build the mobile app you additionally need to install the [Cordova CLI tool](https://cordova.apache.org/#getstarted). To be able to work on the mobile UI in the browser you can install the [Ripple Emulator for Google Chrome](ttps://chrome.google.com/webstore/detail/ripple-emulator-beta/geelfhphabnejjhdalkjhgipohgpdnoc) (see below).

### Setup ###

Copy ``config.default.json`` to ``config.json`` and update if needed. Then, from the repo's root run:

```shell
npm install
bower install
```

### Building ###

To build both the browser and mobile user interfaces in ``dist/`` run ``gulp build``. To build only one of both platforms run ``gulp build --env=web`` or ``gulp build --env=mobile``. Using ``gulp release`` does a clean build and is recommended before deployment.
