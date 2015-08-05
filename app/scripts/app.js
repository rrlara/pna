angular.module('webApp', ['ngMaterial'])
    .config(function($mdGestureProvider) {
            $mdGestureProvider.skipClickHijack();    // could also specify this if default was 'dark'
    });
