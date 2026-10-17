import { createServer } from "vite";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
const server = await createServer({
  server: { middlewareMode: true, hmr: false, ws: false },
  appType: "custom",
});
try {
  const { default: App } = await server.ssrLoadModule("/src/App.tsx");
  const template = await readFile("dist/index.html", "utf8");
  for (const route of ["/", "/portfolio"]) {
    const html = renderToString(createElement(App, { route }));
    const output = template
      .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
      .replace(
        "<title>Abel Chin — Technical Founder</title>",
        `<title>${route === "/" ? "Abel Chin — Technical Founder" : "Work — Abel Chin"}</title>`,
      )
      .replace(
        'href="https://www.abelchinjh.com"',
        `href="https://www.abelchinjh.com${route === "/" ? "" : route}"`,
      );
    const destination =
      route === "/" ? "dist/index.html" : "dist/portfolio/index.html";
    if (route !== "/") await mkdir("dist/portfolio", { recursive: true });
    await writeFile(destination, output);
  }
} finally {
  await server.close();
}
