import { BrowserWindow } from "electron";
import { registerWindowHandlers } from "./window";

export function registerAllHandlers(getWindow: () => BrowserWindow | null) {
  registerWindowHandlers(getWindow);
}
