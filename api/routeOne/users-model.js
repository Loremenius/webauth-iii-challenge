const db = require('../../data/dbConfig');

module.exports={
    find,
    createUser,
    findByName,
    findByDepartment
    
}

function find(){
    return db('users').select("name","department");
}

function findByName(username){
    return db('users')
        .select('*')
        .where('name', username)
        .first();
}

function createUser(user){
    return db('users').insert({...user}, "*");
}

function findByDepartment(department){
    return db('users')
        .select("name","department")
        .where("department", department);
}
