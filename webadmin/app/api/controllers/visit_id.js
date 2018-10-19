//common utilities
var util = require('util');
var mongoose = require('mongoose');
var visit = require('./visit.model');

//export functions required by swagger

module.exports = {
    getVisitById: getVisitById,
    deleteVisitById: deleteVisitById,
    editVisitById: editVisitById
};

function getVisitById(req, res) {
    console.log(req.swagger.params.id.value);

    visit.findById(mongoose.Types.ObjectId(req.swagger.params.id.value)).exec((err, visitor) => {
        if(err){
            throw err;
        }
        // console.log(visitor);
        let PermittedVisitor = {
            id: visitor._id,
            visitorInfo: {
                visitorName: visitor.visitorName,
                visitorTitle: visitor.visitorTitle,
                visitorCompany: visitor.visitorCompany,
                visitorContact: visitor.visitorContact,
                visitorEmail: visitor.visitorEmail,
                visitorEmpNum: visitor.visitorEmpNum,
                visitorStart: visitor.visitorStart,
                visitorEnd: visitor.visitorEnd,
                visitorPurpose: visitor.visitorPurpose,
                visitorPermitIdImage: String(visitor.visitorPermitIdImage)
            }
        }
        // console.log(PermittedVisitor);
        res.send(PermittedVisitor);
    });

}

function deleteVisitById(req, res) {
    console.log(req.swagger.params.id.value);

    visit.findByIdAndDelete(mongoose.Types.ObjectId(req.swagger.params.id.value)).exec((err, visitor) => {
        if(err){
            res.status(400).json({message: err});
            throw err;
        }
        else {
            res.status(200).json({message: 'Successfully deleted'});
        }
    });

}

function editVisitById(req, res) {
    console.log(req.swagger.params.id.value);

    visit.findById(mongoose.Types.ObjectId(req.swagger.params.id.value), (err, visitor) => {
        if(err){
            res.status(400).json({message: err});
            throw err;
        }
        else {
            console.log('editing...');
            console.log(visitor.visitorCompany);
            console.log(req.body.visitorCompany);
            visitor.set(req.body);
            visitor.save((err, editedVisit) => {
                if(err) {
                    res.status(400).json({message: err});
                    throw err;
                }
                console.log(editedVisit);
            })
            res.status(200).json({message: 'Successfully edited'});
        }
    });

}
