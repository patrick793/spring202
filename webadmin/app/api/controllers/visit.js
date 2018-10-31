//common utilities
var util = require('util');
var mongoose = require('mongoose');
var visit = require('./visit.model');
const fs = require('fs');

//export functions required by swagger

module.exports = {
    getVisit : getVisit,
    addVisit : addVisit,
    getLatest: getLatest,
};

function getLatest(req, res) {
    let query = {}
    let options = {
        sort: {
            date_created: -1
        },
        skip: 0,
        limit: 1
    };
    visit.find(query, [], options).exec((err, visit_list) => {

        let result = visit_list.map(x => {
            const PermittedVisitor = {
                id : x._id,
                visitorInfo : {
                    visitorName: x.visitorName,
                    visitorTitle: x.visitorTitle,
                    visitorCompany: x.visitorCompany,
                    visitorContact: x.visitorContact,
                    visitorEmail: x.visitorEmail,
                    visitorEmpNum: x.visitorEmpNum,
                    visitorStart: x.visitorStart,
                    visitorEnd: x.visitorEnd,
                    visitorPurpose: x.visitorPurpose,
                    visitorPermitIdImage: String(x.visitorPermitIdImage)
                }
            };

            return PermittedVisitor;
        });
        console.log('GET LATEST: Got ' + JSON.stringify(result).length + ' bytes.');
        res.json(result[0]);
    });
}

function getVisit(req, res) {
    let query = {}
    let options = {
	sort: {
		date_created: -1,
	},
        skip: 0,
        limit: 0
    };
    visit.find(query, [], options).exec((err, visit_list) => {

        let result = visit_list.map(x => {
            const PermittedVisitor = {
                id : x._id,
                visitorInfo : {
                    visitorName: x.visitorName,
                    visitorTitle: x.visitorTitle,
                    visitorCompany: x.visitorCompany,
                    visitorContact: x.visitorContact,
                    visitorEmail: x.visitorEmail,
                    visitorEmpNum: x.visitorEmpNum,
                    visitorStart: x.visitorStart,
                    visitorEnd: x.visitorEnd,
                    visitorPurpose: x.visitorPurpose
                }
            };

            return PermittedVisitor;
        });
        console.log('LIST VISITS: Got ' + JSON.stringify(result).length + ' bytes.');
        // console.log(result);
        res.json(result);
    });
}

function addVisit(req, res) {
    console.log("Add Visit");
    let newVisitor = req.body;
    if(req.body.visitorId){
        newVisitor['_id'] = req.body.visitorId,
        delete newVisitor['visitorId'];
    }
    visit(newVisitor).save(function (err) {
        if(err) {
            console.log(err);
            res.status(400).json({message: "Bad Request"});
        }
        else {
            res.status(200).json({message: "Successfully Added!"});
        }
    });
}
