/*const env = {
    database: 'dadjiqrch0cedo',
    username: 'qihxgvhdykodls',
    password: '810cd7381f8dc302e29acd17a5bb829699bfc791ae07692d49d205f7c479bb7e',
    host: 'ec2-54-246-87-132.eu-west-1.compute.amazonaws.com',
    dialect: 'postgres',
    port: 5423,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    
  };*/
  const env = {
    database: 'socratica',
    username: 'postgres',
    password: 'Vera85hanna',
    host: 'localhost',
    dialect: 'postgres',
    port: 5423,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
   //DATABASE_URL=postgres://postgres:Vera85hanna@localhost:5432/socratica
   //postgres://qihxgvhdykodls:810cd7381f8dc302e29acd17a5bb829699bfc791ae07692d49d205f7c479bb7e@ec2-54-246-87-132.eu-west-1.compute.amazonaws.com:5432/dadjiqrch0cedo
  module.exports = env;