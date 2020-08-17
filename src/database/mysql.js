const { Sequelize } = require('sequelize');


const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
<<<<<<< HEAD
  host: process.env.DB_PORT,
=======
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
>>>>>>> c23c618b84c900a9b7cfc5190d742e30741e5341
  dialect: process.env.DB_CONNECTION /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});
async function test(){
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
<<<<<<< HEAD

module.exports  = {sequelize, test}
=======
test()
module.exports  = {sequelize, test}
>>>>>>> c23c618b84c900a9b7cfc5190d742e30741e5341
