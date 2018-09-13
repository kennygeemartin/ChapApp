var joi = require('joi');
var joiToForms = require('joi-errors-for-forms').form;

var convertToForms = joiToForms();
var joiOptions = { convert: true, abortEarly: false };

exports.isValid = function(req ,res ,schema ,values){
    return joi.validate(values, schema, joiOptions, (errs, convertedValues) => {
        if(errs) return convertToForms(errs);
        return null;
      });
}  
