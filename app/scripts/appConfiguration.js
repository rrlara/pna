angular.module('webApp')
    .factory('AppConfiguration', function() {

        /**
         * The factory that will be returned
         */
        var factory = {};

        /**
         * Mapbox access token for SpatialDev
         */
        factory.mapBoxAccessToken = "pk.eyJ1Ijoic3BhdGlhbGRldiIsImEiOiJKRGYyYUlRIn0.PuYcbpuC38WO6D1r7xdMdA";

        /**
         * Default map id
         */
        factory.defaultMapId = "spatialdev.map-4o51gab2";

        /**
         * Default lat, lng, and zoom level
         */
        factory.defaultLat = 47.68021;
        factory.defaultLng = -122.350101;
        factory.defaultZoomLevel = 15;


        return factory;
    });
