const puppeteer = require("puppeteer");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegStatic = require("ffmpeg-static");
const ffprobeStatic = require("ffprobe-static");

ffmpeg.setFfmpegPath(ffmpegStatic);
ffmpeg.setFfprobePath(ffprobeStatic.path);

const scaleOptions = ["scale=1280:720", "scale=640:320"];

async function captureFrames() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://example.com");
  const videoElementHandle = await page.$("video");
  // Capture frames using videoElementHandle.screenshot()
  await browser.close();
}

function encodeToHLS() {
  ffmpeg("input.png")
    .inputFormat("image2pipe")
    .inputOptions(["-framerate 30"])
    .videoCodec("libx264")
    .output("output.m3u8")
    .run();
}
