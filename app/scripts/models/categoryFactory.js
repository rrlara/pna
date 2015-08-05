angular.module('webApp')
    .factory('CategoryFactory', function($http, $q) {

        /**
         * The factory that will be returned
         */
        var factory = {};

        /**
         * For fetching categories JSON
         */
        factory.getCategories = function(){

            var deferred = $q.defer();

            $http.get("scripts/json/categories.json").success(function(data, status, headers, config){

                deferred.resolve(data);

            }).error(function(data, status, headers, config){

                deferred.reject("error" + data);
            });

            return deferred.promise;
        };

        return factory;
    });