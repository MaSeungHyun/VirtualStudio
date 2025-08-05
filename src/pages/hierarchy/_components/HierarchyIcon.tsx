import Icon from "@/components/Icon";

interface IconProps {
  icon: string;
  className?: string;
  size?: number;
  fill?: string;
}
export default function HierarchyIcon({ icon, className, ...props }: IconProps) {
  const DEFAULT_SIZE: number = 15;

  switch (icon) {
    case "Mesh":
      return <Icon icon="Box" className={className} size={DEFAULT_SIZE} {...props} />;

    case "Camera":
      return <Icon icon="Camera" className={className} size={DEFAULT_SIZE} {...props} />;

    case "Eye":
      return <Icon icon="Eye" className={className} size={DEFAULT_SIZE} {...props} />;
    case "EyeOff":
      return <Icon icon="EyeOff" className={className} size={DEFAULT_SIZE} {...props} />;
    case "Scene":
      return <Icon icon="Archive" className={className} size={DEFAULT_SIZE} {...props} />;
    case "Arrow":
      return <Icon icon="Play" className={className} size={DEFAULT_SIZE} {...props} />;
    case "AmbientLight":
    case "DirectionalLight":
    case "PointLight":
    case "SpotLight":
      return <Icon icon="Flashlight" className={className} size={DEFAULT_SIZE} {...props} />;
    case "PerspectiveCamera":
    case "OrthographicCamera":
      return <Icon icon="Video" className={className} size={DEFAULT_SIZE} {...props} />;
    case "Group":
      return <Icon icon="Boxes" className={className} size={DEFAULT_SIZE} {...props} />;
    default:
    //   return <LucideIcon className={cn(`w-${size} h-${size} `, className)} />;
  }
}
