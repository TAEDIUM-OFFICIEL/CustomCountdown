import Text from '@lib/components/Text'
import { findRedesignComponent } from '@lib/types'
import { components, type React, ReactNative } from '@revenge-mod/metro/common'
import { storage } from '@vendetta/plugin'
import { useProxy } from '@vendetta/storage'
import { getAssetIDByName } from '@vendetta/ui/assets'
import { FREQUENCIES } from './constants'
import { showCountdownToast } from './utils'

type ButtonType = typeof components.Button
type TableRadioRowType = typeof components.TableRadioRow
interface TableRadioGroupProps {
    title?: string
    value?: string
    defaultValue?: string
    hasIcons?: boolean
    onChange?: (v: any) => void
    children?: React.ReactNode
}

const Button = findRedesignComponent('Button') as ButtonType
const RawSlider = findRedesignComponent('Slider')
const TableRadioGroup = findRedesignComponent('TableRadioGroup') as React.FC<TableRadioGroupProps>
const TableRadioRow = findRedesignComponent('TableRadioRow') as TableRadioRowType

const { TableRowGroup, Stack, TableRow } = components
const { ScrollView, View, TextInput, Switch } = ReactNative

const Slider = (props: any) => (
    <View style={{ marginTop: 8 }}>
        {RawSlider ? (
            <RawSlider {...props} onValueChange={(val: any) => props.value !== val && props.onValueChange?.(val)} />
        ) : (
            <Text color="TEXT_FEEDBACK_CRITICAL">Missing Slider</Text>
        )}
    </View>
)

const LANGUAGES = [
    { label: 'Français', value: 'fr', description: 'Textes par défaut en Français' },
    { label: 'English', value: 'en', description: 'Default text in English' }
]

