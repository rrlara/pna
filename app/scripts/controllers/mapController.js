
angular.module('webApp')
    .controller('MapController', function($scope, AppConfiguration, GarageSaleFactory) {

        /**
         * Initialization
         */
        angular.element(document).ready(function () {

            //fetch data from server
            GarageSaleFactory.fetchGarageSalesFromServer();

            $scope.setAccessToken();
            $scope.setDefaultTileLayer();
            $scope.setDefaultExtent();
        });

        /**
         * The MapboxJS/Leaflet map object
         */
        $scope.map;


        /**
         * Required to use MapboxJS/Leaflet
         */
        $scope.setAccessToken = function() {
            L.mapbox.accessToken = AppConfiguration.mapBoxAccessToken;
        };

        /**
         * For setting the default map layer
         */
        $scope.setDefaultTileLayer = function() {
            //$scope.map = L.mapbox.map('map', AppConfiguration.defaultMapId, { zoomControl: false });
            $scope.map = L.mapbox.map('map', AppConfiguration.defaultMapId, { zoomControl: true });
        };

        /**
         * For setting the default map extent
         */
        $scope.setDefaultExtent = function() {
            $scope.map.setView([AppConfiguration.defaultLat, AppConfiguration.defaultLng], AppConfiguration.defaultZoomLevel);
        };

        /**
         * For listening for when garage sale data is available from server
         */
        $scope.$on('broadcastGarageSalesWasSet', function(){

            var garageSales = GarageSaleFactory.getGarageSales();

            var arrayGeoJson = GeoJSON.parse(garageSales, {Point: ['latitude', 'longitude']});

            console.log(arrayGeoJson);

        
            var geoJson = L.geoJson(arrayGeoJson, {
                pointToLayer: L.mapbox.marker.style,
                style: function(feature) { return feature.properties; 
                }
            }).addTo($scope.map);

            //add garage sales as markers to map
            // for (var i = 0, il = garageSales.length; i < il; i++) {

            //     var currentSale = garageSales[i];

            //     //coordinate
            //     var latitude = currentSale.latitude;
            //     var longitude = currentSale.longitude;

            //     //marker popup html
            //     var popupHTML = "<h4>hello</h4>world";

            //     //add marker
            //     L.marker([latitude, longitude], {
            //         icon: L.icon({
            //             "iconUrl": "images/" + currentSale.categoryImageName,
            //             "iconSize": [22, 35],
            //             "popupAnchor":  [0, -12]
            //         })
            //      }).addTo($scope.map).bindPopup(popupHTML);
            // }

            geoJson.on('click', function(e) {
                    console.log("whatup");
                });
        });


        





    });