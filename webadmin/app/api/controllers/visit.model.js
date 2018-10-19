const mongoose = require('mongoose');

const SchemaTypes = mongoose.SchemaTypes;

// This schema is a copy of the schema for the Play Galaxy Web Admin
const VisitSchema = new mongoose.Schema({
  visitorName: {
    type: SchemaTypes.String,
    index: true,
    required: true,
  },
  visitorTitle: {
    type: SchemaTypes.String,
    index: true,
    required: false,
  },
  visitorCompany: {
    type: SchemaTypes.String,
    index: true,
    required: false,
  },
  visitorStart: {
    type: SchemaTypes.String,
    index: true,
    required: true
  },
  visitorEnd: {
    type: SchemaTypes.String,
    index: true,
    required: true
  },
  visitorContact: {
    type: SchemaTypes.String,
    index: true,
    required: true
  },
  visitorEmpNum: {
    type: SchemaTypes.String,
    index: true,
    required: false
  },
  visitorEmail: {
    type: SchemaTypes.String,
    index: true,
    required: false
  },
  visitorPurpose: {
    type: SchemaTypes.String,
    required: true
  },
  visitorPermitIdImage: {
    type: SchemaTypes.String,
    required: false
  },
  date_created: {
    type: SchemaTypes.Date,
    default: () => new Date(),
  },
  date_modified: {
    type: SchemaTypes.Date,
    default: () => new Date(),
  },
}, { collection: 'visit' });

module.exports = mongoose.model('visit', VisitSchema);
