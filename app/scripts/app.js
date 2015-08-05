angular.module('webApp', ['ngMaterial'])
    .config(function($mdThemingProvider) {
        $mdThemingProvider.definePalette('customPalette', {
            '50': 'E0E3E4',
            '100': 'B8BDC1',
            '200': '8E969C',
            '300': '606C74',
            '400': '3E4D57',
            '500': '1E2F3B',
            '600': '1B2A35',
            '700': '18262F',
            '800': '152129',
            '900': '0F181E',
            'A100': 'E0E3E4',
            'A200': '3E4D57',
            'A400': '18262F',
            'A700': '0F181E',
            'contrastDefaultColor': 'light',    // whether, by default, text (contrast) on this palette should be dark or light
            'contrastDarkColors': ['50', '100', '200', '300', '400', 'A100'], //hues which contrast should be 'dark' by default
            'contrastLightColors': undefined    // could also specify this if default was 'dark'
        });
        $mdThemingProvider.theme('default')
            .primaryPalette('customPalette')
    });
