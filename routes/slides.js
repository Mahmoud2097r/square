const express = require('express'),
router        = express.Router(),
multer        = require('multer'),
{ storage }   = require('../cloudinary'),
upload        = multer({ storage }),
{
    getAdminDashBoard,
    postSlides,
    showSlide,
    patchSlides,
    deleteSlide
} = require('../controllers/slides'),
{
    asyncErrHandler
} = require('../middleware')





router.route('/')
.get(getAdminDashBoard)
.post(upload.array('images', 4), asyncErrHandler(postSlides));

// router.patch('/:id/edit', upload.array('images', 4), asyncErrHandler(patchSlides));
router.route('/:id')
.get(asyncErrHandler(showSlide))
.patch(upload.array('images', 4), asyncErrHandler(patchSlides))
.delete(asyncErrHandler(deleteSlide));



module.exports = router;