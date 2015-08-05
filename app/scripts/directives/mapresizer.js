/**
 * For Resizing the target element (i.e. intented for the map parent div) to be roughly the same size as the window (minus the height of the navigation bar)
 */
angular.module('webApp')
    .directive('mapresizer', function() {

        return {
            restrict: 'A',
            link: function($scope, element, attrs) {

                /**
                 * For resizing height of the target element to be 50 less than the window's height
                 */
                function resizeElement() {

                    //derive the target height
                    var windowInnerHeight = window.innerHeight;

                    var navigationBarHeight = 64;

                    var derivedHeight = windowInnerHeight - navigationBarHeight;

                    //apply the height to the target element
                    element.css({

                        height: derivedHeight + 'px'
                    });
                }

                /**
                 * For calling resize when the user resizes the window
                 */
                window.onresize = function() {

                    resizeElement()
                };


                /**
                 * For calling resize after document initially loads
                 */
                angular.element(document).ready(function () {

                    resizeElement();
                });
            }
        }
    });