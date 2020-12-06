const env = require('./env.js');
 
const Sequelize = require('sequelize');

const sequelize = new Sequelize(`${env.database}`, `${env.username}`, `${env.password}`, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: 0,
 
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
 
const db = {};
 
db.Sequelize = Sequelize;
db.sequelize = sequelize;
 
db.files = require('../models/file.model.js')(sequelize, Sequelize);
db.map = require('../models/map.model.js')(sequelize, Sequelize);
db.fileDescription = require('../models/fileDescription.model.js')(sequelize, Sequelize);
db.user = require('../models/user.model.js')(sequelize, Sequelize);
db.cv = require('../models/cv.model.js')(sequelize, Sequelize);
db.showCover  = require('../models/showCover.model.js')(sequelize, Sequelize);
db.cover  = require('../models/cover.model.js')(sequelize, Sequelize);

db.map.hasMany(db.files, {as: "File"});
db.files.belongsTo(db.map, {
  foreignKey: "mapId",
  as: "Map"
})

module.exports = db;