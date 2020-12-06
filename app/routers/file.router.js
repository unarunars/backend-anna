let express = require('express');
let router = express.Router();
let upload = require('../config/multer.config.js');
 
const fileWorker = require('../controllers/file.controller.js');

router.get('/', fileWorker.home);
//FILE - myndir 

//upploada mynd í möppu nr :id
router.post('/api/file/upload/:id', upload.single("file"), fileWorker.uploadFile);

//mapId til að vita hvað það eru margir? 
router.get('/api/file/info/:mapId', fileWorker.listAllFiles);
 
router.get('/api/file/:mapId/:id', fileWorker.downloadFile);

router.delete('/api/file/:mapId/:id', fileWorker.deleteFile)

//fileDescription - sem er hengt við hverja mynd

router.post('/api/file/description/upload', upload.single("file"), fileWorker.setFileDescription)
 
router.get('/api/file/description/:mapId/:photoId', fileWorker.getFileDescription);

router.get('/api/files/getAllDescription/:mapId', fileWorker.listAllFileDescription);


//MAP - yfirmappan, í einnu möpppu er myndir(file) af einni sýningu(map)

router.post('/api/map/upload', upload.single("file"), fileWorker.uploadMap)

router.get('/api/map/info', fileWorker.listAllMaps);

router.delete('/api/map/:mapId', fileWorker.deleteMap)

//USER 

router.post('/api/users',  upload.single("file"), fileWorker.createUser);

router.post('/api/login', upload.single("file"), fileWorker.login);

//CV

router.post('/api/cv/upload', upload.single("file"),upload.single("file"), fileWorker.uploadCV);

router.put('/api/cv/update', upload.single("file"), upload.single("file"), fileWorker.updateCV);

router.get('/api/cv', fileWorker.getCv);

// COVER 

router.post('/api/cover/upload', upload.single("file"),upload.single("file"), fileWorker.uploadCover);

router.put('/api/cover/update', upload.single("file"), upload.single("file"), fileWorker.updateCover);

router.get('/api/cover', fileWorker.getCover);

// SHOW COVER

router.post('/api/showcover/upload', upload.single("file"),upload.single("file"), fileWorker.uploadShowCover);

router.put('/api/showcover/update', upload.single("file"), upload.single("file"), fileWorker.updateShowCover);

router.get('/api/showcover', fileWorker.getShowCover);

module.exports = router;