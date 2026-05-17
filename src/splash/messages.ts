export const SPLASH_LOADING_MESSAGES = {
  start: "프로젝트 설정을 가져오고 있습니다",
  loading: "Scene 구성 요소를 로딩 중입니다",
  ready: "프로젝트 설정이 완료되었습니다",
} as const;

export type SplashPhase = keyof typeof SPLASH_LOADING_MESSAGES;

export const SPLASH_STATUS_CHANNEL = "splash-status";
