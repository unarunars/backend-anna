module.exports = (sequelize, Sequelize) => {
    const Showcover = sequelize.define('showcover', {
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
    
    return Showcover;
  }