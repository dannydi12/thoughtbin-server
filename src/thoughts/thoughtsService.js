module.exports = {
  getAllThoughts(db) {
    return db.select('*').from('thoughts');
  },
  getUserThoughts(db, userId) {
    return db // userId will be derived from a function that reads auth header for identity
      .select('*')
      .from('thoughts')
      .where({ user_id: userId });
  },
  createThought(db, thought) {
    return db('thoughts')
      .insert(thought)
      .returning('*')
      .then((rows) => rows[0]);
  },
  updateThought(db, id, content) {
    return db('thoughts')
      .where({ id })
      .update({ content })
      .returning('*');
  },
};
