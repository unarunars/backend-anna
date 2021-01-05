/* *****************************************************************************
 *  Name:    Una Rúnarsdóttir
 *
 *  Description:   Define the format of File
 *
 *  Written:       9/12/2020
 *  Last updated:  3/1/2021
 *
 *
 **************************************************************************** */
module.exports = (sequelize, Sequelize) => {
    const File = sequelize.define('file', {
      type: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      mapId: {
        type: Sequelize.STRING
      },
      data: {
        type: Sequelize.BLOB('long')
      }
    });
    
    return File;
  }