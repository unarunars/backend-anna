/* *****************************************************************************
 *  Name:    Una Rúnarsdóttir
 *
 *  Description:   Define the format of User
 *
 *  Written:       9/12/2020
 *  Last updated:  3/1/2021
 *
 *
 **************************************************************************** */
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