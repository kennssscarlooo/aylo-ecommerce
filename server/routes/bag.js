const router = require("express").Router();
const Bag = require("../models/Bag");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

//CREATE
router.post("/", verifyToken, async (req, res) => {
  const newBag = new Bag(req.body);
  try {
    const savedBag = await newBag.save();
    res.status(200).json(savedBag);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedBag = await Bag.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedBag);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Bag.findByIdAndDelete(req.params.id);
    res.status(200).json("Bag has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER BAG
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const bag = await Bag.findOne({ userId: req.params.userId });
    res.status(200).json(bag);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const bags = await Bag.find();
    res.status(200).json(bags);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
