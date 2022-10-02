const { withNativebase } = require("@native-base/next-adapter");
const path = require("path");

const nextConfig = {
  // reactStrictMode: true,
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js', 'api.js', 'api.ts'],
  images: {
    loader: "custom",
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  env: {
    nextImageExportOptimizer_imageFolderPath: "public/images",
    nextImageExportOptimizer_exportFolderPath: "out",
    nextImageExportOptimizer_quality: 90,
    nextImageExportOptimizer_storePicturesInWEBP: true,
    //nextImageExportOptimizer_generateAndUseBlurImages: true,
  },
  // swcMinify: true,
}

module.exports = withNativebase({
  dependencies: ["@native-base/icons", "react-native-web-linear-gradient"],
  nextConfig: {
    webpack: (config, options) => {
      config.module.rules.push({
        test: /\.ttf$/,
        loader: "url-loader", // or directly file-loader
        include: path.resolve(__dirname, "node_modules/@native-base/icons"),
      });
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        "react-native$": "react-native-web",
        "react-native-linear-gradient": "react-native-web-linear-gradient",
      };
      config.resolve.extensions = [
        ".web.js",
        ".web.ts",
        ".web.tsx",
        ...config.resolve.extensions,
      ];
      return config;
    },
    ...nextConfig
  },
});
