const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

 cloudinary.config({ 
        cloud_name:process.env.CLOUD_NAME, 
        api_key:process.env.CLOUD_KEY_ID, 
        api_secret:process.env.CLOUD_KEY_SECRET
    });

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'listings_img',
    allowed_formats: ["jpg", "png", "jpeg"], 
  },
});

module.exports = {
  storage,}