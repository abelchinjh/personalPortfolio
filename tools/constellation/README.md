# Quiet cobalt constellation

The middle film follows Abel's selected Quiet Cobalt Constellation concept (Library `libfile_ff39e599a3c48191bcd4df39ecb19406`). It interprets the charcoal background, diagonal cobalt/white particle field, sparse links, foreground bokeh and negative space. The rendered version has fewer particles and connections, smaller foreground glows and a simpler background than the generated concept. It is not a frame-exact animation of that still.

Installed Chromium WebGL2 renders a deterministic field of 967 three-dimensional points, projected into Gaussian glow sprites. Eighteen anchors form six small irregular constellations with fourteen thin connections. Depth-dependent scale, low-amplitude particle drift, camera motion and breathing brightness repeat over 192 frames at 24 fps. There is no image texture, physics simulation, external generation service, added package or paid tool.

The desktop master is 1664 × 936, downsampled to 1280 × 720. The phone master is 648 × 1404, downsampled to 432 × 936, with a separately composed taller field. Both eight-second loops ship as VP9 WebM and H.264 MP4 (yuv420p, no audio, faststart MP4). WebP posters match frame zero. Frame 192 is rendered only to verify that it matches frame zero; encoded files contain frames 0–191.

## Reproduce with installed tools

1. Serve `dist` on localhost port 8765. Copy `scene.html` to `dist/constellation-render.html`.
2. Start an isolated installed Chromium with remote debugging port 9224 and a disposable profile. The renderer uses only that local instance, never a personal browser profile.
3. Run `node tools/constellation/render.mjs`. `--test` emits quarter-cycle samples. Full frames go to the workspace's `outputs/constellation-preview/render`.
4. Run `node tools/constellation/encode.mjs` using installed FFmpeg with libx264, libvpx-vp9 and libwebp.

SceneMedia keeps proximity loading, offscreen unloading, hidden-tab pause/resume and static reduced-motion/save-data/error fallbacks. The middle scene has no visible pause control. The existing hero lens, its control, sticky reveal/hold/cover geometry, theme selector and page copy are unchanged.
