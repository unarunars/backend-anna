module.exports = (sequelize, Sequelize) => {
    const Cv = sequelize.define('cv', {
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
    
    return Cv;
  }