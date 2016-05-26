(function() {
  "use strict";

  var module = angular.module("app");
  var fetchFlowers = function($http) {

    var promise = $http.get('https://dmm888enhanced.apphb.com/api/apicode/getflowersod', {
        cache: false
      })
      .error(function(error) {
        alert(error);
      });
    return promise;

  };

  var controller = function($http) {
    this.flowers = [];
    this.flower = {};


    var counter = 0;

    this.$onInit = function() {
      fetchFlowers($http).then(function(response) {
        this.flowers = response.data;
        this.flower = this.flowers[0];
      }.bind(this)); // to avoid using var self = this
    };



    this.next = function() {

      if (counter < this.flowers.length - 1) {
        counter += 1;
        this.flower = this.flowers[counter];
      }
    };

    this.previous = function() {
      if (counter > 0) {
        counter -= 1;
        this.flower = this.flowers[counter];

      }

    };

  };

  module.component("customComponent", {
    css: 'css/component.css', //require angularCSS module
    templateUrl: "components/customcomponent.html",

    bindings: {
      reason: '@',
      oneWay: '<', // to bind one way
      twoWay: '=' // to bind two ways
    },


    controllerAs: "vm",
    controller: ['$http', controller]
      // annotation for right minification
  });




})();