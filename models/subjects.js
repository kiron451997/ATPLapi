const mongoose = require("mongoose");

const SubjectsSchema = new mongoose.Schema(
{
	title: { type: String, required: true, unique: true },
	desc: {type: String, required :false,},
	
},
{ timestamp: true}
);

module.exports = mongoose.model("Subjects", SubjectsSchema);
