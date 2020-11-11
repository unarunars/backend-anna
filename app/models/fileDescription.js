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
      }
    });
    
    return FileDescription;
  }