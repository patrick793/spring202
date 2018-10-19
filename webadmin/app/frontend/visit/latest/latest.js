"use strict";

(() => {
    var app = angular.module('app');    
    app.controller('VisitLatestController', (VisitDAO, $scope, $interval) => {
        //set navbar using JQuery
        window.jQuery( ".nav-item" ).each( function() {
            window.jQuery( this ).removeClass( "active" );
        });
        window.jQuery('#nav_latest').addClass( "active" );


        let vm = this;
        let repeater = {};
        $scope.data = {};
        $scope.loadData = () => {
            repeater = $interval(async () => {
                $scope.data = await VisitDAO.getLatestVisit().$promise;
                console.log("HEY");
                console.log($scope.data);
            }, 3000);
        }
    })
})()