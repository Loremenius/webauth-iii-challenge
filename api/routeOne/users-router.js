const express = require('express');

const db = require('./users-model');

const router = express.Router();

const validateBody = require('../middleware/UserValidateBody');
const validateToken = require('../middleware/verifyToken');

const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

router.post('/register',(req,res)=>{
    req.body.password = bcrypt.hashSync(req.body.password,8);
    db.createUser(req.body)
        .then(data=>{
            res.status(201).json(data);
        })
        .catch(error=>{
            console.log(error);
            res.status(500).json({
                error:error,
                errorMessage: 'error creating user'
            });
        })
});

router.post('/login', validateBody,(req,res)=>{
    db.findByName(req.body.name)
        .then(data=>{
            if(data && bcrypt.compareSync(req.body.password, data.password)){
                const token = signToken(data);
                res.status(200).json({
                    message:`Welcome ${data.name}`,
                    token:token
            });
            }else{
                res.status(401).json({message:'Invalid Credentials'});
            }
        })
        .catch(error=>{
            console.log(error);
            res.status(500).json({
                error:error,
                errorMessage: 'error logging in  user'
            });
        })
});

router.get('/users', validateToken,(req,res)=>{
    db.find()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(error=>{
            console.log(error);
            res.status(500).json({
                error:error,
                errorMessage: 'error getting users'
            });
        })
});

router.get('/users/department', validateToken,(req,res)=>{
    db.findByDepartment(req.token.role)
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(error=>{
            console.log(error);
            res.status(500).json({
                error:error,
                errorMessage: 'error getting users'
            });
        })
});


function signToken(user) {
  const payload = {
    username: user.name,
    role: user.department, 
  };

  const secret = process.env.JWT_SECRET || "Death Star Plans Secured";

  const options = {
    expiresIn: "1h",
  };

  return jwt.sign(payload, secret, options); 
}

module.exports = router;