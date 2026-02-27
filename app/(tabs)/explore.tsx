import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function ExploreTest() {
  return (
    <View style={{ flex: 1, padding: 24, justifyContent: "center", gap: 16 }}>
      <Text style={{ fontSize: 28, fontWeight: "700" }}>EXPLORE TEST 123</Text>

      <Pressable
        onPress={() => router.push("/auth/register")}
        style={{ padding: 14, backgroundColor: "red", borderRadius: 12 }}
      >
        <Text style={{ color: "white", fontWeight: "700" }}>OPEN REGISTER</Text>
      </Pressable>
    </View>
  );
}