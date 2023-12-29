const express = require('express');
const router = express.Router();

const Url = require('../models/Url');

// @route     GET /:code
// @desc      Redirect to long/original URL
router.get('/:code', async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.code });

    if (url) {
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json('No url found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json('Server error');
  }
});

router.delete('/:id',async(req,res)=>{
    try {
        const {id:UrlId} = req.params
        await Url.findByIdAndDelete(UrlId)
        res.status(200).json("data deleted")
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;
