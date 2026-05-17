import { useEffect, useState } from "react";

import packageJson from "../../package.json";
import splashImage from "../../public/splash.png";
import { SPLASH_LOADING_MESSAGES, SPLASH_STATUS_CHANNEL, type SplashPhase } from "./messages";

const DOT_COUNT = 3;
const DOT_INTERVAL_MS = 400;

function LoadingDots({ active }: { active: boolean }) {
  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    if (!active) {
      setVisibleCount(DOT_COUNT);
      return;
    }

    setVisibleCount(1);
    const id = setInterval(() => {
      setVisibleCount((prev) => (prev % DOT_COUNT) + 1);
    }, DOT_INTERVAL_MS);

    return () => clearInterval(id);
  }, [active]);

  if (!active) {
    return null;
  }

  return (
    <span className="inline-flex w-12 items-end justify-start gap-1 pl-1" aria-hidden>
      {Array.from({ length: DOT_COUNT }, (_, index) => (
        <span
          key={index}
          className={`inline-block text-base leading-none transition-opacity duration-200 ${
            index < visibleCount ? "opacity-100" : "opacity-0"
          }`}
        >
          .
        </span>
      ))}
    </span>
  );
}

export function Splash() {
  const [phase, setPhase] = useState<SplashPhase>("start");

  useEffect(() => {
    const handleStatus = (_event: unknown, nextPhase: SplashPhase) => {
      setPhase(nextPhase);
    };

    window.ipcRenderer.on(SPLASH_STATUS_CHANNEL, handleStatus);

    return () => {
      window.ipcRenderer.off(SPLASH_STATUS_CHANNEL, handleStatus);
    };
  }, []);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-black p-6">
      <div className="relative flex h-full w-full items-center justify-center">
        <img
          className="h-[512px] w-[512px] object-contain object-center select-none"
          src={splashImage}
          alt="Virtual Studio"
          draggable={false}
        />
        <footer className="absolute right-0 bottom-2.5 left-2.5 px-5 text-sm text-white">
          <section className="flex items-end justify-between gap-4">
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className="flex min-w-0 items-end font-medium text-neutral-100">
                <span className="truncate">{SPLASH_LOADING_MESSAGES[phase]}</span>
                <LoadingDots active={phase !== "a"} />
              </span>
              <span className="text-xs text-neutral-400">
                Copyright 2026 Virtual Studio. All rights reserved.
              </span>
            </div>
            <div className="shrink-0 text-right text-neutral-300">
              <span>Version {packageJson.version}</span>
            </div>
          </section>
        </footer>
      </div>
    </div>
  );
}
