"use strict";

(() => {
    var app = angular.module('app');
    app.controller('VisitEditController', (VisitDAO, $state, $stateParams, $scope, $filter) => {
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

        $scope.initData = async () => {
            if(!$stateParams.data) {
                // console.log('get from DB');
                $scope.data = await VisitDAO.getVisit({id: $stateParams.id}).$promise;
            }
            else {
                // console.log('get from local');
                $scope.data = $stateParams.data;
            }

            $scope.formData = $scope.data.visitorInfo;
            $scope.formData.visitorStart = new Date($scope.data.visitorInfo.visitorStart);
            $scope.formData.visitorEnd = new Date($scope.data.visitorInfo.visitorEnd);
        }

        $scope.createVisit = async () => {
            // console.log("submitting");
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
            // console.log(visitorInfo);
            try {
                let response = await VisitDAO.editVisit({id: $stateParams.id}, visitorInfo).$promise;
            }
            catch (err) {
                // console.log(err);
            }

            $state.go('visit-detail', {id: $stateParams.id});

            // console.log(response);
        }
    });
})()
