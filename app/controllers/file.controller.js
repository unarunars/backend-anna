var stream = require('stream');
const { Op } = require("sequelize");
const db = require('../config/db.config.js');
const File = db.files;
const Map = db.map;
const User = db.user;
const Cv = db.cv;
const ShowCover = db.showCover;
const Cover = db.cover;
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
  File.findAll({
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
    }).then((file) => {
      res.json(file);
    }).catch(err => {
      console.log(err);
      res.json({msg: 'Error', detail: err});
      res.sendStatus(500);
    });
}
exports.updateFileDescription = (req, res) => {
  console.log("update");
  console.log(req.body);
  console.log(req.params);
  FileDescription.update({
    title: req.body.title,
    description: req.body.description,
    size: req.body.size,
  },{
    where: {
      [Op.and]: [
        {mapId: req.params.mapId},
        {photoId: req.params.photoId}
      ]
    }
  }).then((files) => {
    res.json(files);

  }).catch(err => {
    res.json({msg: 'Error', detail: err});
    res.sendStatus(500);
  })
}
exports.deleteFileDescription = (req, res )=> {
  FileDescription.destroy({
    where: {
      [Op.and]: [
        {mapId: req.params.mapId},
        {photoId: req.params.photoId}
      ]
    }
  }).then(files => {
    res.json({msg:'File deleted! -> name = ' + files});
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
        {photoId: req.params.photoId}
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
exports.listAllFileDescription = (req, res) => {
  console.log("hér");
  console.log(File);
FileDescription.findAll({
    where: {
      mapId : {
        [Op.eq]: req.params.mapId
      }
    },
    attributes: ['title', 'description', 'size', 'photoId', 'mapId']
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
exports.updateMap = (req, res) => {
  console.log("update");
  console.log(req.body);
  console.log(req.params);
  Map.update({
    name: req.body.name,
    description: req.body.description
  },{
    where: {
      id : {
        [Op.eq]: req.params.mapId
      }
    }
  }).then((files) => {
    res.json(files);

  }).catch(err => {
    res.json({msg: 'Error', detail: err});
    res.sendStatus(500);
  })
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
exports.deleteMap = (req, res )=> {
  Map.destroy({
    where: {
      id : {
        [Op.eq]: req.params.mapId
      }
    }
  }).then(files => {
    res.json({msg:'File deleted! -> name = ' + files});
  }).catch(err => {
    console.log(err);
    res.json({msg: 'Error', detail: err});
    res.sendStatus(500);
  });
}
exports.createUser = (req, res) => {
  User.create({
    name: req.body.name,
    psw: req.body.psw,
  }).then(() => {
    res.json({msg:'User registered successfully! -> name = ' + req.body.name});
  }).catch(err => {
    console.log(err);
    res.json({msg: 'Error', detail: err});
    res.sendStatus(500);
  }); 
}

exports.login = (req, res)=> {
  console.log(req.body.name);
  User.findAll({
    where: {
      [Op.and]: [
        {name: req.body.name},
        {psw: req.body.psw}
      ]
    }
  }).then(files => {
      res.json(req.body.name)
    }).catch(err => {
      res.json({msg: 'Notandi fannst ekki'})
    })
}
// FERILSKRÁ - CV

exports.uploadCV = (req, res) => {
  console.log( "hallóó??");
  console.log(req.file);
  Cv.create({
    type: req.file.mimetype,
    name: req.file.originalname,
    data: req.file.buffer
  }).then(() => {
    res.json({msg:'File uploaded successfully! -> filename = ' + req.file.originalname});
  }).catch(err => {
    console.log(err);
    res.json({msg: 'Error', detail: err});
    res.sendStatus(500);
  });
}

exports.updateCV = (req, res) => {
  console.log("update");
  console.log(req.body);
  console.log(req.params);
  Cv.update({
    type: req.file.mimetype,
    name: req.file.originalname,
    data: req.file.buffer
  },{
    where: {
      id : {
        [Op.eq]: 1
      }
    }
  }).then((files) => {
    res.json({msg:'File updated successfully! -> filename = ' + req.file.originalname});

  }).catch(err => {
    res.json({msg: 'Error', detail: err});
    res.sendStatus(500);
  })
}

exports.getCv = (req, res) => {
  console.log("hér");
  console.log(File);
  console.log(req.body.mapId);
  console.log(req.params.mapId);
Cv.findAll({
    where: {
      id : {
        [Op.eq]: 1
      }
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

//Cover

exports.uploadCover = (req, res) => {
  console.log( "hallóó??");
  console.log(req.file);
  Cover.create({
    type: req.file.mimetype,
    name: req.file.originalname,
    data: req.file.buffer
  }).then(() => {
    res.json({msg:'File uploaded successfully! -> filename = ' + req.file.originalname});
  }).catch(err => {
    console.log(err);
    res.json({msg: 'Error', detail: err});
    res.sendStatus(500);
  });
}

exports.updateCover = (req, res) => {
  console.log("update");
  console.log(req.body);
  console.log(req.params);
  Cover.update({
    type: req.file.mimetype,
    name: req.file.originalname,
    data: req.file.buffer
  },{
    where: {
      id : {
        [Op.eq]: 1
      }
    }
  }).then((files) => {
    res.json({msg:'File updated successfully! -> filename = ' + req.file.originalname});

  }).catch(err => {
    res.json({msg: 'Error', detail: err});
    res.sendStatus(500);
  })
}

exports.getCover = (req, res) => {
  console.log("hér");
  console.log(File);
  console.log(req.body.mapId);
  console.log(req.params.mapId);
Cover.findAll({
    where: {
      id : {
        [Op.eq]: 1
      }
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

//SHOW COVER
exports.uploadShowCover = (req, res) => {
  console.log( "hallóó??");
  console.log(req.file);
  ShowCover.create({
    type: req.file.mimetype,
    name: req.file.originalname,
    data: req.file.buffer
  }).then(() => {
    res.json({msg:'File uploaded successfully! -> filename = ' + req.file.originalname});
  }).catch(err => {
    console.log(err);
    res.json({msg: 'Error', detail: err});
    res.sendStatus(500);
  });
}

exports.updateShowCover = (req, res) => {
  console.log("update");
  console.log(req.body);
  console.log(req.params);
  ShowCover.update({
    type: req.file.mimetype,
    name: req.file.originalname,
    data: req.file.buffer
  },{
    where: {
      id : {
        [Op.eq]: 1
      }
    }
  }).then((files) => {
    res.json({msg:'File updated successfully! -> filename = ' + req.file.originalname});

  }).catch(err => {
    res.json({msg: 'Error', detail: err});
    res.sendStatus(500);
  })
}

exports.getShowCover = (req, res) => {
  console.log("hér");
  console.log(File);
  console.log(req.body.mapId);
  console.log(req.params.mapId);
ShowCover.findAll({
    where: {
      id : {
        [Op.eq]: 1
      }
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