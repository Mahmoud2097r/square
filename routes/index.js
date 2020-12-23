const express = require('express'),
router        = express.Router(),
{
    getAdminDashBoard,
} = require('../controllers');


router.get('/', (req, res, next) => {
    res.render('index');
});





module.exports = router;