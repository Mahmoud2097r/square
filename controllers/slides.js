const Slide = require('../models/slide'),
{ cloudinary } = require('../cloudinary');


module.exports = {
    async getAdminDashBoard(req, res, next) {
        const slides = await Slide.find();
        res.render('slides/index', { slides});
    },

    async postSlides (req, res, next) {    
        const slide = await new Slide();
        slide.images = req.files.map(f => ({ url: f.path , filename: f.filename}));
        await slide.save();
        res.redirect('/admin-square/dash-board');
    },

    async showSlide (req, res, next) {
        const slide = await Slide.findById(req.params.id);
        res.render('slides/showSlide', { slide });
    },

    async patchSlides (req, res, next) {
        const slide = await Slide.findById(req.params.id);
        if (req.body.deleteImages) {
            for (const filename of req.body.deleteImages) {
                await cloudinary.uploader.destroy(filename);
            }
            await slide.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages}}}});
        }

        if (req.files) {
            const imgs = req.files.map( f => ({ url: f.path, filename: f.filename }));
            await slide.images.push( ...imgs);
        }

        await slide.save();
        res.redirect(`/admin-square/dash-board/${req.params.id}`);
    },

    async deleteSlide (req, res, next) {
        const slide = await Slide.findById(req.params.id);
        for (const img of slide.images) {
            cloudinary.uploader.destroy(img.filename);
        }
        await slide.remove()
        res.redirect('/admin-square/dash-board');
    }
}