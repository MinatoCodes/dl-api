const express = require("express");
const {
  igdl, ttdl, fbdown, twitter, youtube,
  mediafire, capcut, gdrive, pinterest
} = require("btch-downloader");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/api/download", async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({
      success: false,
      message: "Please provide a url parameter"
    });
  }

  try {
    let data;

    // Determine platform based on URL and call suitable downloader
    if (url.includes("instagram.com")) {
      data = await igdl(url);
    } else if (url.includes("tiktok.com")) {
      data = await ttdl(url);
    } else if (url.includes("facebook.com")) {
      data = await fbdown(url);
    } else if (url.includes("twitter.com")) {
      data = await twitter(url);
    } else if (url.includes("youtube.com") || url.includes("youtu.be")) {
      data = await youtube(url);
    } else if (url.includes("mediafire.com")) {
      data = await mediafire(url);
    } else if (url.includes("capcut.com")) {
      data = await capcut(url);
    } else if (url.includes("drive.google.com")) {
      data = await gdrive(url);
    } else if (url.includes("pin.it") || url.includes("pinterest.com")) {
      data = await pinterest(url);
    } else {
      return res.status(400).json({
        success: false,
        message: "Unsupported platform"
      });
    }

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "No data returned"
      });
    }

    res.json({
      success: true,
      author: MinatoCodes,
      platform: detectPlatform(url),
      data
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to download",
      error: err.message
    });
  }
});

// Utility function to detect platform for response
function detectPlatform(url) {
  if (url.includes("instagram.com")) return "Instagram";
  if (url.includes("tiktok.com")) return "TikTok";
  if (url.includes("facebook.com")) return "Facebook";
  if (url.includes("twitter.com")) return "Twitter";
  if (url.includes("youtube.com") || url.includes("youtu.be")) return "YouTube";
  if (url.includes("mediafire.com")) return "MediaFire";
  if (url.includes("capcut.com")) return "Capcut";
  if (url.includes("drive.google.com")) return "Google Drive";
  if (url.includes("pin.it") || url.includes("pinterest.com")) return "Pinterest";
  return "Unknown";
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
        
