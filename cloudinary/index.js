const crypto = require('crypto');
const cloudinary = require('cloudinary').v2;
cloudinary.config({
	cloud_name : process.env.CLOUD_NAME,
	api_key    :  process.env.API_KEY,
	api_secret : process.env.CLOUDINARY_SECRET
});
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const storage = new CloudinaryStorage({
	cloudinary,
	params: {
		folder: 'Square',
		allowedFormats: ['jpeg', 'jpg', 'png'],
		filename: function (req, file) {
			let buf = crypto.randomBytes(16);
			buf = buf.toString('hex');
			let uniqFileName = file.originalname.replace(/\.jpeg|\.jpg|\.png/ig, '');
			uniqFileName += buf;
		}
	},
});

module.exports = {
	cloudinary,
	storage
};
