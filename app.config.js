import 'dotenv/config';

export default ({ config }) => {
  // config 매개변수에는 기본 설정이 포함될 수 있으며, 필요한 경우 이를 확장하거나 수정합니다.
  // 여기서는 app.json의 "expo" 객체 내용을 직접 반환합니다.
  return {
    ...config, // 기본 설정을 유지하고 싶다면 추가
    name: "weather-app",
    slug: "weather-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true, // 새 아키텍처는 필요에 따라 주석 해제 또는 설정
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      // package: "com.yourcompany.weatherapp", // 안드로이드 패키지 이름 (필요시 설정)
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    // 환경 변수를 추가하려면 'extra' 객체를 여기에 추가합니다.
    // 예:
    extra: {
      googleMapApiKey: process.env.GOOGLE_MAP_API_KEY,
    },
    // EAS Build를 사용하는 경우 projectId를 추가합니다.
    // eas: {
    //   projectId: "your-eas-project-id" // EAS 웹사이트에서 확인
    // }
  };
};