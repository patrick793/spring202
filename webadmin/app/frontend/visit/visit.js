"use strict";

(() => {
    var app = angular.module('app');
    app.config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state('visit', {
        url: '/visit',
        templateUrl: 'visit/visit.html'
        })
        .state('visit-add', {
        url: '/visit/add',
        templateUrl: 'visit/add/add.html',
        })
        .state('visit-detail', {
        url: '/visit/:id',
        templateUrl: 'visit/detail/detail.html',
        params : { data: '' }
        })
        .state('visit-edit', {
        url: '/visit/edit/:id',
        templateUrl: 'visit/edit/edit.html',
        params : { data: '' }
        })
        .state('visit-search', {
        url: '/visit/search',
        templateUrl: 'visit/search/search.html',
        params : { data: '' }
        })
    }]);

    app.factory('VisitDAO', $resource => {
        var _url_ = '/api/v1/visit';
        return $resource(_url_, null, {
            'getVisitData': {
                method: 'GET',
                url: _url_,
                isArray: true
            },
            "createVisit" : {
                method: "POST",
                url: _url_
            },
            "getVisit" : {
                method: "GET",
                url: _url_ + '/:id',
                id: "@id"
            },
            "editVisit" : {
                method: "PUT",
                url: _url_ + '/:id',
                id: "@id"
            },
            "deleteVisit" : {
                method: "DELETE",
                url: _url_ + '/:id',
                id: "@id"
            },
        })
    })

    app.controller('VisitController', (VisitDAO, $scope, $interval) => {
        //set navbar using JQuery
        window.jQuery( ".nav-item" ).each( function() {
            window.jQuery( this ).removeClass( "active" );
        });
        window.jQuery('#nav_list').addClass( "active" );


        let vm = this;
	let repeater = {};
        $scope.dataList = {};
        $scope.loadData = () => {
            repeater = $interval(async () => {
		$scope.dataList = await VisitDAO.getVisitData({});
	    }, 3000);
        }
    })
})()
