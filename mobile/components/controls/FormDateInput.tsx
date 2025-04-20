import { Pressable, TextInput, Text, View, Platform } from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useEffect, useState } from 'react';

import { FormDateInputProps } from '@constants/types';
import { useTheme } from '@context';
import { isOfLegalAge, isValidDateValue } from '@utils/helpers';
import { AppIcon } from 'src/components';

export default function FormDateInput({
  value,
  onChangeText,
  onValidationChange,
  hint = 'YYYY/MM/DD',
  showCalendar = true,
  inputStyle,
  containerStyle,
  errorText,
}: FormDateInputProps) {
  const { colors, sizes } = useTheme();
  const [internalValue, setInternalValue] = useState(value ?? '');
  const [hasError, setHasError] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    if (value !== undefined && value !== internalValue) {
      setInternalValue(value);
    }
  }, [value]);

  const openDatePicker = () => {
    setShowPicker(true);
  };

  const handleChange = (input: string) => {
    const digitsOnly = input.replace(/[^\d]/g, '');

    let formatted = digitsOnly;
    if (digitsOnly.length > 4) {
      formatted = `${digitsOnly.slice(0, 4)}/$digitsOnly.slice(4)`;
    }
    if (digitsOnly.length > 6) {
      formatted = `${digitsOnly.slice(0, 4)}/${digitsOnly.slice(4, 6)}/${digitsOnly.slice(6, 8)}`;
    }

    setInternalValue(formatted);
    onChangeText?.(formatted);
    const valid = isValidDateValue(formatted) && isOfLegalAge(formatted);
    setHasError(!valid);
    onValidationChange?.(valid);
  };

  const handleDateChange = (_: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) {
      const yyyy = selectedDate.getFullYear();
      const mm = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const dd = String(selectedDate.getDate()).padStart(2, '0');
      const formatted = `${yyyy}/${mm}/${dd}`;
      handleChange(formatted);
    }
  };

  return (
    <View style={[containerStyle]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.card,
          borderRadius: 10,
          paddingHorizontal: 10,
        }}
      >
        <TextInput
          value={internalValue}
          onChangeText={handleChange}
          keyboardType="numeric"
          placeholder={hint}
          placeholderTextColor={colors.hint}
          style={[
            {
              flex: 1,
              paddingVertical: sizes.padding,
              color: colors.text,
            },
            inputStyle,
          ]}
          maxLength={10}
        />
        {showCalendar && (
          <Pressable onPress={openDatePicker}>
            <AppIcon name="Calendar" size={20} color={colors.hint} />
          </Pressable>
        )}
      </View>
      {hasError && errorText && (
        <Text style={{ color: colors.danger, fontSize: 12, marginTop: 4 }}>{errorText}</Text>
      )}

      {showPicker && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
          maximumDate={new Date()}
        />
      )}
    </View>
  );
}
