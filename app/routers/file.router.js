let express = require('express');
let router = express.Router();
let upload = require('../config/multer.config.js');
 
const fileWorker = require('../controllers/file.controller.js');
/*
* get home 
*/
router.get('/', fileWorker.home);
/*
* FILE pictures
* post photo in map with selected mapId
*/
router.post('/api/file/upload/:id', upload.single("file"), fileWorker.uploadFile);
/*
* FILE pictures
* get all photos in map with selected mapId
*/
router.get('/api/file/info/:mapId', fileWorker.listAllFiles);
/*
* FILE pictures
* post photo with selected id in map with selected mapId
*/
router.get('/api/file/:mapId/:id', fileWorker.downloadFile);
/*
* FILE pictures
* delete photo with selected id in map with selected mapId
*/
router.delete('/api/file/:mapId/:id', fileWorker.deleteFile)
/*
* FILE DESCRIPTION - one to one to every image
* creates photo description
*/
router.post('/api/file/description/upload', upload.single("file"), fileWorker.setFileDescription)
 /*
* FILE DESCRIPTION - one to one to every image
* gets photo description with selected photoId and mapId
*/
router.get('/api/file/description/:mapId/:photoId', fileWorker.getFileDescription);
/*
* FILE DESCRIPTION - one to one to every image
* get all photo descriptions with selected mapId
*/
router.get('/api/files/getAllDescription/:mapId', fileWorker.listAllFileDescription);
/*
* FILE DESCRIPTION - one to one to every image
* updates photo description with selected photoId and mapId
*/
router.put('/api/files/update/:mapId/:photoId', fileWorker.updateFileDescription)
/*
* FILE DESCRIPTION - one to one to every image
* deletes photo description with selected photoId and mapId
*/
router.delete('/api/file/descriptions/delete/:mapId/:photoId', fileWorker.deleteFileDescription)
/*
* MAP - map with shows and every show has many photos
* create map
*/
router.post('/api/map/upload', upload.single("file"), fileWorker.uploadMap)
/*
* MAP - map with shows and every show has many photos
* get all maps in array
*/
router.get('/api/map/info', fileWorker.listAllMaps);
/*
* MAP - map with shows and every show has many photos
* delete map with the mapId
*/
router.delete('/api/map/:mapId', fileWorker.deleteMap)
/*
* MAP - map with shows and every show has many photos
* update map with the mapId
*/
router.put('/api/update/map/:mapId', fileWorker.updateMap)
/*
* USER
* create user
*/
router.post('/api/users',  upload.single("file"), fileWorker.createUser);
/*
* USER
* post user
*/
router.post('/api/login', upload.single("file"), fileWorker.login);
/*
* CV
* create cv
*/
router.post('/api/cv/upload', upload.single("file"),upload.single("file"), fileWorker.uploadCV);
/*
* CV
* update cv
*/
router.put('/api/cv/update', upload.single("file"), upload.single("file"), fileWorker.updateCV);
/*
* CV
* get cv
*/
router.get('/api/cv', fileWorker.getCv);
/*
* COVER
* upload cover photo
*/
router.post('/api/cover/upload', upload.single("file"),upload.single("file"), fileWorker.uploadCover);
/*
* COVER
* update cover photo
*/
router.put('/api/cover/update', upload.single("file"), upload.single("file"), fileWorker.updateCover);
/*
* COVER
* get cover photo
*/
router.get('/api/cover', fileWorker.getCover);
/*
* SHOW COVER
* post show cover photo
*/
router.post('/api/showcover/upload', upload.single("file"),upload.single("file"), fileWorker.uploadShowCover);
/*
* SHOW COVER
* update show cover photo
*/
router.put('/api/showcover/update', upload.single("file"), upload.single("file"), fileWorker.updateShowCover);
/*
* SHOW COVER
* get show cover photo
*/
router.get('/api/showcover', fileWorker.getShowCover);

module.exports = router;