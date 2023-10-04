// import the express and cors modules
const express = require('express');
const cors = require('cors');

// import the YoutubeTranscript module
const { YoutubeTranscript } = require('youtube-transcript');

// create an express application object
const app = express();

// use the cors middleware to enable CORS for all origins
app.use(cors());

// use the express.json middleware to parse JSON requests
app.use(express.json());

// define a route for GET requests to /api
app.get('/api', async (req, res) => {
  try {
    // get both query params
    const videoID = req.query.videoID;
    const lang = req.query.lang ?? 'en';

    if (!videoID) {
      throw 'videoID param was not passed.';
    }

    // fetch the transcript from YouTube
    const data = await YoutubeTranscript.fetchTranscript(videoID, {
      lang,
    });

    // return a json response with this object { data, error: null }
    res.json({ data, error: null });
  } catch (error) {
    console.log(error);
    // return a json response with this object { data: null, error }
    res.status(500).json({ data: null, error });
  }
});

// listen on port from environment or 5000
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
