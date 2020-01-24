const db = require('../data/db-config.js');

// above the fold
module.exports = {
    list,
    findById,
}

// don't forget to "return" the call to the database

// implementation details
function list() {
    /* select * 
       from posts as p
       join users as u
       on p.user_id = u.id
    */
   return db("posts as p")
   .join('users as u', 'p.user_id', "u.id")
   .select('p.id as postId', 'p.contents', 'u.username as postedBy')

}

function findById(id) {
    // return db
    //     .select('*')
    //     .from('posts')
    //     .where({id})
    //     .first()
    // select * from users where id = ?
    return db('posts') //
        .where({ id }) //
        .first(); //
    // return db("users").where('id', userId);

}

