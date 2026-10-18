# Controlled cobalt ribbon scene

Historical renderer, superseded by [Quiet cobalt constellation](../constellation/README.md). Its published media assets were removed when Abel selected the constellation direction.

This replaces the middle Liquid Lens film with a different subject. The hero lens files are unchanged. Three extruded parametric ribbon meshes use fixed geometry, depth-tested surfaces and art-directed cobalt lighting on a graphite environment. A bounded periodic 3D turn and twist completes one loop in 144 frames / 24 fps / 6 seconds. This is a stylized real 3D mesh render, not an image-to-video service or a CSS animation of a still.

Installed Chromium WebGL2/SwiftShader renders the frames. Installed FFmpeg encodes VP9 WebM and H.264 MP4 (yuv420p, faststart), with matching first-frame WebP posters. No added packages or paid service. The phone uses its own wider orthographic framing; it is not cropped from the desktop output. The scene sits inside the existing native sticky reveal/hold/cover geometry.

To reproduce, serve dist locally on port 8765 and copy scene.html to dist/ribbon-render.html. Start an isolated installed Chromium with remote debugging port 9224 and a disposable profile; then run `node tools/cobalt-ribbons/render.mjs` from the repository. `--test` emits only four phase samples. Full frames go to workspace outputs/ribbons-theme-preview/render. Encode each 144-frame sequence with FFmpeg at 24 fps, libx264 CRF 23/preset slow/faststart, or libvpx-vp9 CRF 31/cpu-used 4. Poster: frame 0000 as WebP quality 90.

SceneMedia retains proximity loading, offscreen unloading and hidden-tab pause/resume. The hero retains its labelled pause/play control; the temporary middle film has no visible pause control, as requested. Reduced-motion/save-data clients attach no video source and receive the poster. The four-step AgentLane illustration plays once for four seconds and has no replay control; its full ordered text remains present throughout.
