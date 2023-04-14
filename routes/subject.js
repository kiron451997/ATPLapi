const router = require("express").Router();
const Subjects = require("../models/Subjects");
const { verifyToken, verifyTokenAndAuthorisation, verifyTokenAndAdmin } = require("./verifyToken");


// Create SUBJECT
router.post("/create", async (req, res) => {
	const newSubjects = new Subjects(req.body);
try {
		const savedSubjects = await newSubjects.save();
		res.status(200).json(savedSubjects);
	} catch (err) {
		res.status(500).json(err);
	} 
});









// Delete SUBJECT BY ID
router.delete("/:id", verifyTokenAndAdmin, async (req, res )=> {
	try {
		await Subjects.findByIdAndDelete(req.params.id);
		res.status(200).json("Subject has been deleted ... ");

	} catch(err) {
		res.status(500).json(err)
	}
})




// Get all products
router.get("/", async (req, res )=> {
	try {
		const subjects = await Subjects.find();
		res.status(200).json(subjects);

	} catch(err) {
		res.status(500).json(err)
	}
})



/*

// Get user stats
router.get("/stats", verifyTokenAndAdmin, async (req, res )=> {
	const date = new Date();
	const lastYear = new Date(date.setFullYear(date.getFullYear() -1));
	try {

		const data = await User.aggregate([ 
			{ $match: { createdAt: { $gte: lastYear } } }, 
			{
				$project: {
					month: {$month: "$createdAt"},
				},
			},
			{
				$group: {
					_id: "$month",
					total: { $sum: 1},
				}
			}
			]);
		res.satus(200).json(data);
		

	} catch(err) {
		res.status(500).json(err)
	}
})

*/






module.exports = router;  