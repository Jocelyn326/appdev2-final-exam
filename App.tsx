import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Id } from "./convex/_generated/dataModel";

import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import TodoScreen from "./screens/TodoScreen";

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

const Stack = createNativeStackNavigator();

export default function App() {
  const [userId, setUserId] = useState<Id<"users"> | null>(null);

  return (
    <ConvexProvider client={convex}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {userId ? (
            <Stack.Screen name="Todo">
              {() => <TodoScreen userId={userId} />}
            </Stack.Screen>
          ) : (
            <>
              <Stack.Screen name="Login">
                {() => <LoginScreen onLogin={(id: Id<"users">) => setUserId(id)} />}
              </Stack.Screen>
              <Stack.Screen name="Signup" component={SignupScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </ConvexProvider>
  );
}
