
angular.module('webApp')
    .controller('ListController', function($scope, $mdSidenav, $log, GarageSaleFactory) {

        /**
         * For swiping the left panel closed when panel is presented in phone form factor
         */
        $scope.onSwipeLeft = function() {
            $scope.close();
        };

        /**
         * For closing the left panel
         */
        $scope.close = function () {
            $mdSidenav('left').close()
                .then(function () {
                    $log.debug("close LEFT is done");
                });
        };

        /**
         * For holding onto the garage sales fetched from the server, for use by repeater
         */
        $scope.garageSales = [];

        /**
         * For listening for when garage sale data is available from server
         */
        $scope.$on('broadcastGarageSalesWasSet', function(){

            $scope.garageSales = GarageSaleFactory.getGarageSales();
        });

        /**
         * For handling when user taps on the directions button
         * @param sale - The GarageSale object associated with the list item the user tapped
         */
        $scope.handleDirectionButtonTap = function(sale) {

            //
            console.log('user tapped on directions button');
            console.log(sale);
            console.log(sale.id);
            console.log(sale.latitude);
            console.log(sale.longitude);
            console.log(sale.description);

            //TODO - MAKE CALL TO DIRECTIONS API, WILL THEN ZOOM TO EXTENT OF ROUTE
        };

        /**
         * For handling when user taps on a list item
         * @param sale - The GarageSale object associated with the list item the user tapped
         */
        $scope.handleListItemClick = function(sale) {

            //
            console.log('user tapped on list item');
            console.log(sale);
            console.log(sale.id);
            console.log(sale.latitude);
            console.log(sale.longitude);
            console.log(sale.description);

            //TODO - ZOOM TO POINT
        }
    });

