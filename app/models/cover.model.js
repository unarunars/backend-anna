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