import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  SafeAreaView,
  Button,
  Text,
  View,
  StyleSheet,
  useColorScheme,
  TextInput,
  ActivityIndicator,
} from 'react-native';

function App() {
  const isDarkMode = useColorScheme();
  const [url, setUrl] = useState('');
  const [keys, setKeys] = useState('');
  const [saveLoad, setSaveLoad] = useState(false);
  const [getLoad, setGetLoad] = useState(false);

  const saveUrl = async data => {
    setSaveLoad(true);
    try {
      await AsyncStorage.setItem('url', data);
      setTimeout(() => {
        setSaveLoad(false);
        setKeys('');
      }, 1000);
    } catch (error) {
      setSaveLoad(false);
    }
  };

  const getUrl = async () => {
    setGetLoad(true);
    try {
      let value = await AsyncStorage.getItem('url');
      setKeys(value);
      setTimeout(() => {
        setGetLoad(false);
      }, 1000);
    } catch (error) {
      setGetLoad(false);
    }
  };

  return (
    <SafeAreaView>
      {saveLoad || getLoad ? (
        <View style={styles.containerLoader}>
          <ActivityIndicator size={65} />
        </View>
      ) : (
        <View style={!isDarkMode ? styles.containerInverted : styles.container}>
          <Text style={!isDarkMode ? styles.textTitleWhite : styles.textTitle}>
            INI APP BARU
          </Text>
          <TextInput
            value={url}
            onChangeText={val => setUrl(val)}
            style={styles.textInput}
          />
          <Button title="JADIKAN URL" onPress={() => saveUrl(url)} />
          <TextInput editable={false} value={keys} style={styles.textInput} />
          <Button title="DAPATKAN URL" onPress={() => getUrl()} />
        </View>
      )}
    </SafeAreaView>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    height: '100%',
    paddingHorizontal: 20,
  },
  containerInverted: {
    alignItems: 'flex-end',
    backgroundColor: '#77AAFFDD',
    height: '100%',
    paddingHorizontal: 20,
  },
  containerLoader: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  textTitle: {
    fontSize: 26,
    color: 'black',
  },
  textTitleWhite: {
    fontSize: 26,
    color: 'white',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#0AA',
    width: '100%',
  },
});