export default function Settings() {
    useProxy(storage)
    
    // On vérifie la langue pour tout le menu
    const isFr = storage.language === 'fr'
    const showImg = storage.showImage ?? true

    return (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 38 }}>
            <Stack style={{ paddingVertical: 24, paddingHorizontal: 16 }} spacing={24}>
                
                {/* --- SÉLECTION DE LA LANGUE --- */}
                <TableRadioGroup
                    title={isFr ? "Langue par défaut (Si champs vides)" : "Default Language (If fields are empty)"}
                    defaultValue={storage.language || 'en'}
                    onChange={(v: string) => (storage.language = v)}
                >
                    {LANGUAGES.map(lang => (
                        <TableRadioRow
                            key={lang.value}
                            label={lang.label}
                            subLabel={lang.description}
                            value={lang.value}
                        />
                    ))}
                </TableRadioGroup>

                <TableRowGroup title={isFr ? "Personnalisation" : "Customization"}>
                    
                    {/* Bouton On/Off pour l'image */}
                    <TableRow
                        label={isFr ? "Afficher l'image" : "Show image"}
                        subLabel={isFr ? "Active ou désactive l'image à gauche" : "Enable or disable the left image"}
                        trailing={
                            <Switch 
                                value={showImg} 
                                onValueChange={(val: boolean) => (storage.showImage = val)} 
                            />
                        }
                    />

                    {/* Champ Lien de l'image */}
                    {showImg && (
                        <>
                            <TableRow 
                                label={isFr ? "Lien de l'image ou du GIF" : "Image or GIF link"} 
                                subLabel={isFr ? "Lien en .png, .jpg ou .gif" : "Link ending in .png, .jpg or .gif"} 
                                arrow={false} 
                            />
                            <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
                                <TextInput
                                    style={{ backgroundColor: '#2b2d31', color: '#dbdee1', padding: 10, borderRadius: 8, marginTop: 4 }}
                                    placeholder={isFr ? "Ex: https://monsite.com/image.gif" : "Ex: https://mysite.com/image.gif"}
                                    placeholderTextColor="#80848e"
                                    value={storage.customImageUrl || ''}
                                    onChangeText={(text: string) => (storage.customImageUrl = text)}
                                />
                            </View>
                        </>
                    )}

                    {/* Champ Date */}
                    <TableRow 
                        label={isFr ? "Date de fin" : "End Date"} 
                        subLabel={isFr ? "Format exact : YYYY-MM-DD" : "Exact format: YYYY-MM-DD"} 
                        arrow={false} 
                    />
                    <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
                        <TextInput
                            style={{ backgroundColor: '#2b2d31', color: '#dbdee1', padding: 10, borderRadius: 8, marginTop: 4 }}
                            placeholder="Ex: 2026-11-19"
                            placeholderTextColor="#80848e"
                            value={storage.customDate || ''}
                            onChangeText={(text: string) => (storage.customDate = text)}
                        />
                    </View>

                    {/* Champ Titre */}
                    <TableRow 
                        label={isFr ? "Titre principal" : "Main Title"} 
                        subLabel={isFr ? "Le texte affiché en haut" : "The text displayed at the top"} 
                        arrow={false} 
                    />
                    <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
                        <TextInput
                            style={{ backgroundColor: '#2b2d31', color: '#dbdee1', padding: 10, borderRadius: 8, marginTop: 4 }}
                            placeholder="Ex: WEAK N' STEAL"
                            placeholderTextColor="#80848e"
                            value={storage.customTitle || ''}
                            onChangeText={(text: string) => (storage.customTitle = text)}
                        />
                    </View>

                    {/* Champ Texte des jours */}
                    <TableRow 
                        label={isFr ? "Texte des Jours" : "Days Text"} 
                        subLabel={isFr ? "Le texte à côté des chiffres" : "The text next to the numbers"} 
                        arrow={false} 
                    />
                    <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
                        <TextInput
                            style={{ backgroundColor: '#2b2d31', color: '#dbdee1', padding: 10, borderRadius: 8, marginTop: 4 }}
                            placeholder={isFr ? "Ex: JOURS RESTANTS" : "Ex: DAYS LEFT"}
                            placeholderTextColor="#80848e"
                            value={storage.customDaysText || ''}
                            onChangeText={(text: string) => (storage.customDaysText = text)}
                        />
                    </View>

                    {/* Champ Description (Bas) */}
                    <TableRow 
                        label={isFr ? "Description (Bas)" : "Description (Bottom)"} 
                        subLabel={isFr ? "Le petit texte tout en bas" : "The small text at the very bottom"} 
                        arrow={false} 
                    />
                    <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
                        <TextInput
                            style={{ backgroundColor: '#2b2d31', color: '#dbdee1', padding: 10, borderRadius: 8, marginTop: 4 }}
                            placeholder={isFr ? "Ex: Sortie prévue bientôt !" : "Ex: Releasing soon!"}
                            placeholderTextColor="#80848e"
                            value={storage.customDescription || ''}
                            onChangeText={(text: string) => (storage.customDescription = text)}
                        />
                    </View>

                    {/* Les couleurs du contour */}
                    <TableRow 
                        label={isFr ? "Couleur de contour 1 (Gauche)" : "Outline Color 1 (Left)"} 
                        subLabel={isFr ? "Code couleur HEX" : "HEX color code"} 
                        arrow={false} 
                    />
                    <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
                        <TextInput
                            style={{ backgroundColor: '#2b2d31', color: '#dbdee1', padding: 10, borderRadius: 8, marginTop: 4 }}
                            placeholder={isFr ? "Ex: #E146C6 (Rose par défaut)" : "Ex: #E146C6 (Default Pink)"}
                            placeholderTextColor="#80848e"
                            value={storage.customColor1 || ''}
                            onChangeText={(text: string) => (storage.customColor1 = text)}
                        />
                    </View>

                    <TableRow 
                        label={isFr ? "Couleur de contour 2 (Droite)" : "Outline Color 2 (Right)"} 
                        subLabel={isFr ? "Code couleur HEX" : "HEX color code"} 
                        arrow={false} 
                    />
                    <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
                        <TextInput
                            style={{ backgroundColor: '#2b2d31', color: '#dbdee1', padding: 10, borderRadius: 8, marginTop: 4 }}
                            placeholder={isFr ? "Ex: #14acc0 (Cyan par défaut)" : "Ex: #14acc0 (Default Cyan)"}
                            placeholderTextColor="#80848e"
                            value={storage.customColor2 || ''}
                            onChangeText={(text: string) => (storage.customColor2 = text)}
                        />
                    </View>

                </TableRowGroup>

                {/* Le reste ne change pas */}
                <TableRadioGroup
                    title="Frequency"
                    defaultValue={storage.frequency}
                    onChange={(v: string) => (storage.frequency = v)}
                >
                    {FREQUENCIES.map(freq => (
                        <TableRadioRow
                            key={freq.value}
                            label={freq.label}
                            subLabel={freq.description}
                            value={freq.value}
                        />
                    ))}
                </TableRadioGroup>

                <TableRowGroup title="Behavior">
                    <TableRow
                        label="Toast Duration"
                        subLabel={
                            <View>
                                <Text variant="text-xs/medium" color="TEXT_SUBTLE" style={{ marginTop: 4 }}>
                                    The notification will stay on screen for{' '}
                                    <Text variant="text-xs/bold" color="MOBILE_TEXT_HEADING_PRIMARY">
                                        {storage.displayDuration} seconds
                                    </Text>
                                    .
                                </Text>
                                <Slider
                                    value={storage.displayDuration}
                                    minimumValue={1}
                                    maximumValue={20}
                                    step={1}
                                    onValueChange={(val: number) => (storage.displayDuration = val)}
                                />
                            </View>
                        }
                        onPress={() => {}}
                        arrow={false}
                    />
                </TableRowGroup>

                <View style={{ paddingHorizontal: 0 }}>
                    {Button && (
                        <Button
                            text={isFr ? "Tester l'affichage" : "Preview Toast"}
                            variant="primary"
                            size="md"
                            onPress={() => showCountdownToast()}
                            icon={getAssetIDByName('EyeIcon')}
                            iconPosition="start"
                        />
                    )}
                </View>

            </Stack>
        </ScrollView>
    )
}