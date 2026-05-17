import { app, BrowserWindow } from "electron";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { DEFAULT_WINDOW_HEIGHT, DEFAULT_WINDOW_WIDTH } from "./constant/window";
import { registerAllHandlers } from "./ipc";
import { closeSplashWhenReady, openSplash } from "./splash";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, "..");

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, "public")
  : RENDERER_DIST;

let win: BrowserWindow | null;

const isMac = process.platform === "darwin";
const isWindow = process.platform === "win32";
const isLinux = process.platform === "linux";

const titleBarStyle = isMac ? "hiddenInset" : isWindow ? "hidden" : "default";

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC!, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
    },
    width: DEFAULT_WINDOW_WIDTH,
    height: DEFAULT_WINDOW_HEIGHT,
    frame: false,
    titleBarStyle: titleBarStyle,
    backgroundColor: "#242424",
    show: false,
    titleBarOverlay:
      isWindow || isLinux
        ? {
            color: "#242424",
            symbolColor: "#f0f0f0",
            height: 30,
          }
        : undefined,
  });

  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }

  return win;
}

async function launchApp() {
  registerAllHandlers(() => win);

  const mainWindow = createWindow();
  const splashWindow = await openSplash({
    rendererDist: RENDERER_DIST,
    publicDir: process.env.VITE_PUBLIC!,
    devServerUrl: VITE_DEV_SERVER_URL,
  });

  await closeSplashWhenReady(splashWindow, mainWindow);

  if (mainWindow.isDestroyed()) {
    return;
  }

  const showMainWindow = () => {
    mainWindow.show();
    mainWindow.focus();
  };

  if (mainWindow.webContents.isLoading()) {
    mainWindow.once("ready-to-show", showMainWindow);
  } else {
    showMainWindow();
  }
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    void launchApp();
  }
});

app.whenReady().then(launchApp);
