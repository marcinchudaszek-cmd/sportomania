import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.beagleappsstudio.sportomania",
  appName: "SportoMania",
  webDir: "dist-cap",
  server: {
    androidScheme: "https",
  },
  plugins: {
    LocalNotifications: {
      smallIcon: "ic_stat_sportomania",
      iconColor: "#10b981",
    },
  },
};

export default config;
