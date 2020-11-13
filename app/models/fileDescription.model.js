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