module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user', {
      name: {
        type: Sequelize.STRING
      },
      psw: {
        type: Sequelize.STRING
      }
    });
    return User;
  }