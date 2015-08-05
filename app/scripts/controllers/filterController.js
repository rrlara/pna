
angular.module('webApp')
    .controller('FilterController', function($scope, $mdSidenav, $log, CategoryFactory, SubCategoryFactory) {

        /**
         * Initialization
         */
        angular.element(document).ready(function () {

            CategoryFactory.getCategories().then(function(categoriesJSON){

                $scope.categories = categoriesJSON;
            });

            SubCategoryFactory.getSubCategories().then(function(subcategoriesJSON){

                $scope.subCategories = subcategoriesJSON;
            });
        });

        /**
         * For swiping the left panel closed when panel is presented in phone form factor
         */
        // $scope.onSwipeRight = function() {
        //     $scope.close();
        // };

        /**
         * For closing the right panel
         */
        $scope.close = function () {
            $mdSidenav('right').close()
                .then(function () {
                    $log.debug("close RIGHT is done");
                });
        };

        /**
         * Filter categories
         */
        $scope.categories = [];


        /**
         * Filter subcategories
         */
        $scope.subCategories = [];


        $scope.handleFilterChange = function() {

            //
            console.log('handle checkbox change');

            console.log($scope.categories);

            console.log($scope.subCategories);
        }
    });