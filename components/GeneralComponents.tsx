import { View } from "react-native";

export const SPACE_SIZE = 50;

export const Spacer = ({ factor = 1 }) => {
  return <View style={{ height: SPACE_SIZE * factor }}></View>;
};
