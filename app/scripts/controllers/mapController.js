
angular.module('webApp')
    .controller('MapController', function($scope, $mdBottomSheet, $compile,$mdDialog,$timeout, AppConfiguration, GarageSaleFactory) {

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
         * Bottom sheet method
         */
        $scope.showListBottomSheet = function() {
            $mdBottomSheet.show({
              templateUrl: 'itemDetails-bottomsheet.html',
              controller: 'ListBottomSheetCtrl'
            }).then(function(clickedItem) {
            });
          };

        /**
         * Info Dialog
         */
        $scope.showAdvanced = function() {
            $mdDialog.show({
                controller: 'InfoDialogController',
                templateUrl: 'infoDialog.html',
                parent: angular.element(document.body)
            })
                .then(function(answer) {
                    $scope.alert = 'You said the information was "' + answer + '".';
                }, function() {
                    $scope.alert = 'You cancelled the dialog.';
                });
        };

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

            //Added default blue color to map pins on load
            for (var i = 0; i < arrayGeoJson.features.length; i++) {
                arrayGeoJson.features[i].properties['marker-size'] = "small";
                arrayGeoJson.features[i].properties['marker-color'] = "#3bb2d0";
            }

            //add the GEOJSON layer to map
            var myLayer = L.mapbox.featureLayer().addTo($scope.map);
            //Once point data is loaded, add it the GEOJSON layer on the map
            myLayer.setGeoJSON(arrayGeoJson);

            //reset to default color
            function resetColors() {
                for (var i = 0; i < arrayGeoJson.features.length; i++) {
                    arrayGeoJson.features[i].properties['marker-size'] = "small";
                    arrayGeoJson.features[i].properties['marker-color'] = "#3bb2d0";
                }
                myLayer.setGeoJSON(arrayGeoJson);
            }

            /**
             * target the point to highlight
             */
            myLayer.on('click', function(e) {
                    console.log("whatup");
                    // alert("whatup");
                    resetColors();
                    // e.layer.feature.properties['old-color'] = e.layer.feature.properties['marker-color'];
                    e.layer.feature.properties['marker-color'] = '#ff8888';
                    e.layer.feature.properties['marker-size'] = "large";
                    myLayer.setGeoJSON(arrayGeoJson);
                    $timeout(function() {
                        //$scope.showListBottomSheet();
                    }, 500);

                //console.log(e.latlng)
                costumeMarkerPopUp(e.latlng);
                    
                });

            //if click anywhere on the map, the pins will go back to default color
            function onMapClick(e) {
                resetColors();
            }
            $scope.map.on('click', onMapClick);



            $scope.$on('itemClickedOnList', function(evt, itemID){
                //reset points to default
                resetColors();
                // close any map popups
                $scope.map.closePopup();
                //target the point to highlight
                for (var i = 0; i < arrayGeoJson.features.length; i++) {
                    if(arrayGeoJson.features[i].properties.id == itemID){
                        arrayGeoJson.features[i].properties['marker-size'] = "large";
                    arrayGeoJson.features[i].properties['marker-color'] = "#ff8888";
                    //center map to the pin
                    $scope.map.setView([arrayGeoJson.features[i].geometry.coordinates[1], arrayGeoJson.features[i].geometry.coordinates[0]]);
                    }   
                }
                myLayer.setGeoJSON(arrayGeoJson);
                //wait 1 sec to show info dialog
                $timeout(function() {
                    $scope.showAdvanced();
                }, 1000);
                });
            });

        /**
         * Customized Mapbox Popup
         */
        function costumeMarkerPopUp(position){
            //offset values
            var options = {
                offset:  new L.Point(1, -30)
            };
            // close any map popups
            $scope.map.closePopup();
            var template = '<md-button class="md-primary" ng-click="showAdvanced()" style="font-size: 24px"><i class="fa fa-info-circle"></i></md-button>';
            template = template, linkFunction = $compile(angular.element(template)),
                newScope = $scope.$new();

            // define the map popup and put it on the map at the center of the polygon
            popup = L.popup(options)
                .setLatLng([position.lat, position.lng])
                .setContent(linkFunction(newScope)[0])// use link function to create DOM for angularjs
                .openOn($scope.map)
        }

        

    
    });

/**
 * Bottomsheet controller
 */

angular.module('webApp').controller('ListBottomSheetCtrl', function($scope, $mdBottomSheet) {
  $scope.items = [
    { name: 'Share', icon: 'share-arrow' },
    { name: 'Upload', icon: 'upload' },
    { name: 'Copy', icon: 'copy' },
    { name: 'Print this page', icon: 'print' },
  ];
  $scope.listItemClick = function($index) {
    var clickedItem = $scope.items[$index];
    $mdBottomSheet.hide(clickedItem);
  };
})