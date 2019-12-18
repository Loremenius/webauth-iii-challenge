function validateBody(req,res,next){
    console.log('checking for valid req body for users');

    if(Object.entries(req.body).length === 0){

        res.status(400).json({ message: "no data in request body" });

        }else if (!req.body.name && !req.body.password){

        res.status(400).json({ message: "missing name/password in request object" });

        }else{
            next();
        }
    };

module.exports = validateBody;