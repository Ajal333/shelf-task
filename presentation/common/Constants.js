import Constants from "expo-constants";
import { Dimensions } from "react-native";

export const constants = {
  statusBarHeight: Constants.statusBarHeight + 20,
  screenHeight: Dimensions.get("screen").height,
  screenWidth: Dimensions.get("screen").width,
};
