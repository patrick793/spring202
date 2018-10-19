"use strict";

(() => {
    var app = angular.module('app');
    app.controller('VisitDetailController', (VisitDAO, $state, $stateParams, $scope, $filter) => {
        $scope.formOptions = [
            {
                name: 'Visitor Name',
                id: 'visitorName',
                type: 'text'
            },
            {
                name: 'Visitor Title',
                id: 'visitorTitle',
                type: 'text'
            },
            {
                name: 'Visitor Company',
                id: 'visitorCompany',
                type: 'text'
            },
            {
                name: 'Visit Contact',
                id: 'visitorContact',
                type: 'text'
            },
            {
                name: 'Visit Email',
                id: 'visitorEmail',
                type: 'text'
            },
            {
                name: 'Visit Employee Id',
                id: 'visitorEmpNum',
                type: 'text'
            },
            {
                name: 'Visit Start',
                id: 'visitorStart',
                type: 'date'
            },
            {
                name: 'Visit End',
                id: 'visitorEnd',
                type: 'date'
            },
            {
                name: 'Visit Purpose',
                id: 'visitorPurpose',
                type: 'text'
            },
            {
                name: 'Visit Permit',
                id: 'visitorPermitIdImage',
                type: 'file'
            },
        ];
        $scope.initData = async () => {
            $scope.data = await VisitDAO.getVisit({id: $stateParams.id}).$promise;
            console.log($scope.data);
        }
    });
})()
