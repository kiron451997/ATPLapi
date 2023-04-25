const router = require("express").Router();
const User = require("./models/user");
const { verifyToken, verifyTokenAndAuthorisation, verifyTokenAndAdmin } = require("./verifyToken");

router.get("/usertest", (req, res) => {
	res.send("User test is successfull");
});

router.put("/:id", verifyTokenAndAuthorisation, async (req,res)=> {
	//if (req.user.id === req.params.id || req.user.isAdmin) {}

		if (req.body.password){
			req.body.password = CryptoJS.AES.encrypt( 
				req.body.password, process.env.PASS_SEC ).toString();
			 }
			  try {
			  	const updateUser = await User.findByIdAndUpdate(req.params.id, {
			  		$set: req.body,
			  	}, {new: true});
			  	res.status(200).json(updateUser);
			  } catch (err) {
			  	res.satus(500).json(err);
			  }
});


router.post("/userposttest", (req, res) => {
const username = req.body.username;
console.log(username);  
});


// Delete USER BY ID
router.delete("/:id", verifyTokenAndAuthorisation, async (req, res )=> {
	try {
		await User.findByIdAndDelete(req.params.id);
		res.status(200).json("User has been deleted ... ");

	} catch(err) {
		res.status(500).json(err)
	}
})


// Get user by ID
router.get("/find/:id", verifyTokenAndAdmin, async (req, res )=> {
	try {
		const user = await User.findById(req.params.id);
		const { password, ...others } = user._doc;
		res.status(200).json(others);

	} catch(err) {
		res.status(500).json(err)
	}
});


// Get all users
router.get("/", verifyTokenAndAdmin, async (req, res )=> {
	try {
		const users = await User.find();
		res.status(200).json(users);

	} catch(err) {
		res.status(500).json(err)
	}
})


// Get all users sort
router.get("/sort", verifyTokenAndAdmin, async (req, res )=> {
	const query = req.query.new;
	try {
		const users = query 
		? await User.find().sort({ _id: -1}).limit(2)
		: await User.find();
		res.status(200).json(users);

	} catch(err) {
		res.status(500).json(err)
	}
})

//GET USER STATS

router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err);
  }
}); 







module.exports = router;  
