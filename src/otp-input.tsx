import {
  View,
  TextInput,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  StyleSheet,
  StyleProp,
  TextStyle,
  ViewStyle
} from 'react-native';
import React, { useRef, useState } from 'react';

interface Props {
  length: number;
  value: string;
  onChange: (e: string) => void;
  inputStyles?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

const OtpInput = ({ length, value, onChange, inputStyles, containerStyle }: Props) => {
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const [values, setValues] = useState<string[]>(Array.from({ length }, (_, index) => value[index]));

  const handleTextChange = async (text: string, index: number) => {
    let existingValues = [...values];
    if (text.length > 1) {
      existingValues = [...text].slice(0, length + 1);
      inputRefs.current[length - 1]?.focus();
    } else {
      existingValues[index] = text;
    }
    setValues(existingValues);
    onChange(existingValues.join(""));

  }

  const handleKeyPressed = async (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
    if (e.nativeEvent.key === "Backspace") {
      const vals = [...values];
      vals[index] = "";
      setValues(vals);

      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else {
      if (index <= length) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  }

  return (
    <View style={containerStyle || styles.inputContainer}>
      {Array.from({ length }).map((_, index) => (
        <TextInput
          key={index}
          ref={el => { inputRefs.current[index] = el }}
          style={[inputStyles || styles.input]}
          maxLength={(index === length - 1) ? 1 : undefined}
          keyboardType="number-pad"
          onChangeText={(e) => handleTextChange(e, index)}
          onKeyPress={(e) => handleKeyPressed(e, index)}
          value={values[index]}
        />
      ))}
    </View>
  )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: "center"
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row"
  },
  input: {
    borderWidth: 1,
    borderColor: "#555",
    height: 50,
    width: 50,
    marginHorizontal: 10,
    borderRadius: 10,
    textAlign: "center"
  }
});

export default OtpInput;
