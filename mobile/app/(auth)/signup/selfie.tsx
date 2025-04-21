import {
  Button,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Image,
} from 'react-native';

import MaskedView from '@react-native-masked-view/masked-view';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState, useRef } from 'react';
import Svg, { Rect, Defs, Mask } from 'react-native-svg';

const { width, height } = Dimensions.get('window');
const BASE_CIRCLE_SIZE = 260;
const CIRCLE_SIZE = BASE_CIRCLE_SIZE * 1.15;

export default function SelfieStep(): JSX.Element {
  const [permission, requestPermission] = useCameraPermissions();
  const [capturedUri, setCapturedUri] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const router = useRouter();

  const cameraRef = useRef(null);

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const handleCapture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setCapturedUri(photo.uri);
      setShowPreview(true);
    }
  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={'front'} ref={cameraRef}>
        {/* Masked Overlay */}
        <MaskedView
          style={StyleSheet.absoluteFill}
          maskElement={
            <Svg height={height} width={width}>
              <Defs>
                <Mask id="mask" x="0" y="0" width="100%" height="100%">
                  <Rect x="0" y="0" width="100%" height="100%" fill="white" />
                </Mask>
              </Defs>
              <Rect x="0" y="0" width="100%" height="100%" fill="black" mask="url(#mask)" />
            </Svg>
          }
        >
          <View style={styles.overlay}>
            <LinearGradient
              colors={['rgba(0,0,0,0.6)', 'transparent']}
              style={styles.topGradient}
            />
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.6)']}
              style={styles.bottomGradient}
            />
          </View>
        </MaskedView>

        {/* Close button at top-left */}
        <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
          <Text style={styles.closeText}>×</Text>
        </TouchableOpacity>

        {/* Capture button at bottom center */}
        <View style={styles.captureWrapper}>
          <TouchableOpacity style={styles.captureButton} onPress={handleCapture}>
            <View style={styles.captureInnerCircle} />
          </TouchableOpacity>
        </View>
      </CameraView>

      {/* Capture preview modal */}
      <Modal visible={showPreview} transparent animationType="slide">
        <View style={styles.previewContainer}>
          {capturedUri && (
            <View style={styles.cropContainer}>
              <Image source={{ uri: capturedUri }} style={styles.croppedPreview} />
            </View>
          )}
          <View style={styles.previewButtons}>
            <TouchableOpacity style={styles.previewButton} onPress={() => setShowPreview(false)}>
              <Text style={styles.text}>Retake</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.previewButton}
              onPress={() => alert('Upload logic here')}
            >
              <Text style={styles.text}>Upload</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
  },
  topGradient: {
    position: 'absolute',
    top: 0,
    height: 200,
    width: '100%',
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    height: 200,
    width: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
  },
  captureWrapper: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    alignItems: 'center',
  },
  captureButton: {
    width: 70,
    height: 70,
    backgroundColor: '#ffffff',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureInnerCircle: {
    width: 50,
    height: 50,
    backgroundColor: '#000',
    borderRadius: 25,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  previewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  cropContainer: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    overflow: 'hidden',
    backgroundColor: '#000',
    marginBottom: 20,
    borderWidth: 4,
    borderColor: '#58a6ff',
    shadowColor: '#58a6ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 10,
  },
  croppedPreview: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    resizeMode: 'cover',
  },
  previewButtons: {
    flexDirection: 'row',
    gap: 16,
  },
  previewButton: {
    backgroundColor: '#1c1c1e',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
});
