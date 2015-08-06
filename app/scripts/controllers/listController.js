
angular.module('webApp')
    .controller('ListController', function($scope, $rootScope, $mdSidenav, $mdDialog, $timeout, $log, GarageSaleFactory) {

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
        $scope.handleSeeInfoButtonTap = function(sale) {

            //
            console.log('user tapped on directions button');
            console.log(sale);
            console.log(sale.id);
            console.log(sale.latitude);
            console.log(sale.longitude);
            console.log(sale.description);

            //TODO - MAKE CALL TO DIRECTIONS API, WILL THEN ZOOM TO EXTENT OF ROUTE

            $scope.close();
            $rootScope.$broadcast("itemClickedOnList", sale.id);
            $timeout(function() {
                $scope.showAdvanced();
            }, 500);


        };

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

             var clickedItemID = sale.id;

            $scope.close();


            $rootScope.$broadcast("itemClickedOnList", clickedItemID);

        }
    });

