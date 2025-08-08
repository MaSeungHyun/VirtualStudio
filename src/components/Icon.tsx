import { icons } from "lucide-react";
import { cn } from "@/utils/style";
import { ComponentProps } from "react";

type TransformIconProps = ComponentProps<"svg"> & {
  icon: string;
  size?: number;
  className?: string;
};

export default function Icon({ icon, size, className, ...props }: TransformIconProps) {
  const IconComponent = icons[icon as keyof typeof icons] ?? icons["Box"];

  return <IconComponent className={cn(className)} fill={"transparent"} size={size} {...props} />;
}
