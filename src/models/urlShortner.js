const mongoose = require('mongoose')
const urlShortenerSchema = new mongoose.Schema({
		name: String,
		link: {
			type: String,
			required: true,
			trim: true,
			unique:true
		}
});

const urlShortener = mongoose.model('urlShortener', urlShortenerSchema)
module.exports = urlShortener
