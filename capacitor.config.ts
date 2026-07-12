import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.sportomania.app",
  appName: "SportoMania",
  webDir: "dist-cap",
  server: {
    androidScheme: "https",
  },
};

export default config;
