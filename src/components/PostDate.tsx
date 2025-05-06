import { formatDate } from "@/utils/dateUtils";

interface PostDateProps {
  date: string;
  className?: string;
  dateFormat?: string;
  size?: "xs" | "sm" | "lg" | "xl";
}

export function PostDate({
  date,
  className = "text-gray-600",
  dateFormat = "default",
  size = "lg",
}: PostDateProps) {
  const formattedDate = formatDate(new Date(date), dateFormat);

  const sizeClasses = {
    xs: "text-xs",
    sm: "text-sm",
    lg: "text-lg",
    xl: "text-xl",
  };

  return <p className={`${sizeClasses[size]} ${className}`}>{formattedDate}</p>;
}
