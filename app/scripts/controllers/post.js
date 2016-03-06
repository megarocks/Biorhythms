'use strict';

/**
 * @ngdoc function
 * @name yoApp.controller:PostCtrl
 * @description
 * # PostCtrl
 * Controller of the yoApp
 */
angular.module('yoApp')
    .controller('PostCtrl', function ($routeParams) {
        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
        console.log('post id:', $routeParams.postId );

    });
