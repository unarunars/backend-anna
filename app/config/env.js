const env = {
    database: 'socratica',
    username: 'postgres',
    password: 'Vera85hanna',
    host: 'localhost',
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
   //DATABASE_URL=postgres://postgres:Vera85hanna@localhost:5432/socratica
  module.exports = env;