import { StyleSheet, View } from 'react-native';
import { useState } from 'react';
import OtpInput from '@praisecodes/otp-input';

export default function App() {
  const [value, setValue] = useState<string>("");

  return (
    <View style={styles.container}>
      <OtpInput
        length={5}
        onChange={(val) => { setValue(val); console.log([...val]) }}
        value={value}
        inputStyle={{
          textAlign: "center",
          borderBottomWidth: 2,
          borderWidth: 0,
          borderRadius: 0
        }}
        placeholder='0'
        tintColor='#00f'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
