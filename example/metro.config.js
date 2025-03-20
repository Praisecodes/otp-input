// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const path = require("path");

const baseDir = path.resolve(__dirname, "../");
const extraNodeModules = {
  '@praisecodes/otp-input': baseDir
};
const watchFolders = [baseDir];

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.watchFolders = watchFolders;
config.resolver = {
  ...config.resolver,
  extraNodeModules: new Proxy(extraNodeModules, {
    get: (target, name) => {
      return name in target ? target[name] : path.join(process.cwd(), `node_modules/${name.toString()}`)
    }
  })
}

module.exports = config;
