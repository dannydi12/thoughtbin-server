const thoughtsService = require('./thoughtsService');

async function checkThoughtExists(req, res, next) {
  const { id } = req.params;

  if (!Number(id)) {
    return res.status(400).send('Thought ID must be an integer');
  }

  try {
    const thought = await thoughtsService.getThoughtById(req.app.get('db'), id);

    if (!thought) {
      return res.status(404).send('That thought doesn\'t exist');
    }
    res.thought = thought;
    return next();
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  checkThoughtExists,
};
