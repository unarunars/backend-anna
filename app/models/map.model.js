module.exports = (sequelize, Sequelize) => {
    const Map = sequelize.define('map', {
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      }
    });
    //const 
    
    return Map;
  }