const mongoose = require('mongoose');

const deploymentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'A deployment must have a name'],
        unique: true
    },
    radio:{
        type:Boolean,
        default:false
    },
    food:{
        type:Boolean,
        default:false
    },
    surprises:{
        type:Boolean,
        default:false
    },
    roving:{
        type:Boolean,
        default:false
    },
    staffnumber:{
        type:Number,
        required:[true,'Number of Assigned first aiders needed']
    }
})
const Deployment = mongoose.model('Deployment',deploymentSchema,'deployments')

// get all deployments

exports.getAllDeploymentData = function () {
    return Deployment.find();
};

exports.writeInNewDeployment = function (newDeployment) {
    return Deployment.create(newDeployment);
};



module.exports