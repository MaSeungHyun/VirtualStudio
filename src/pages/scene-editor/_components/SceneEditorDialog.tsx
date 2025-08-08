import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/Dialog";
import Icon from "@/components/Icon";

import Progress from "@/components/Progress";
import { useProgress } from "@/hooks/useProgress";
import { memo } from "react";

export const SceneEditorDialog = memo(() => {
  const { progress, isLoading } = useProgress();

  console.log(isLoading);
  return (
    <Dialog open={isLoading}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center gap-2">
              <Icon icon="Settings" size={17} />
              <span>Project Setting</span>
            </div>
          </DialogTitle>
          <DialogDescription>
            {`초기 프로젝트 환경을 설정하는 중입니다. \n 잠시만 기다려주세요.`}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Progress value={progress} max={100} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});

export default SceneEditorDialog;
