
/* *****************************************************************************
 *  Name:    Una Rúnarsdóttir
 *
 *  Description:   Define the format of Cover
 *
 *  Written:       9/12/2020
 *  Last updated:  3/1/2021
 *
 *
 **************************************************************************** */
module.exports = (sequelize, Sequelize) => {
    const Cover = sequelize.define('cover', {
      type: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      data: {
        type: Sequelize.BLOB('long')
      }
    });
    
    return Cover;
  }