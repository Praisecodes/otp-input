// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
// const path = require("path");

// const myExtraModuleDir = path.resolve(__dirname, "../");
// const extraNodeModules = {
//   // '@praisecodes/otp-input': myExtraModuleDir,
//   'react': path.resolve(__dirname, "node_modules/react"),
//   'react-native': path.resolve(__dirname, "node_modules/react-native")
// };
// const watchFolders = [myExtraModuleDir];

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// config.watchFolders = watchFolders;
// config.resolver = {
//   ...config.resolver,
//   extraNodeModules: new Proxy(extraNodeModules, {
//     get: (target, name) => {
//       return name in target ? target[name] : path.join(process.cwd(), `node_modules/${name.toString()}`)
//     }
//   })
// }

module.exports = config;
