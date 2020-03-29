const jwt = require('jsonwebtoken');

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0NDNjMDQzYS1iMDI2LTRhOTYtOGNhOS05MDNmNzk1YzQ3YzEiLCJpYXQiOjE1ODU1MTczNTJ9.V5Qeu3G82Fa0fa6yEw5MXGvJjPuIBOJ2oBfOSnQeq4w';
const USER = '443c043a-b026-4a96-8ca9-903f795c47c1';

function makeThoughts() {
  return [
    {
      id: 1,
      user_id: USER,
      created_at: new Date('2039-01-22T16:28:32.615Z').toISOString(),
      content: 'We do not merely destroy our enemies; we change them.',
    },
    {
      id: 2,
      user_id: USER,
      created_at: new Date('2022-01-22T16:28:32.615Z').toISOString(),
      content: 'War is peace. Freedom is slavery. Ignorance is strength.',
    },
    {
      id: 3,
      user_id: USER,
      created_at: new Date('2020-01-22T16:28:32.615Z').toISOString(),
      content: 'The best books... are those that tell you what you know already.',
    },
    {
      id: 4,
      user_id: USER,
      created_at: new Date('1984-01-22T16:28:32.615Z').toISOString(),
      content: 'Big Brother is Watching You.',
    },
  ];
}

function seedThoughts(db, thoughts) {
  return db.into('thoughts').insert(thoughts).then();
}

function makeToken(user) {
  return jwt.sign(
    { userId: user },
    process.env.JWT_SECRET,
    { algorithm: 'HS256' },
  );
}

module.exports = {
  seedThoughts,
  makeThoughts,
  makeToken,
  TOKEN,
  USER,
};
