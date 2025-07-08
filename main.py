import asyncio
from fastapi import FastAPI
from btch_downloader import ttdl, igdl, twitter, youtube, fbdown, aio, mediafire, capcut, gdrive, pinterest

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Btch Downloader API is running."}

@app.get("/api/download")
async def download(url: str):
    try:
        if "tiktok.com" in url:
            result = await ttdl(url)
            platform = "TikTok"
        elif "instagram.com" in url:
            result = await igdl(url)
            platform = "Instagram"
        elif "youtube.com" in url or "youtu.be" in url:
            result = await youtube(url)
            platform = "YouTube"
        elif "facebook.com" in url:
            result = await fbdown(url)
            platform = "Facebook"
        elif "mediafire.com" in url:
            result = await mediafire(url)
            platform = "MediaFire"
        elif "capcut.com" in url:
            result = await capcut(url)
            platform = "Capcut"
        elif "drive.google.com" in url:
            result = await gdrive(url)
            platform = "Google Drive"
        elif "pin.it" in url or "pinterest.com" in url:
            result = await pinterest(url)
            platform = "Pinterest"
        elif "twitter.com" in url:
            result = await twitter(url)
            platform = "Twitter"
        else:
            # Use aio fallback if url not matched
            result = await aio(url)
            platform = "AIO"
        
        return {
            "success": True,
            "platform": platform,
            "data": result
        }
    except Exception as e:
        return {
            "success": False,
            "error": str(e)
          }
          
