const router = require("express").Router();
const Image = require("../models/image.js");
const { verifyToken, verifyTokenAndAuthorisation, verifyTokenAndAdmin } = require("./verifyToken");


router.post("/create", async (req, res) => {
	const newImage = new Image(req.body);
try {
		const savedImage = await newImage.save();
		res.status(200).json(savedImage);
	} catch (err) {
		res.status(500).json(err);
	} 
});





router.put("/:id", verifyTokenAndAuthorisation, async (req,res)=> {
	//if (req.user.id === req.params.id || req.user.isAdmin) {}

		if (req.body.password){
			req.body.password = CryptoJS.AES.encrypt( 
				req.body.password, process.env.PASS_SEC ).toString();
			 }
			  try {
			  	const updateImage = await Image.findByIdAndUpdate(req.params.id, {
			  		$set: req.body,
			  	}, {new: true});
			  	res.status(200).json(updateImage);
			  } catch (err) {
			  	res.status(500).json(err);
			  }
});




// Delete PRODUCT BY ID, verifyTokenAndAdmin
router.delete("/:id", async (req, res )=> {
	try {
		await Image.findByIdAndDelete(req.params.id);
		res.status(200).json("Image has been deleted ... ");

	} catch(err) {
		res.status(500).json(err)
	}
})









// Get IMAGE by SUBJECT
router.get("/find/:subject", async (req, res )=> {
	try {
		const image = await Image.find( { subject: req.params.subject } );
		res.status(200).json(image);

	} catch(err) {
		res.status(500).json(err)
	}
});


// Get IMAGE by AUTHOR ID
router.get("/find/author/:author", async (req, res )=> {
	try {
		const image = await Image.find( { author: req.params.author } );
		res.status(200).json(image);

	} catch(err) {
		res.status(500).json(err)
	}
});


/*
// Get all products
router.get("/", async (req, res )=> {
	try {
		const product = await Product.find();
		res.status(200).json(product);

	} catch(err) {
		res.status(500).json(err)
	}
})
*/

// Get all products with possible query
router.get("/", async (req, res )=> {
	const qNew = req.query.new;
	const qCategory = req.query.category;
	try {
		let images;

		if(qNew) {
	images = await Image.find().sort({createdAt: -1}).limit(1);
		} else if (qCategory){
	images = await Image.find( { categories: { $regex: qCategory } } )
;
	} else {
		images = await Image.find();
	}

		res.status(200).json(images);

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
