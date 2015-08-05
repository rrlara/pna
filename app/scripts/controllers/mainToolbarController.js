
angular.module('webApp')
    .controller('MainToolbarController', function($scope, $mdSidenav, $location, $anchorScroll) {

        /**
         * For toggling the left panel
         */
        $scope.toggleLeftPanel = function() {

            $mdSidenav('left').toggle().then(function(){
                //scroll to top of list
                $location.hash('leftPanelTop');
                $anchorScroll();
            });
        };

        /**
         * For toggling the right panel
         */
        $scope.toggleRightPanel = function() {

            $mdSidenav('right').toggle().then(function(){
                //scroll to top
                $location.hash('rightPanelTop');
                $anchorScroll();
            });
        };

    });