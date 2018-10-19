"use strict";

(() => {
    var app = angular.module('app');
    app.controller('VisitSearchController', (VisitDAO, $state, $scope, $filter) => {
        //set navbar using JQuery
        window.jQuery( ".nav-item" ).each( function() {
            window.jQuery( this ).removeClass( "active" );
        });
        window.jQuery('#nav_add').addClass("active");

        console.log("VisitAddController");

        let vm = this;
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
        $scope.curStartDate = new Date();
        $scope.curEndDate = new Date();
        $scope.formData = {
            "visitorName": "",
            "visitorTitle": "",
            "visitorCompany": "",
            "visitorContact": "",
            "visitorEmail": "",
            "visitorEmpNum": "",
            "visitorStart": new Date(),
            "visitorEnd": new Date(),
            "visitorPurpose": "",
            "visitorPermitIdImage": ""
        };

        $scope.createVisit = async () => {
            console.log("submitting");
            let visitorInfo = {
                "visitorName": $scope.formData.visitorName,
                "visitorTitle": $scope.formData.visitorTitle,
                "visitorCompany": $scope.formData.visitorCompany,
                "visitorContact": $scope.formData.visitorContact,
                "visitorEmail": $scope.formData.visitorEmail,
                "visitorEmpNum": $scope.formData.visitorEmpNum,
                "visitorStart": $filter('date')($scope.formData.visitorStart, 'yyyy-MM-dd'),
                "visitorEnd": $filter('date')($scope.formData.visitorEnd, 'yyyy-MM-dd'),
                "visitorPurpose": $scope.formData.visitorPurpose,
                "visitorPermitIdImage": $scope.formData.visitorPermitIdImage
            };
            console.log(visitorInfo);
            try {
                let response = await VisitDAO.createVisit(visitorInfo).$promise;
            }
            catch (err) {
                console.err(err);
            }

            $state.go('visit');

            // console.log(response);
        }
    });
})()
