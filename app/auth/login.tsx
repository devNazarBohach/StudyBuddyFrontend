import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  TextInput,
} from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { API_BASE_URL } from "@/constants/api";

type LoginPayload = {
  email: string;
  password: string;
};


export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  function validate(p: LoginPayload) {
    if (!p.email.trim() || !p.password.trim()) return "Email and password are required";
    if (!p.email.includes("@")) return "Email looks invalid";
    if (p.password.length < 8) return "Password must be at least 8 characters";
    return null;
  }

  async function onLogin() {
    const payload: LoginPayload = { email: email.trim(), password };

    const err = validate(payload);
    if (err) {
      Alert.alert("Validation error", err);
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const text = await res.text();

      if (!res.ok) {
        Alert.alert("Login failed", text || `HTTP ${res.status}`);
        return;
      }

      Alert.alert("Success", "Logged in");

    } catch (e: any) {
      Alert.alert("Network error", e?.message ?? "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Login</ThemedText>

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
        placeholderTextColor="#888"
      />

      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        placeholderTextColor="#888"
      />

      <Pressable style={styles.primaryBtn} onPress={onLogin} disabled={loading}>
        {loading ? <ActivityIndicator /> : <ThemedText style={styles.primaryBtnText}>Login</ThemedText>}
      </Pressable>

      <Pressable onPress={() => router.back()} style={styles.linkBtn}>
        <ThemedText type="link">Back</ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center", gap: 12 },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: "white",
    color: "black",
  },
  primaryBtn: {
    height: 48,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#111",
    marginTop: 8,
  },
  primaryBtnText: { color: "white", fontWeight: "600" },
  linkBtn: { marginTop: 8, alignItems: "center" },
});