let express = require('express');
let router = express.Router();
let upload = require('../config/multer.config.js');
 
const fileWorker = require('../controllers/file.controller.js');

router.get('/', fileWorker.home);
//FILE - myndir 

//upploada mynd í möppu nr :id
router.post('/api/file/upload/:id', upload.single("file"), fileWorker.uploadFile);

//id er mapId til að vita hvað það eru margir? 
router.get('/api/file/info/:mapId', fileWorker.listAllFiles);
 
router.get('/api/file/:mapId/:id', fileWorker.downloadFile);

//router.delete('/api/file/:id', fileWorker.deleteFile)
 
//MAP - yfirmappan, í einnu möpppu er myndir(file) af einni sýningu(map)

router.post('/api/map/upload', upload.single("file"), fileWorker.uploadMap)

router.get('/api/map/info', fileWorker.listAllMaps);


module.exports = router;