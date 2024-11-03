import { Text } from "react-native";

interface HeaderProps {
  title: string;
  size?: number;
}

export default function Header({ title, size = 32 }: HeaderProps) {
  return (
    <Text style={{ fontSize: size }} className="py-10 font-Roboto_bold">
      {title}
    </Text>
  );
}
