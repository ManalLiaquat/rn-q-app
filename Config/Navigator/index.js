import LoginScreen from "../../Screens/Login";
import HomeScreen from "../../Screens/Home";
import AuthLoadingScreen from "../../Screens/AuthLoader";

import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";

const AppStack = createStackNavigator({ Home: HomeScreen });
const AuthStack = createStackNavigator({ Login: LoginScreen });

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoader: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: "AuthLoader"
    }
  )
);
