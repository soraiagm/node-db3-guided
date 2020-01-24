const db = require('../data/db-config.js');

// above the fold
module.exports = {
    list,
    findById,
    insert,
    update,
    remove
}

// don't forget to "return" the call to the database

// implementation details
function list() {
    // select * from users;
    return db.select('*').from('users');
    // return db('users); // does the same thing
}

function findById(id) {
    return db
        .select('*')
        .from('users')
        .where({id})
        .first()
    // select * from users where id = ?
    // return db('users') //
    // .where({ id }) //
    // .first(); //
    // return db("users").where('id', userId);

}

function insert(user) {
    return db('users')
        .insert(user)
        .then(([id]) => {
        return findById(id);
    });
}

function update(id, changes) {
    return db('users')
        .where("id", "=", id)
        .update(changes)
}

function remove(id) {
    return db('users')
    .where({ id })
    .del()
}