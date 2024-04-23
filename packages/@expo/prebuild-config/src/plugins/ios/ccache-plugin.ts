import { ConfigPlugin, withPodfileProperties } from '@expo/config-plugins';

/**
 * Sets the `ccache` property in the Podfile.properties.json file to enable caching of subsequent iOS builds.
 * Requires additional setup and doesn't always work https://reactnative.dev/docs/build-speed#xcode-specific-setup
 * I was able to get it working with `brew install ccache`.
 * After `experiments.ccacheIos` is enabled, prebuild and pod install must be run again.
 * Running `cache -s` prints the cache statistics. Run this after a successful iOS build to see the progress.
 * The ccache can be cleared with `ccache --clear` for sanity.
 * Ref PR (first available react-native@0.74.0): https://github.com/facebook/react-native/commit/e85d51c6f161c709706044c5955ac5397e746fa1
 */
export const withCcachePodfileProperties: ConfigPlugin = (config) => {
  return withPodfileProperties(config, (config) => {
    // @ts-expect-error: not available on ExpoConfig yet.
    if (config.experiments.ccacheIos) {
      config.modResults['ccache'] = 'true';
    } else {
      delete config.modResults['ccache'];
    }
    return config;
  });
};
