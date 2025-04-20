import { Pressable, TextInput, Text, View, Platform, Modal } from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useEffect, useState } from 'react';

import { FormDateInputProps } from '@constants/types';
import { useTheme, useTranslation } from '@context';
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
  const { locale } = useTranslation();
  const [internalValue, setInternalValue] = useState(value ?? '');
  const [hasError, setHasError] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [tempDate, setTempDate] = useState<Date>(new Date());

  useEffect(() => {
    if (value !== undefined && value !== internalValue) {
      setInternalValue(value);
    }
  }, [value]);

  const openDatePicker = () => {
    let initial = new Date();

    if (internalValue && isValidDateValue(internalValue)) {
      const [year, month, day] = internalValue.split('/').map(Number);
      if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
        initial = new Date(year, month - 1, day);
      }
    }

    setTempDate(initial);
    setShowPicker(true);
  };

  const handleChange = (input: string) => {
    const digitsOnly = input.replace(/[^\d]/g, '');

    let formatted = digitsOnly;
    if (digitsOnly.length > 4) {
      formatted = `${digitsOnly.slice(0, 4)}/${digitsOnly.slice(4)}`;
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
    if (selectedDate) {
      setTempDate(selectedDate); // just set the temp date
    }
  };

  const applyDate = (selectedDate: Date) => {
    const yyyy = selectedDate.getFullYear();
    const mm = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const dd = String(selectedDate.getDate()).padStart(2, '0');
    const formatted = `${yyyy}/${mm}/${dd}`;
    handleChange(formatted); // triggers validation too
    setShowPicker(false);
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
      <Modal visible={showPicker} transparent animationType="slide">
        <View
          style={{
            flex: 1,
            backgroundColor: '#00000080',
            justifyContent: 'flex-end',
          }}
        >
          <View
            style={{
              backgroundColor: colors.card,
              padding: 20,
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
            }}
          >
            <DateTimePicker
              value={tempDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleDateChange}
              maximumDate={new Date()}
              style={{ width: '100%' }}
              locale={locale}
            />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 16,
              }}
            >
              <Pressable onPress={() => setShowPicker(false)}>
                <Text style={{ color: colors.hint, fontSize: 16 }}>Cancel</Text>
              </Pressable>
              <Pressable onPress={() => applyDate(tempDate)}>
                <Text style={{ color: colors.primary, fontSize: 16 }}>Done</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
