/* *****************************************************************************
 *  Name:    Una Rúnarsdóttir
 *
 *  Description:   Define the format of Map
 *
 *  Written:       9/12/2020
 *  Last updated:  3/1/2021
 *
 *
 **************************************************************************** */
module.exports = (sequelize, Sequelize) => {
    const Map = sequelize.define('map', {
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      }
    });
    
    return Map;
  }