import { Image, StyleSheet, Platform } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { HelloWave } from "@/components/HelloWave";

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      {/* Tiêu đề chính */}
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.title}>
          Chào mừng đến với Ứng Dụng của Tôi!
        </ThemedText>
        <HelloWave />
      </ThemedView>

      {/* Thông tin giới thiệu */}
      <ThemedView style={styles.introContainer}>
        <ThemedText type="subtitle" style={styles.subtitle}>
          Giới thiệu về ứng dụng
        </ThemedText>
        <ThemedText style={styles.descriptionText}>
          Đây là một ứng dụng mẫu giúp bạn làm quen với React Native. Ứng dụng
          hỗ trợ nhiều tính năng thú vị và dễ sử dụng.
        </ThemedText>
      </ThemedView>

      {/* Các bước sử dụng ứng dụng */}
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle" style={styles.subtitle}>
          Các bước bắt đầu
        </ThemedText>
        <ThemedText style={styles.text}>
          1. Tìm hiểu về các tính năng của ứng dụng.
        </ThemedText>
        <ThemedText style={styles.text}>
          2. Bắt đầu chỉnh sửa và thử nghiệm ứng dụng của bạn.
        </ThemedText>
        <ThemedText style={styles.text}>
          3. Hãy tận hưởng việc lập trình và phát triển dự án của bạn!
        </ThemedText>
      </ThemedView>

      {/* Thông điệp chào mừng */}
      <ThemedView style={styles.footerContainer}>
        <ThemedText style={styles.footerText}>
          Cảm ơn bạn đã sử dụng ứng dụng của chúng tôi. Chúc bạn lập trình vui
          vẻ!
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
  },
  reactLogo: {
    height: 150,
    width: 150,
    marginBottom: 20,
  },
  introContainer: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1e90ff",
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 18,
    color: "#333",
    lineHeight: 24,
    textAlign: "center",
  },
  stepContainer: {
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 18,
    color: "#555",
    marginVertical: 5,
  },
  footerContainer: {
    alignItems: "center",
    marginTop: 40,
    paddingBottom: 20,
  },
  footerText: {
    fontSize: 18,
    color: "#888",
    fontStyle: "italic",
  },
});
