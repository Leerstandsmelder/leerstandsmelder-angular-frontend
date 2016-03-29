/* global PruneCluster,L,angular,define,async,PIECEMETA_API_HOST,console */

define([], function () {
    return angular.module('lsm.services.map', [])
        .factory('mapService', ['$http', function ($http) {
            return {
                initMap: function (el, config, settings, addMiniMap, addGeoSearch) {
                    var map, geoConf = config.geoSearch.main;

                    if (!settings.latlon) {
                        settings.latlon = [53.5653,10.0014];
                    }
                    if (!settings.zoom) {
                        settings.zoom = 6;
                    }

                    // Basic Leaflet marker icon that other marker types will inherit from
                    L.Icon.extend(config.markers.baseMarker);
                    L.Icon.Default.imagePath = config.icons.basePath;

                    // Set up the Leaflet map
                    map = L.map('map', config.mainMap.mapConfig);
                    map.setView(settings.latlon, settings.zoom);

                    // Load tiles from OpenStreetMap
                    new L.tileLayer(config.mainMap.osmUrl, config.mainMap.tileLayer).addTo(map);

                    // PREP CLUSTERS //
                    PruneCluster.Cluster.ENABLE_MARKERS_LIST = true;

                    // CONTROLS //
                    L.control.scale().addTo(map).setPosition('bottomleft');

                    if (addGeoSearch) {
                        geoConf.provider = new L.GeoSearch.Provider.OpenStreetMap(config.geoSearch.provider);
                        new L.Control.GeoSearch(geoConf).addTo(map);
                    }

                    map.zoomControl.setPosition('topleft');

                    if (addMiniMap) {
                        var tileLayer = new L.TileLayer(config.miniMap.osmUrl, config.miniMap.tileLayer);
                        new L.Control.MiniMap(tileLayer, config.miniMap.mapConfig).addTo(map);
                    }

                    return map;
                },
                createMarker: function (data, config) {
                    var marker;

                    if (config.isPruneCluster) {
                        // TODO: implement prune cluster stuff
                    } else {
                        var options = {
                            draggable: config.draggable
                        };
                        if (config.view_url) {
                            options.view_url = config.view_url;
                        }
                        marker = L.marker(config.latlon, options);
                        marker.popup = config.popup;
                    }
                    return marker;
                },
                reverseGeoCode: function (lat, lon, callback) {
                    // well structured
                    // https://nominatim.openstreetmap.org/reverse?format=json&lat=53.60695729613987&lon=9.942927360534668&zoom=18&addressdetails=1
                    // the service requests adding '&email=' to the requests if there are
                    // going to be many of them
                    $http({
                        method: 'GET', url: 'https://nominatim.openstreetmap.org/reverse?format=json&lat=' + lat +
                        '&lon=' + lon + '&zoom=18&addressdetails=1'
                    }).success(function (message) {
                        callback(null, message);
                    }).error(function (data, status) {
                        callback(new Error('Could not get address:'));
                    });
                },
                geoCode: function (address, callback) {
                    if (!address.country) {
                        address.country = "de";
                    }
                    // well structured
                    // https://nominatim.openstreetmap.org/search?q=135+pilkington+avenue,+birmingham&format=json
                    // the service requests adding '&email=' to the requests if there are
                    // going to be many of them
                    $http({
                        method: 'GET',
                        url: 'https://nominatim.openstreetmap.org/search?format=json&q=' +
                        address.street + '+' + address.city + '+' + address.country
                    }).success(function (message) {
                        callback(null, message);
                    }).error(function (data, status) {
                        callback(new Error('Service error starring image:', data, status), null);
                    });
                },
                createAddressFromGeo: function (address) {
                    return {
                        city: address.city || address.town || address.village || address.hamlet || "City not found",
                        street: (address.road || address.path || address.footway || address.pedestrian || address.cycleway || "") + " " + (address.house_number || ""),
                        postcode: address.postcode || ""
                    };
                }
            };
        }]);
});