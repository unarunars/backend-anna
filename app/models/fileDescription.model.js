/* *****************************************************************************
 *  Name:    Una Rúnarsdóttir
 *
 *  Description:   Define the format of File Description
 *
 *  Written:       9/12/2020
 *  Last updated:  3/1/2021
 *
 *
 **************************************************************************** */
module.exports = (sequelize, Sequelize) => {
    const FileDescription = sequelize.define('fileDescription', {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      size: {
        type: Sequelize.STRING
      },
      photoId: {
        type: Sequelize.INTEGER
      },
      mapId: {
        type: Sequelize.INTEGER
      }
    });
    
    return FileDescription;
  }