var stream = require('stream');
const { Op } = require("sequelize");
const db = require('../config/db.config.js');
const File = db.files;
const Map = db.map;
const FileDescription = db.fileDescription;

//home
exports.home = (req, res) => {
  
    res.json({msg: 'hallooo'});
    
  }
//FILE
exports.uploadFile = (req, res) => {
  console.log(req.params.id, "hallóó??");
  File.create({
    type: req.file.mimetype,
    name: req.file.originalname,
    data: req.file.buffer,
    mapId: req.params.id,
   // description: req.description,
  }).then(() => {
    res.json({msg:'File uploaded successfully! -> filename = ' + req.file.mimetype});
  }).catch(err => {
    console.log(err);
    res.json({msg: 'Error', detail: err});
    res.sendStatus(500);
  });
}

exports.listAllFiles = (req, res) => {
    console.log("hér");
    console.log(File);
    console.log(req.body.mapId);
    console.log(req.params.mapId);
  File.findAll({
      where: {
        mapId : {
          [Op.eq]: req.params.mapId
        }
      },
      attributes: ['id', 'name', 'mapId']
  }).then(files => {
    res.json(files);
  }).catch(err => {
    console.log(err);
    res.json({msg: 'Error', detail: err});
    res.sendStatus(500);
  });
}
 
exports.downloadFile = (req, res) => {
    console.log("#########");
    console.log(req.params.id);
    console.log(File);
  const temp = File.findAll({
    where: {
      [Op.and]: [
        {mapId: req.params.mapId},
        {id: req.params.id}
      ]
    }
  }).then(file => {
      var fileContents = Buffer.from(file[0].data, "base64");
      var readStream = new stream.PassThrough();
      readStream.end(fileContents);
      res.set('Content-disposition', 'attachment; filename=' + file[0].name);
      res.set('Content-Type', file[0].type);
      readStream.pipe(res);
 
  }).catch(err => {
    console.log(err);
    res.json({msg: 'Error', detail: err});
    res.sendStatus(500);
  });
}
exports.deleteFile = (req, res ) => {
  File.destroy({
    where: {
      [Op.and]: [
        {mapId: req.params.mapId},
        {id: req.params.id}
      ]
    }
  }).then(files => {
    res.json({msg:'File deleted! -> name = ' + req.body.name});
  }).catch(err => {
    console.log(err);
    res.json({msg: 'Error', detail: err});
    res.sendStatus(500);
  });
}
//FILE DESCRIPTION
exports.setFileDescription = (req, res) => {
  FileDescription.create({
    title: req.body.title,
    description: req.body.description,
    size: req.body.size,
    photoId: req.body.photoId,
    mapId: req.body.mapId,
    }).then(() => {
      res.json({msg:'Filedescription uploaded successfully! -> name = ' + req.body.title});
    }).catch(err => {
      console.log(err);
      res.json({msg: 'Error', detail: err});
      res.sendStatus(500);
    });
}
exports.getFileDescription = (req, res) => {
  FileDescription.findAll({
    where: {
      [Op.and]: [
        {mapId: req.params.mapId},
        {id: req.params.id}
      ]
    }
  }).then(files => {
    res.json(files);
  }).catch(err => {
    console.log(err);
    res.json({msg: 'Error', detail: err});
    res.sendStatus(500);
  });
}
//MAP
exports.uploadMap = (req, res) => {
  console.log(req.body)
  Map.create({
    name: req.body.name,
    description: req.body.description,
    }).then(() => {
      res.json({msg:'Map uploaded successfully! -> name = ' + req.body.name});
    }).catch(err => {
      console.log(err);
      res.json({msg: 'Error', detail: err});
      res.sendStatus(500);
    });
}
exports.listAllMaps = (req, res) => {
Map.findAll({attributes: ['id', 'name', 'description']}).then(files => {
  res.json(files);
}).catch(err => {
  console.log(err);
  res.json({msg: 'Error', detail: err});
  res.sendStatus(500);
});
}
