var repo = require('../Repositories/userRepo');
var baseService = require('../Services/baseService'); //contains the content of module.exports
var joiSchema = require('../JoiSchema/userSchema');
var validator = require('../JoiSchema/validator');


function userService(joiSchema){
    //must be added for population purposes
    this.structure = '-__v -password';
    this.populateA = ''; // {path: 'categories', select: '-_id -__v'}
    this.populateB = ''; //{path: 'userComments', select:'-user -__v'};
    
    //needed to define the joiSchema
    this.joiSchema = joiSchema;
}
userService.prototype = baseService(repo);

userService.prototype.createAccount = function(req, res, data){
    var valid = validator.isValid(req, res, this.joiSchema, data);
    if (valid != null){
        res.json(valid);
    }else{
        repo.createAccount(data, function(err, userAccount){
            try{
                if(err) res.status(500).json({err: err, message: "Something went wrong, please try again"});
                else{
                    userAccount.save();
                    res.json({message : 'Your account  has been created successfully'});
                    // sendMail(req, res, data.email, data.username);
                    // 
                    // res.json({
                    //     sub: userAccount, 
                    //     message: 'Your account has been created successfully',
                    //   }),
                    // });
                };
            }catch(exception){
                res.json({error:exception});
            }
        });
    }
}

module.exports = new userService(joiSchema);
