var stream = require('stream');

const db = require('../config/db.config.js');
const File = db.files;
const Map = db.map;
//home
exports.home = (req, res) => {
  
    res.json({msg: 'hallooo'});
    
  }
//FILE
exports.uploadFile = (req, res) => {
  console.log(req.params.id);
  File.create({
    type: req.file.mimetype,
    name: req.file.originalname,
    data: req.file.buffer,
    mapId: 1,
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
  File.findAll({attributes: ['id', 'name', 'mapId']}).then(files => {
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
  File.findByPk(req.params.id).then(file => {
    var fileContents = Buffer.from(file.data, "base64");
    var readStream = new stream.PassThrough();
    readStream.end(fileContents);
    
    res.set('Content-disposition', 'attachment; filename=' + file.name);
    res.set('Content-Type', file.type);
 
    readStream.pipe(res);
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