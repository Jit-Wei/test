const express = require('express');
const router = express.Router();
const details = require('../controllers/detail-controller')

router.get('/test',details.testGet);
router.get('/',details.getData);
router.get('/edit',details.editGet)
router.get('/add',details.addGet);
router.post('/add',details.addPost);


module.exports=router;