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
        $scope.repeater = {};
        $scope.data = {};
        $scope.loadData = () => {
            console.log($scope.repeater);
            $scope.repeater = $interval(async () => {
                $scope.data = await VisitDAO.getLatestVisit().$promise;
                console.log("Get Latest");
            }, 3000);
        } 

        $scope.$on("$destroy",function(){
            if (angular.isDefined($scope.repeater)) {
                $interval.cancel($scope.repeater);
            }
        });
    })
})()