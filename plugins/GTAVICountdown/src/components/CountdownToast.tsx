import { findByProps } from '@revenge-mod/metro'
import { ReactNative } from '@revenge-mod/metro/common'
import { storage } from '@vendetta/plugin'
import { LOGO_URL } from '../constants'

const { View, Text, Image, StyleSheet } = ReactNative

const LinearGradient = findByProps('LinearGradient')?.default

const DefaultColors = {
    primary: '#E146C6',
    secondary: '#14acc0',
    white: '#ffffff',
    lightGray: '#aaaaaa',
}

interface CountdownToastProps {
    days: number
}

const styles = StyleSheet.create({
    gradientBorder: {
        borderRadius: 8,
        padding: 1,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#000000e6',
        borderRadius: 7,
        padding: 8,
    },
    logo: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
    },
    separator: {
        width: 1,
        height: '80%',
        backgroundColor: DefaultColors.secondary,
        marginHorizontal: 10,
        opacity: 0.6,
    },
    textContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft: 4,
    },
    headerText: {
        color: DefaultColors.white,
        fontSize: 12,
        fontWeight: 'medium',
        opacity: 0.8,
    },
    countdownRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 4,
    },
    daysText: {
        fontSize: 22,
        fontWeight: '900',
        textShadowRadius: 12,
        marginRight: 4,
    },
    subText: {
        fontSize: 14,
        fontWeight: 'bold',
        textShadowRadius: 10,
    },
    footerText: {
        color: DefaultColors.lightGray,
        fontSize: 9,
    },
})

export default function CountdownToast({ days }: CountdownToastProps) {
    if (!LinearGradient) return null

    // On récupère tous les textes personnalisés
    const customTitle = storage.customTitle || 'GRAND THEFT AUTO VI'
    const customDescription = storage.customDescription || 'Coming 19th Nov 2026'
    const customDaysText = storage.customDaysText || 'DAYS LEFT'
    
    // On récupère les couleurs (avec une valeur par défaut si c'est vide)
    const color1 = storage.customColor1 && storage.customColor1.trim() !== '' ? storage.customColor1 : DefaultColors.primary
    const color2 = storage.customColor2 && storage.customColor2.trim() !== '' ? storage.customColor2 : DefaultColors.secondary

    const showImage = storage.showImage ?? true
    const currentImageUrl = storage.customImageUrl && storage.customImageUrl.trim() !== '' ? storage.customImageUrl : LOGO_URL

    return (
        <LinearGradient
            colors={[color1, color2]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.gradientBorder}
        >
            <View style={styles.container}>
                
                {showImage && (
                    <>
                        <Image source={{ uri: currentImageUrl }} style={styles.logo} />
                        <View style={[styles.separator, { backgroundColor: color2 }]} />
                    </>
                )}

                <View style={styles.textContainer}>
                    <Text style={styles.headerText}>{customTitle}</Text>

                    <View style={styles.countdownRow}>
                        {/* On applique la couleur 1 au chiffre et la couleur 2 au texte pour correspondre au dégradé */}
                        <Text style={[styles.daysText, { color: color1, textShadowColor: color1 }]}>{days}</Text>
                        <Text style={[styles.subText, { color: color2, textShadowColor: color2 }]}>{customDaysText}</Text>
                    </View>

                    <Text style={styles.footerText}>{customDescription}</Text>
                </View>
            </View>
        </LinearGradient>
    )
}