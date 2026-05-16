import { BrowserWindow } from "electron";
import { existsSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

import {
  SPLASH_DURATION_MS,
  SPLASH_HEIGHT,
  SPLASH_IMAGE_NAMES,
  SPLASH_WIDTH,
} from "./constant/splash";

function resolveSplashImagePath(publicDir: string): string {
  for (const name of SPLASH_IMAGE_NAMES) {
    const candidate = path.join(publicDir, name);
    if (existsSync(candidate)) {
      return candidate;
    }
  }

  return path.join(publicDir, SPLASH_IMAGE_NAMES[1]);
}

export async function showSplash(publicDir: string): Promise<void> {
  const splashHtml = path.join(publicDir, "splash.html");
  const imagePath = resolveSplashImagePath(publicDir);

  const splashWindow = new BrowserWindow({
    width: SPLASH_WIDTH,
    height: SPLASH_HEIGHT,
    frame: false,
    alwaysOnTop: true,
    center: true,
    skipTaskbar: true,
    resizable: false,
    movable: false,
    minimizable: false,
    maximizable: false,
    fullscreenable: false,
    show: false,
    backgroundColor: "#000000",
  });

  await splashWindow.loadFile(splashHtml, {
    query: { image: pathToFileURL(imagePath).href },
  });

  splashWindow.center();
  splashWindow.show();

  await new Promise<void>((resolve) => {
    setTimeout(() => {
      splashWindow.close();
      resolve();
    }, SPLASH_DURATION_MS);
  });
}
