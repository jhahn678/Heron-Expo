import { useState, useEffect } from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import IonIcon from 'react-native-vector-icons/Ionicons'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { Camera, CameraType, FlashMode } from 'expo-camera'
import { StatusBar } from 'expo-status-bar'
import uuid from 'react-native-uuid'
import { RootStackScreenProps } from '../../types/navigation'
import { useImageStore } from '../../store/image/useImageStore'

const { width } = Dimensions.get('window')

const CameraScreen = ({ navigation }: RootStackScreenProps<'CameraScreen'>): JSX.Element => {
    
    const [cameraRef, setCameraRef] = useState<Camera | null>(null)
    const [cameraType, setCameraType] = useState(CameraType.back)
    const [hasPermission, setHasPermission] = useState<Boolean | null>(null)
    const [flash, setFlash] = useState('off')
    const imageStore = useImageStore()


    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })()
    },[])   

    const handleFlipCamera = () => {
        setCameraType(type => type === CameraType.back ? CameraType.front : CameraType.back )
    }

    const handleFlash = () => {
        setFlash(flash => {
            if(flash === 'on') return 'auto'
            if(flash === 'auto') return 'off'
            if(flash === 'off') return 'on'
            return 'on'
        })
    }

    const handleTakePicture = async () => {
        if(!cameraRef) return;
        const { height, width, uri } = await cameraRef.takePictureAsync()
        imageStore.appendImages({ uri, height, width })
        navigation.goBack()
    }
    
    return (
        <View style={styles.container}>
            <StatusBar style='auto'/>
            { hasPermission && 
                <>
                    <View style={styles.header}>
                        <IonIcon size={36} name='close' style={styles.goBackButton} onPress={navigation.goBack}/>
                    </View>
                    <Camera type={cameraType} flashMode={flash as FlashMode}
                        ref={ref => setCameraRef(ref)} ratio='4:3'
                        style={{ height: (width * (4/3)), width: width }}
                    />
                    <View style={styles.footer}>
                        <TouchableOpacity onPress={handleFlash} style={styles.flashIcon}>
                        { flash === 'on' && <MaterialIcon name='flash-on' size={36} color='#fefefe'/> }
                        { flash === 'off' && <MaterialIcon name='flash-off' size={36} color='#fefefe'/> }
                        { flash === 'auto' && <MaterialIcon name='flash-auto' size={36} color='#fefefe'/> }
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.takePicture} onPress={handleTakePicture}>
                            <IonIcon name='camera-outline' size={36} color='#fefefe'/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.flipCamera} onPress={handleFlipCamera}>
                            <IonIcon name='camera-reverse-outline' size={36} color='#fefefe'/>
                        </TouchableOpacity>
                    </View>
                </>
            }
            { !hasPermission &&
                <View style={{ height: '100%', display: 'flex', justifyContent: 'center'}}>
                    <Text style={{ alignSelf: 'center', width: 200, textAlign: 'center' }}>
                        Camera permissions must be turned on to take pictures
                    </Text>
                </View>
            }
        </View>
    )
}

export default CameraScreen

const styles = StyleSheet.create({
    container: {
        height: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: 'black'
    },
    camera: {
        width: '100%'
    },
    header: {
        backgroundColor: 'rgb(0,0,0)',
        width: '100%',
        minHeight: 60,
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        paddingBottom: 12,
        paddingRight: 8
    },
    footer: {
        backgroundColor: 'rgb(0,0,0)',
        width: '100%',
        minHeight: 120,
        flexGrow: 3,
        display: 'flex',
        justifyContent: 'center',
    },
    goBackButton: {
        color: '#fefefe'
    },
    takePicture: {
        color: '#fefefe',
        borderColor: '#fefefe',
        borderWidth: 4,
        borderRadius: 50,
        height: 86,
        width: 86,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    flipCamera: {
        position: 'absolute',
        right: 24
    },
    flashIcon: {
        color: '#fefefe',
        position: 'absolute',
        left: 24
    }
})