'use strict';

var MapService = function ($http, assetPath) {
    return {
        initMap: function (el, config, settings, addMiniMap, addGeoSearch) {
            var map, geoConf = config.geoSearch.main;

            if (!settings.latlon) {
                // todo:nice to maybe reverse ip location of the user? or pull their GPS once every 5 minutes...
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
            // var pruneCluster = new PruneClusterForLeaflet();
            //PruneCluster.Cluster.ENABLE_MARKERS_LIST = true;

            // CONTROLS //
            L.control.scale().addTo(map).setPosition('bottomleft');
            if (addGeoSearch) {
             geoConf.provider = new L.GeoSearch.Provider.OpenStreetMap(config.geoSearch.provider);
             new L.Control.GeoSearch(geoConf).addTo(map);
            }

            map.zoomControl.setPosition('bottomleft');

            if (addMiniMap) {
                var tileLayer = new L.TileLayer(config.miniMap.osmUrl, config.miniMap.tileLayer);
                new L.Control.MiniMap(tileLayer, config.miniMap.mapConfig).addTo(map);
            }

            return map;
        },
        createMarker: function (data, config) {
            var marker;
            var icon = L.icon({
                iconUrl: assetPath + 'images/marker-active.png',
                iconRetinaUrl: assetPath + 'images/marker-active@2x.png',
                iconSize: [32, 44],
                iconAnchor: [16, 43],
                popupAnchor: [-3, -47]
            });

            // TODO: implement prune cluster stuff

            var options = {
                icon: icon,
                draggable: config.draggable
            };
            if (config.view_url) {
                options.view_url = config.view_url;
            }
            marker = L.marker(config.latlon, options);
            marker.popup = config.popup;

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
            }).then(function (message) {
                callback(null, message);
            }).catch(function (data, status) {
                // TODO: handle this properly
                console.log(data, status);
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
                address.street + '+' + address.postcode + '+' + address.city + '+' + address.country
            }).then(function (message) {
                callback(null, message);
            }).catch(function (data, status) {
                callback(new Error('Service error starring image:', data, status), null);
            });
        },
        createAddressFromGeo: function (address) {
            return {
                city: address.city || address.town || address.village || address.state || "City not found",
                street: (address.road || address.path || address.footway || address.pedestrian || address.cycleway || "") + " " + (address.house_number || ""),
                postcode: address.postcode || ""
            };
        }
    };
};

MapService.$inject = ['$http', 'assetPath'];

module.exports = MapService;
