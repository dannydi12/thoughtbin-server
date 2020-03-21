module.exports = {
  getAllThoughts(db, offset = 0) {
    return db
      .select('*')
      .from('thoughts')
      .orderBy('created_at', 'desc')
      .limit(20)
      .offset(offset); // front end should add based on count of new posts from socket
  },
  getThoughtById(db, id) {
    return db
      .select('*')
      .from('thoughts')
      .where({ id })
      .first();
  },
  getUserThoughts(db, userId, offset = 0) {
    return db
      .select('*')
      .from('thoughts')
      .where({ user_id: userId })
      .orderBy('created_at', 'desc')
      .limit(20)
      .offset(offset);
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
      .returning('*')
      .then((rows) => rows[0]);
  },
  deleteThought(db, id) {
    return db('thoughts')
      .where({ id })
      .del();
  },
};
