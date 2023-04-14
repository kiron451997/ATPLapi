const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema(
{
	title: { type: String, required: true, unique: true },
	desc: {type: String, required :false,},
	img: {type: String, required: true},
	imgFileName: {type: String, required: true},
	categories: { type: Array },
	author: {type: String, required: true},
	subject: {type: String, required: true},
	
},
{ timestamp: true}
);

module.exports = mongoose.model("Image", ImageSchema);
