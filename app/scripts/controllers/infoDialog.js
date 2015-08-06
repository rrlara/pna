
angular.module('webApp')
    .controller('InfoDialogController', function($scope, $mdDialog) {


        /**
         * For listening for when garage sale data is available from server
         */

        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };




        

    
    });