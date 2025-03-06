import {
  Check,
  EditIcon,
  EyeClosed,
  EyeIcon,
  LucideClipboardSignature,
  LucidePlusCircle,
  Plus,
  TimerIcon,
  Trash,
} from "lucide-react";

type Props = {
  icon: string;
  color?: string;
  onClick?: () => void;
  size?: number;
};

const AppIcon = ({ icon, color, onClick, size }: Props) => {
  switch (icon) {
    case "eye-closed":
      return (
        <EyeClosed color={color} onClick={onClick} size={size}></EyeClosed>
      );
    case "eye-open":
      return <EyeIcon color={color} onClick={onClick} size={size}></EyeIcon>;
    case "delete":
      return <Trash color={color} onClick={onClick} size={size}></Trash>;
    case "update":
      return <EditIcon color={color} onClick={onClick} size={size}></EditIcon>;
    case "add":
      return <Plus color={color} onClick={onClick} size={size}></Plus>;
    case "empty-task":
      return (
        <LucideClipboardSignature
          color={color}
          onClick={onClick}
          size={size}
        ></LucideClipboardSignature>
      );
    case "check":
      return <Check color={color} onClick={onClick} size={size}></Check>;
    case "timer":
      return (
        <TimerIcon color={color} onClick={onClick} size={size}></TimerIcon>
      );

    default:
      break;
  }
};

export default AppIcon;
