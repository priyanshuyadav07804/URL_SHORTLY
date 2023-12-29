const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');

const Url = require('../models/Url');

// @route     POST /api/url/shorten
// @desc      Create short URL// ... (existing code)

router.post('/shorten', async (req, res) => {
  const { longUrl } = req.body;
  const baseUrl = "http://localhost:4000";


  // Check long url
  if (!validUrl.isUri(longUrl)) {
    return res.status(400).json('Invalid long url');
  }

  try {
    // Check if the long URL already exists
    let url = await Url.findOne({ longUrl });

    if (url) {
      return res.status(200).json(url); // Assuming this should be 200 for successful response
    }

    // Create url code
    const urlCode = shortid.generate();
    const shortUrl = baseUrl + '/' + urlCode;

     url = new Url({
      longUrl,
      shortUrl,
      urlCode,
      date: new Date()
    });

    await url.save();

    return res.status(201).json(url); // Assuming this should be 201 for successful resource creation
  } catch (err) {
    console.error(err);
    return res.status(500).json('Server error');
  }
});

module.exports = router;
