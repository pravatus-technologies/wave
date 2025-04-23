import { View, Image } from 'react-native';

import { ImageButton } from '@components/controls';
import { useAuth, useTheme } from '@context';

import AppIcon from '../../components/controls/AppIcon';

export default function MainHeader(): JSX.Element {
  const { sizes, assets } = useTheme();
  const { profile } = useAuth();

  return (
    <View
      style={{
        height: sizes.headerHeight - sizes.base * 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Image source={assets.appLogo} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <ImageButton onPress={() => console.log('notification')}>
          <AppIcon name="bell" size={sizes.h4} />
        </ImageButton>
        {profile?.pictureUri && (
          <Image
            source={{ uri: profile.pictureUri }}
            style={{
              width: sizes.avatarSize,
              height: sizes.avatarSize,
              borderRadius: sizes.avatarSize / 2,
              marginLeft: sizes.s,
            }}
          />
        )}
      </View>
    </View>
  );
}
