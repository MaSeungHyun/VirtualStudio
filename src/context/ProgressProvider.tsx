import { useProgressStore } from "@/store/useProgress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/Dialog";
import Icon from "@/components/Icon";
import Progress from "@/components/Progress";

export const ProgressProvider = () => {
  const { isOpen, config, close } = useProgressStore();

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent>
        <DialogHeader>
          {config.title && (
            <DialogTitle>
              {config.icon ? (
                <div className="flex items-center gap-2">
                  <Icon icon={config.icon} size={17} />
                  <span>{config.title}</span>
                </div>
              ) : (
                config.title
              )}
            </DialogTitle>
          )}
          {config.description && <DialogDescription>{config.description}</DialogDescription>}
        </DialogHeader>
        <DialogFooter>
          <Progress value={config.progress ?? 0} max={100} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
