import { BrowserWindow } from "electron";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import {
  SPLASH_DURATION_MS,
  SPLASH_HEIGHT,
  SPLASH_IMAGE_NAMES,
  SPLASH_WIDTH,
} from "./constant/splash";

export type SplashPhase = "start" | "loading" | "ready";

export const SPLASH_STATUS_CHANNEL = "splash-status";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

type OpenSplashOptions = {
  rendererDist: string;
  publicDir: string;
  devServerUrl?: string;
};

function resolveSplashImagePath(publicDir: string): string {
  for (const name of SPLASH_IMAGE_NAMES) {
    const candidate = path.join(publicDir, name);
    if (existsSync(candidate)) {
      return candidate;
    }
  }

  return path.join(publicDir, SPLASH_IMAGE_NAMES[1]);
}

export function notifySplashPhase(splashWindow: BrowserWindow, phase: SplashPhase) {
  if (!splashWindow.isDestroyed()) {
    splashWindow.webContents.send(SPLASH_STATUS_CHANNEL, phase);
  }
}

export async function openSplash({
  rendererDist,
  publicDir,
  devServerUrl,
}: OpenSplashOptions): Promise<BrowserWindow> {
  const imageQuery = pathToFileURL(resolveSplashImagePath(publicDir)).href;

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
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
    },
  });

  if (devServerUrl) {
    const url = new URL("splash.html", devServerUrl);
    url.searchParams.set("image", imageQuery);
    await splashWindow.loadURL(url.href);
  } else {
    await splashWindow.loadFile(path.join(rendererDist, "splash.html"), {
      query: { image: imageQuery },
    });
  }

  splashWindow.center();
  splashWindow.show();

  return splashWindow;
}

function delay(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

function waitForMainWindowLoad(mainWindow: BrowserWindow) {
  return new Promise<void>((resolve) => {
    if (!mainWindow.webContents.isLoading()) {
      resolve();
      return;
    }

    mainWindow.webContents.once("did-finish-load", () => resolve());
  });
}

export async function runSplashLoadingSequence(
  splashWindow: BrowserWindow,
  mainWindow: BrowserWindow,
) {
  await delay(500);
  notifySplashPhase(splashWindow, "start");

  notifySplashPhase(splashWindow, "loading");
  await waitForMainWindowLoad(mainWindow);
  await delay(1500);

  notifySplashPhase(splashWindow, "ready");
  await delay(450);
}

export async function closeSplashWhenReady(splashWindow: BrowserWindow, mainWindow: BrowserWindow) {
  await Promise.all([
    delay(SPLASH_DURATION_MS),
    runSplashLoadingSequence(splashWindow, mainWindow),
  ]);

  if (!splashWindow.isDestroyed()) {
    splashWindow.close();
  }
}
