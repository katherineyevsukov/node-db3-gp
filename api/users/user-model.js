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

function find() {
  return db("users");
  /*
    Improve so it resolves this structure:

    [
        {
            "user_id": 1,
            "username": "lao_tzu",
            "post_count": 6
        },
        {
            "user_id": 2,
            "username": "socrates",
            "post_count": 3
        },
        etc
    ]
  */
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
