angular.module('webApp')
    .factory('GarageSaleFactory', function($http, $q, $rootScope) {

        /**
         * The factory that will be returned
         */
        var factory = {};

        /**
         * A cache of the post-processed garage sales data
         */
        var garageSales = [];

        /**
         * Getter for garage sales.  The JSON format is that returned from the remote server (note, this is not in GeoJSON format).
         */
        factory.getGarageSales = function() {

            return garageSales;
        };

        /**
         * Uses a broadcast to let listeners respond when the garageSales is set
         */
        var setGarageSales = function(inGarageSales) {

            //set the garage sales data property
            garageSales = inGarageSales;

            //broadcast that the garage sales data has been set
            $rootScope.$broadcast("broadcastGarageSalesWasSet");
        };

        /**
         * For fetching garage sale data from server. This uses Angular's $http to call the Parse REST API.
         * Note: Controllers have two ways to get data - using a deferred promise or listening to a broadcast - see success block
         */
        factory.fetchGarageSalesFromServer = function() {

             //Required custom headers that need to be sent with each GET request to the BaaS
             var config = {
                 headers: {
                     'X-Parse-Application-Id':'eeAefJ4Tjy6aEsgqLbRa0EbD7dXuGwi3ULxHNDOy',
                     'X-Parse-REST-API-Key':'2RoDAR22ZvZfP5wwE8474yVEvjduphPSATXBQSvZ'
                 }
             };

             var deferred = $q.defer();

             $http.get("https://api.parse.com/1/classes/garagesalefinal", config).success(function(data, status, headers, config){

                 var postProcessedGarageSales = [];

                 //create an array of GarageSale model objects
                 for(var i = 0, il = data.results.length; i < il; i++) {

                     var currentItem = data.results[i];

                     //derive the garage sale category image name
                     var categoryImageName = deriveCategoryImageName(currentItem);

                     //derive the garage sale subcategory list
                     var subCategories = deriveSubCategoryNames(currentItem);

                     //derive the garage sale subcategory image names
                     var subCategoryImageNames = deriveSubcategoryImageNames(currentItem);

                     //create a simple and flat garage sale model object
                     var newGarageSale = {};
                     newGarageSale.id = currentItem.objectId;
                     newGarageSale.description =  currentItem.saleDescription;
                     newGarageSale.address = currentItem.address;
                     newGarageSale.city = currentItem.city;
                     newGarageSale.zipCode = currentItem.zipCode;
                     newGarageSale.state = currentItem["state"];
                     newGarageSale.year = currentItem.year;
                     newGarageSale.latitude = currentItem.latitude;
                     newGarageSale.longitude = currentItem.longitude;
                     newGarageSale.quadrant = currentItem.quadrant;
                     newGarageSale.firstName = currentItem.firstName;
                     newGarageSale.lastName = currentItem.lastName;
                     newGarageSale.category = currentItem.category;
                     newGarageSale.categoryImageName = categoryImageName;
                     newGarageSale.subCategories = subCategories;
                     newGarageSale.subCategoryImageNames = subCategoryImageNames;

                     postProcessedGarageSales.push(newGarageSale);
                 }

                 //set and broadcast the garage sale data
                 setGarageSales(postProcessedGarageSales);

                 //provide results to any classes using a promise
                 deferred.resolve(postProcessedGarageSales);

             }).error(function(data, status, headers, config){

                 console.log('failed to fetch garage sales from server with data: ' + data + ' with stauts: ' + status + ' with headers: ' + headers + ' with config: ' + config);

                 deferred.reject("error" + data);
             });

             return deferred.promise;
        };

        /**
         * Utility for deriving an array of image names
         * @param garageSale - a garage sale object
         * @returns {Array}
         */
        var deriveSubcategoryImageNames = function(garageSale) {

            var result = [];

            if(garageSale.catBooks) {
                result.push(subCategoryImageLookUp["books"]);
            }

            if(garageSale.catClothing) {
                result.push(subCategoryImageLookUp["clothing"]);
            }

            if(garageSale.catChildrenFamily) {
                result.push(subCategoryImageLookUp["childrenAndFamily"]);
            }

            if(garageSale.catFurniture) {
                result.push(subCategoryImageLookUp["furniture"]);
            }

            if(garageSale.catTools) {
                result.push(subCategoryImageLookUp["tools"]);
            }

            return result;
        };

        /**
         * Utility for deriving the garage sale category image name
         * @param garageSale - a garage sale object
         */
        var deriveCategoryImageName = function(garageSale) {

            var result = categoryImageLookup[garageSale.category];

            return result;
        };

        /**
         * For deriving the subcategory names to use in the UI based on data from the server
         * @param garageSale - a garage sale object
         * @returns {Array}
         */
        var deriveSubCategoryNames = function(garageSale) {

            var subCategoryNames = [];

            if(garageSale.catClothing) {
                subCategoryNames.push(subCategoryNameLookup.catClothing);
            }

            if(garageSale.catFurniture) {
                subCategoryNames.push(subCategoryNameLookup.catFurniture);
            }

            if(garageSale.catClothing) {
                subCategoryNames.push(subCategoryNameLookup.catClothing);
            }

            if(garageSale.catTools) {
                subCategoryNames.push(subCategoryNameLookup.catTools);
            }

            if(garageSale.catBooks) {
                subCategoryNames.push(subCategoryNameLookup.catBooks);
            }

            if(garageSale.catCollectibles) {
                subCategoryNames.push(subCategoryNameLookup.catCollectibles);
            }

            if(garageSale.catSports) {
                subCategoryNames.push(subCategoryNameLookup.catSports);
            }

            if(garageSale.catKitchen) {
                subCategoryNames.push(subCategoryNameLookup.catKitchen);
            }

            return subCategoryNames;
        };

        /**
         * For filtering garage sales
         * @param caregoryFilter - an array of categories to filter by
         * @param subCategoryFilter - an array of subcategories to filter by
         * @returns {Array} - an array of filtered garage sales
         */
        var filterGarageSales = function(caregoryFilter, subCategoryFilter) {

            var result = [];

            return result;
        };


        //the factory to return
        return factory;
    });



/**
 * For looking up the image name for a garage sale major category
 */
var categoryImageLookup = {
    "Family Sale": "blue-mark-lg.png",
    "Benefit Sale": "orange-mark-lg.png"
};

/**
 * For looking up the image names for a garage sale sub-category
 */
var subCategoryImageLookUp = {
    books: "books@2x.png",
    childrenAndFamily: "family@2x.png",
    clothing: "clothing@2x.png",
    furniture: "furniture@2x.png",
    tools: "tools@2x.png"
};

/**
 * For looking up the category name to use when presenting a subcategory to the user in the UI
 */
var subCategoryNameLookup = {
    catChildrenFamily: "Children & Family",
    catFurniture: "Furniture",
    catClothing: "Clothing",
    catTools: "Tools",
    catBooks: "Books",
    catCollectibles: "Collectibles",
    catSports: "Sports",
    catKitchen: "Kitchen"
};