var app = angular.module('AluminusWebsite', ['ngMaterial', 'ngAnimate', 'ngAria']);

app.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('blue');
});
