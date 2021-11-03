const db = require("../../data/db-config.js");

module.exports = {
  findPosts,
  find,
  findById,
  add,
  update,
  remove,
};

async function findPosts(user_id) {
  const rows = await db("posts as p")
    .join("users as u", "p.user_id", "u.id")
    .select("p.id as post_id", "username", "contents")
    .where('u.id', '=', user_id)
  return rows;
  /*
    Implement so it resolves this structure:
   select
       p.id as post_id, p.contents, u.username 
    from posts as p
    join users as u
      on p.user_id = u.id
    [
      {
          "post_id": 10,
          "contents": "Trusting everyone is...",
          "username": "seneca"
      },
      etc
    ]
  */
}

async function find() {
  const rows = await db("users as u")//users is the left table
  .leftJoin('posts as p', 'u.id', 'p.user_id')
  .select('u.id as user_id', 'u.username')
  .count('p.id as post_count')
  .groupBy('u.id')
  return rows



//   select u.id, u.username, count(p.contents)
// from users as u
// left join posts as p
// on p.user_id = u.id
// group by u.id
//   /*
    // Improve so it resolves this structure:

    // [
    //     {
    //         "user_id": 1,
    //         "username": "lao_tzu",
    //         "post_count": 6
    //     },
    //     {
    //         "user_id": 2,
    //         "username": "socrates",
    //         "post_count": 3
    //     },
    //     etc
    // ]
  
}

function findById(id) {
  return db("users").where({ id }).first();
  /*
    Improve so it resolves this structure:

    {
      "user_id": 2,
      "username": "socrates"
      "posts": [
        {
          "post_id": 7,
          "contents": "Beware of the barrenness of a busy life."
        },
        etc
      ]
    }
  */
}

function add(user) {
  // returns an array with new user id
  return db("users").insert(user);
}

function update(changes, id) {
  return db("users")
    .where({ id })
    .update(changes)
    .then((count) => {
      return findById(id);
    });
}

function remove(id) {
  // returns removed count
  return db("users").where({ id }).del();
}
