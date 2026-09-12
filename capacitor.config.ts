import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.beagleappsstudio.sportomania",
  appName: "SportoMania",
  webDir: "dist-cap",
  server: {
    androidScheme: "https",
  },
};

export default config;
