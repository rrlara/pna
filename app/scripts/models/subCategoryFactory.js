angular.module('webApp')
    .factory('SubCategoryFactory', function($http, $q) {

        /**
         * The factory that will be returned
         */
        var factory = {};

        /**
         * For fetching sub-categories JSON
         */
        factory.getSubCategories = function(){

            var deferred = $q.defer();

            $http.get("scripts/json/subcategories.json").success(function(data, status, headers, config){

                deferred.resolve(data);

            }).error(function(data, status, headers, config){

                deferred.reject("error" + data);
            });

            return deferred.promise;
        };

        return factory;
    });