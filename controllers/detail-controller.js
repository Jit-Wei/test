const data=require('../models/deployment-model')
const deploymentKeys = ['name','radio','food','surprises','roving','staffnumber']

exports.testGet=(req,res) => {
    res.status(200).send(`test page`)
};
exports.getData= async (req,res)=>{
    try {
    let deploymentData= await data.getAllDeploymentData();
    await console.log(deploymentData);
    if (deploymentData.length>0) {
        for (deployment of deploymentData) {
        // let deploymentKeys = Object.keys(deployment);
        };
    res.render('deployment_render',{deploymentData,deploymentKeys});
    } else {
        return res.send(`no data`);
    };
    } catch (error) {
        res.send(error)
    };        
};

exports.editGet=  async (req,res)=>{
    let deploymentData= await data.getAllDeploymentData();
    console.log(deploymentData)
    const deploymentKeys = Object.keys(deploymentData[0])
    console.log(deploymentKeys)
    res.render('edit_deployment_detail',{deploymentData,deploymentKeys});
};
exports.addGet= (req,res)=>{
    const name="";
    const radio=false;
    const roving = false;
    const surprises = false;
    const food = false;
    const staffnumber = false;
    const errors=[];
    
    res.render('add-deployment',{name,radio,roving,surprises,food,staffnumber,errors})
};
exports.addPost= async (req,res)=>{
    const name = req.body.name;
    const radio = req.body.radio ? true:false;
    const roving = req.body.roving ? true:false;
    const surprises = req.body.surprises ? true:false;
    const food = req.body.food ? true:false;
    const staffnumber = isNaN(req.body.staffnumber) ? null : Number(req.body.staffnumber) ;
    const errors=[];
    if (!name || !staffnumber ||isNaN(staffnumber) ||staffnumber<2) {
        if (!name) {
            errors.push('Name cannot be blank');
            console.error("Blank name entered by user")

            
        }
        if (!staffnumber|| isNaN(staffnumber) ||staffnumber<2) {
            errors.push("Number of Lionhearters deployed per day cannot be blank");
            console.error('Invalid Lionhearter deployment number entered by user');
            
        }
        return res.render('add-deployment',{name,radio,roving,surprises,food,staffnumber,errors})

        
    };
    const newDeployment = {name,radio,roving,surprises,food,staffnumber};
    // console.log(typeof(newDeployment.staffnumber))
    // console.log(newDeployment);
    try {
        const status = await data.writeInNewDeployment(newDeployment);
        // if (status==true){
        console.log('New Deployment Added');
        return res.render('success')
        // } else {
        // console.error('uncaught write error' + ' '+status)
        // res.status(500).send(`Internal Server Error, cannot write new deployment, contact support with screenshot`+ status)
        // }
        

        
            
        
    } catch (error) {
        console.error('write error 1' + ' '+error)
        res.status(500).send(`Internal Server Error, cannot write new deployment, contact support with screenshot`+ error)
        // res.send(`error in writing`)
    }
    // res.render('add-deployment',{name,radio,roving,surprises,food,staffnumber,errors})

};
module.exports
