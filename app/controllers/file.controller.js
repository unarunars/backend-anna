var stream = require('stream');
 
const db = require('../config/db.config.js');
const File = db.files;
 
exports.uploadFile = (req, res) => {
  File.create({
    type: req.file.mimetype,
    name: req.file.originalname,
    data: req.file.buffer
  }).then(() => {
    res.json({msg:'File uploaded successfully! -> filename = ' + req.file.originalname});
  }).catch(err => {
    console.log(err);
    res.json({msg: 'Error', detail: err});
  });
}
 
exports.listAllFiles = (req, res) => {
    console.log("hér");
    console.log(File);
  File.findAll({attributes: ['id', 'name']}).then(files => {
    res.json(files);
  }).catch(err => {
    console.log(err);
    res.json({msg: 'Error', detail: err});
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
  });
}