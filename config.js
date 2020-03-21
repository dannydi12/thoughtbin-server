module.exports = {
  PORT: process.env.PORT || 8000,
  WS_PORT: process.env.WS_PORT || 9000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL,
  TEST_DATABASE_URL: process.env.TEST_DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  CORS_ORIGIN: process.env.NODE_ENV === 'production' ? process.env.CORS_ORIGIN : 'http://localhost',
};
