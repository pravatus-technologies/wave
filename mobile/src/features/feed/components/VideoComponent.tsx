import { VideoView, useVideoPlayer } from 'expo-video';
import { StyleSheet, View } from 'react-native';
export default function VideoComponent({ source }: { source: string }): JSX.Element {
  const player = useVideoPlayer(source, player => {
    player.loop = true;
    player.play();
  });

  return (
    <View style={styles.container}>
      <VideoView player={player} style={styles.video} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  video: { width: 320, height: 180 },
});
