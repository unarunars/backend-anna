
/* *****************************************************************************
 *  Name:    Una Rúnarsdóttir
 *
 *  Description:   All the functions that talk to the database and change it. 
 *                 These function are then called in the endpoints in router.
 *
 *  Written:       9/12/2020
 *  Last updated:  3/1/2021
 *
 *
 **************************************************************************** */
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
    res.json({msg: 'success'});
  }
/*
* FILE 
* create a file
*/
exports.uploadFile = (req, res) => {
  File.create({
    type: req.file.mimetype,
    name: req.file.originalname,
    data: req.file.buffer,
    mapId: req.params.id,
  }).then(() => {
    res.json({msg:'File uploaded successfully! -> filename = ' + req.file.mimetype});
  }).catch(err => {
    console.log(err);
    res.json({msg: 'Error', detail: err});
    res.sendStatus(500);
  });
}
/*
* FILE 
* list all files with the map id from the query string
*/
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
/*
* FILE 
* download file where the mapId and Id
* is the same as in the query string
*/
exports.downloadFile = (req, res) => {
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
/*
* FILE 
* delete file where the mapId and Id
* is the same as in the query string
*/
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
/*
* FILE DESCRIPTION
* create file description 
*/
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
/*
* FILE DESCRIPTION
* update file description where the mapId and Id
* is the same as in the query string
*/
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
/*
* FILE DESCRIPTION
* delete file description where the mapId and Id
* is the same as in the query string
*/
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
/*
* FILE DESCRIPTION
* get file description where the mapId and Id
* is the same as in the query string
*/
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
/*
* FILE DESCRIPTION
* get all file description where the mapId
* is the same as in the query string
*/
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
/*
* MAP
* create map
*/
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
/*
* MAP
* create map where the mapId
* is the same as in the query string
*/
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
/*
* MAP
* get all maps
*/
exports.listAllMaps = (req, res) => {
  Map.findAll({attributes: ['id', 'name', 'description']}).then(files => {
    res.json(files);
  }).catch(err => {
    console.log(err);
    res.json({msg: 'Error', detail: err});
    res.sendStatus(500);
  });
}
/*
* MAP
* delete map where the mapId
* is the same as in the query string
*/
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
/*
* USER
* create user 
*/
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
/*
* USER
* finds the user with the same name and psw
* as in the query string. 
* Otherwise user isn't registered
*/
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
/*
* CV
* create cv
*/
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
/*
* CV
* updates cv
*/
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
/*
* CV
* get cv
*/
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
/*
* COVER
* create cover
*/
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
/*
* COVER
* update cover
*/
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
/*
* COVER
* get cover
*/
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
/*
* SHOW COVER
* create show cover
*/
exports.uploadShowCover = (req, res) => {
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
/*
* SHOW COVER
* update show cover
*/
exports.updateShowCover = (req, res) => {
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
/*
* SHOW COVER
* get show cover
*/
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