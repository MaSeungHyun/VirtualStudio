// hooks/useProgress.ts
import { useEffect, useState } from "react";
import loadingManager from "@/utils/loadManager";

type LoaderState = {
  loaded: number;
  total: number;
  isLoading: boolean;
};

export function useProgress() {
  const [state, setState] = useState<LoaderState>({
    loaded: 0,
    total: 0,
    isLoading: false,
  });

  useEffect(() => {
    const handleStart = (url: string, itemsLoaded: number, itemsTotal: number) => {
      console.log(`Started loading: ${url}`);
      setState((prev) => ({
        ...prev,
        isLoading: true,
        loaded: itemsLoaded,
        total: state.total + itemsTotal,
      }));
    };

    const handleProgress = (url: string, itemsLoaded: number, itemsTotal: number) => {
      console.log(`Loading: ${url} (${itemsLoaded}/${itemsTotal})`);
      setState((prev) => ({
        ...prev,
        loaded: itemsLoaded,
        total: itemsTotal,
      }));
    };

    const handleLoad = () => {
      console.log("All loading complete!");
      setState((prev) => ({ ...prev, isLoading: false }));
      setTimeout(() => {
        setState({ loaded: 0, total: 0, isLoading: false });
      }, 500); // optional: fade-out delay
    };

    const handleError = (url: string) => {
      console.error("Error loading:", url);
    };

    loadingManager.onStart = handleStart;
    loadingManager.onProgress = handleProgress;
    loadingManager.onLoad = handleLoad;
    loadingManager.onError = handleError;

    // Optional: cleanup on unmount
    return () => {
      loadingManager.onStart = null!;
      loadingManager.onProgress = null!;
      loadingManager.onLoad = null!;
      loadingManager.onError = null!;
    };
  }, []);

  const progressPercent =
    state.total === 0 ? 0 : Math.min(100, Math.round((state.loaded / state.total) * 100));

  return {
    progress: progressPercent,
    isLoading: state.isLoading,
    loaded: state.loaded,
    total: state.total,
  };
}
