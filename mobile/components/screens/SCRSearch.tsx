import { SafeAreaView, TextInput, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useLayoutEffect, useRef } from 'react';

import { CTRLIcon, CTRLImageButton } from '@components/controls';
import { useTheme, useTranslation } from '@context';

export default function SCRSearchModal(): JSX.Element {
  const { colors, sizes } = useTheme();
  const { t } = useTranslation();
  const navigation = useNavigation();
  const router = useRouter();
  const inputRef = useRef<TextInput>(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.card,
        marginHorizontal: sizes.s,
      }}
    >
      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          height: sizes.headerHeight,
          backgroundColor: colors.card,
        }}
      >
        <CTRLImageButton onPress={() => router.back()}>
          <CTRLIcon name="ChevronLeft" />
        </CTRLImageButton>
        <View style={{ flex: 1 }}>
          <TextInput
            placeholder={t('common.search')}
            style={{
              height: sizes.inputHeight,
              padding: sizes.inputPadding,
              borderColor: colors.gray,
              borderWidth: sizes.inputBorder,
              borderRadius: sizes.inputRadius,
              marginRight: sizes.s,
            }}
            ref={inputRef}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
