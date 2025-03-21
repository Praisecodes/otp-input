import {
  View,
  TextInput,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  StyleSheet,
  StyleProp,
  TextStyle,
  ViewStyle,
  TextInputFocusEventData
} from 'react-native';
import React, { useRef, useState } from 'react';

interface Props {
  length: number;
  value: string;
  onChange: (e: string) => void;
  inputStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  placeholder?: string;
  placeholderTextColor?: string;
  tintColor?: string;
  autoFocus?: boolean;
}

const OtpInput = ({
  length,
  value,
  onChange,
  inputStyle,
  containerStyle,
  placeholder,
  placeholderTextColor,
  tintColor,
}: Props) => {
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const [values, setValues] = useState<string>(value.slice(0, length));

  const handleTextChange = async (text: string) => {
    let existingValue = values;

    if (text.length > 1) {
      const currentLength = existingValue.length;
      const valuesToAdd = text.slice(0, length - currentLength);
      existingValue += valuesToAdd;

      const index: number = existingValue.length === length ? length - 1 : existingValue.length;
      inputRefs.current[index]?.focus();
    } else {
      existingValue += text;
    }

    setValues(existingValue)
    onChange(existingValue);
  }

  const handleKeyPressed = async (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
    if (e.nativeEvent.key === "Backspace") {
      const vals = [...values];
      vals[index] = "";
      setValues(vals.join(""));

      if (index > 0) inputRefs.current[index - 1]?.focus();
    } else {
      if (index <= length) inputRefs.current[index + 1]?.focus();
    }
  }

  const textInputStyles = (index: number) => {
    return ([
      {
        ...styles.input,
        borderColor: (inputRefs.current[index]?.isFocused()
          ? tintColor ?? "#00ff00"
          : StyleSheet.flatten(inputStyle)?.borderColor ?? "#000"),
      },
      inputStyle
    ])
  }

  const onFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>, index: number) => {
    inputRefs.current[index]?.focus();
  }

  return (
    <View style={containerStyle || styles.inputContainer}>
      {Array.from({ length }).map((_, index) => (
        <TextInput
          key={index}
          ref={el => { inputRefs.current[index] = el }}
          style={textInputStyles(index)}
          maxLength={values[index] ? 1 : undefined}
          onFocus={(e) => onFocus(e, index)}
          keyboardType="number-pad"
          onChangeText={handleTextChange}
          onKeyPress={(e) => handleKeyPressed(e, index)}
          value={values[index]}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
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
