import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const repository = fileURLToPath(new URL("../../", import.meta.url));
const frames = fileURLToPath(new URL("../../../outputs/constellation-preview/render/", import.meta.url));
const run = args => new Promise((resolve, reject) => {
  const process = spawn("ffmpeg", ["-hide_banner", "-loglevel", "warning", "-y", ...args], { stdio: "inherit" });
  process.on("error", reject);
  process.on("exit", code => code === 0 ? resolve() : reject(new Error(`FFmpeg exited ${code}`)));
});

for (const mobile of [false, true]) {
  const name = `quiet-constellation${mobile ? "-mobile" : ""}`;
  const input = `${frames}${mobile ? "mobile" : "desktop"}/%04d.png`;
  const scale = `scale=${mobile ? "432:936" : "1280:720"}:flags=lanczos`;
  const common = ["-framerate", "24", "-i", input, "-frames:v", "192", "-an", "-vf", scale, "-pix_fmt", "yuv420p", "-g", "96"];
  await run([...common, "-c:v", "libx264", "-preset", "slow", "-crf", "21", "-movflags", "+faststart", `${repository}public/videos/${name}.mp4`]);
  await run([...common, "-c:v", "libvpx-vp9", "-b:v", "0", "-crf", "28", "-cpu-used", "4", "-row-mt", "1", `${repository}public/videos/${name}.webm`]);
  await run(["-i", input.replace("%04d", "0000"), "-frames:v", "1", "-vf", scale, "-c:v", "libwebp", "-quality", "92", `${repository}public/images/${name}.webp`]);
  console.log(`Encoded ${name}: 192 frames, 24 fps, 8 seconds; matching frame-zero poster`);
}
