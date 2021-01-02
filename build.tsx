import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import postcss from "postcss";
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
import { sha1 } from "object-hash";
import { oneLineTrim } from "common-tags";
import { readFile, writeFile, mkdir } from "fs/promises";
import { resolve, join } from "path";

import App from "~/App";

const styleEntryPoint = resolve("src", "styles", "App.pcss");
const outDir = resolve("dist");

const processStyle = async () => {
  const entry = await readFile(styleEntryPoint, "utf-8");
  const { css } = await postcss([cssnano, autoprefixer]).process(entry, { from: undefined });
  const outputName = `${sha1(css).slice(0, 4)}.css`;
  await writeFile(join(outDir, outputName), css);
  return outputName;
};

const build = async () => {
  await mkdir(outDir, { recursive: true });

  const cssName = await processStyle();
  const output = oneLineTrim`
    <!DOCTYPE html>
    <html lang="ja">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <title>SHUN's Portfolio</title>
        <link href="${cssName}" rel="stylesheet">
      </head>
      <body>
        ${renderToStaticMarkup(<App />)}
      </body>
    </html>
  `;

  await writeFile(join(outDir, "index.html"), output);
};

build().catch(console.error);