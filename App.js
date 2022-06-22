import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import { launchCamera } from 'react-native-image-picker';

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const callCamera = () =>
    new Promise(resolve => {
      launchCamera(
        {
          mediaType: 'photo',
          quality: 0.3,
          includeBase64: true,
          cameraType: 'back',
        },
        result => {
          if (result.didCancel) {
            resolve(false);
          }

          if (result.errorCode) {
            resolve(null);
          }

          if (result.assets) {
            const { uri, base64, fileName, type } = result?.assets[0];
            resolve({
              uri,
              base64,
              fileName,
              type,
            });
          }
        },
      );
    });

    const handleCamera = async () => {
      return (await callCamera());
    };

  const onSelfie = async () => {
    const { uri, fileName } = await handleCamera();
  };

  return (
      <View
        style={{
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
        }}>
          <TouchableOpacity
            onPress={onSelfie}
          >
            <Text>Hola mundo</Text>
          </TouchableOpacity>
      </View>
  );
};

export default App;
