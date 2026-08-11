import { findByProps } from '@revenge-mod/metro'
import { ReactNative } from '@revenge-mod/metro/common'
import { logger } from '@vendetta'
import { storage } from '@vendetta/plugin'
import CountdownToast from './components/CountdownToast'
import { DEFAULT_DURATION, LOGO_URL } from './constants'

const { Image } = ReactNative as any
const Toasts = findByProps('open', 'close')
const UuidModule = findByProps('uuid4')

export const getDaysUntilRelease = () => {
    const val = storage.customDate
    
   
    if (!val || val.trim() === '') {
        return ''
    }

    const target = new Date(val)
    
    
    if (isNaN(target.getTime())) {
        return val
    }

    
    const now = new Date()
    const difference = target.getTime() - now.getTime()
    return Math.ceil(difference / (1000 * 60 * 60 * 24))
}

export const showCountdownToast = async () => {
    try {
        const daysOrText = getDaysUntilRelease()
        const durationSec = Number(storage.displayDuration) || DEFAULT_DURATION
        
        const imageUrlToLoad = storage.customImageUrl && storage.customImageUrl.trim() !== '' ? storage.customImageUrl : LOGO_URL

        if (storage.showImage !== false) {
            await Image.prefetch(imageUrlToLoad).catch(() => null)
        }

        if (Toasts) {
            Toasts.open({
                key: `custom-toast-${UuidModule ? UuidModule.uuid4() : Math.random()}`,
                content: <CountdownToast days={daysOrText} />,
                containerStyle: {
                    backgroundColor: 'transparent',
                    borderColor: 'transparent',
                    shadowColor: 'transparent',
                },
                toastDurationMs: durationSec * 1000,
            })
        }
    } catch (error) {
        logger.error('Failed to show countdown toast:', error)
    }
}