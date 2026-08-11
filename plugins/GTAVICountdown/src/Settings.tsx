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
    
    // On stocke l'état du bouton dans une variable pour s'en servir juste après
    const showImg = storage.showImage ?? true

    return (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 38 }}>
            <Stack style={{ paddingVertical: 24, paddingHorizontal: 16 }} spacing={24}>
                
                {/* --- SÉLECTION DE LA LANGUE --- */}
                <TableRadioGroup
                    title="Langue par défaut (Si champs vides)"
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

                <TableRowGroup title="Personnalisation">
                    
                    {/* Bouton On/Off pour l'image */}
                    <TableRow
                        label="Afficher l'image"
                        subLabel="Active ou désactive l'image à gauche"
                        trailing={
                            <Switch 
                                value={showImg} 
                                onValueChange={(val: boolean) => (storage.showImage = val)} 
                            />
                        }
                    />

                    {/* ASTUCE ICI : Ce bloc ne s'affiche QUE si 'showImg' est sur ON */}
                    {showImg && (
                        <>
                            <TableRow label="Lien de l'image ou du GIF" subLabel="Lien en .png, .jpg ou .gif" arrow={false} />
                            <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
                                <TextInput
                                    style={{ backgroundColor: '#2b2d31', color: '#dbdee1', padding: 10, borderRadius: 8, marginTop: 4 }}
                                    placeholder="Ex: https://monsite.com/image.gif"
                                    placeholderTextColor="#80848e"
                                    value={storage.customImageUrl || ''}
                                    onChangeText={(text: string) => (storage.customImageUrl = text)}
                                />
                            </View>
                        </>
                    )}

                    {/* Champ Date */}
                    <TableRow label="Date de fin" subLabel="Format exact : YYYY-MM-DD" arrow={false} />
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
                    <TableRow label="Titre principal" subLabel="Le texte affiché en haut" arrow={false} />
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
                    <TableRow label="Texte des Jours" subLabel="Le texte à côté des chiffres" arrow={false} />
                    <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
                        <TextInput
                            style={{ backgroundColor: '#2b2d31', color: '#dbdee1', padding: 10, borderRadius: 8, marginTop: 4 }}
                            placeholder="Ex: JOURS RESTANTS"
                            placeholderTextColor="#80848e"
                            value={storage.customDaysText || ''}
                            onChangeText={(text: string) => (storage.customDaysText = text)}
                        />
                    </View>

                    {/* Champ Description (Bas) */}
                    <TableRow label="Description (Bas)" subLabel="Le petit texte tout en bas" arrow={false} />
                    <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
                        <TextInput
                            style={{ backgroundColor: '#2b2d31', color: '#dbdee1', padding: 10, borderRadius: 8, marginTop: 4 }}
                            placeholder="Ex: Sortie prévue bientôt !"
                            placeholderTextColor="#80848e"
                            value={storage.customDescription || ''}
                            onChangeText={(text: string) => (storage.customDescription = text)}
                        />
                    </View>

                    {/* Les couleurs du contour */}
                    <TableRow label="Couleur de contour 1 (Gauche)" subLabel="Code couleur HEX" arrow={false} />
                    <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
                        <TextInput
                            style={{ backgroundColor: '#2b2d31', color: '#dbdee1', padding: 10, borderRadius: 8, marginTop: 4 }}
                            placeholder="Ex: #E146C6 (Rose par défaut)"
                            placeholderTextColor="#80848e"
                            value={storage.customColor1 || ''}
                            onChangeText={(text: string) => (storage.customColor1 = text)}
                        />
                    </View>

                    <TableRow label="Couleur de contour 2 (Droite)" subLabel="Code couleur HEX" arrow={false} />
                    <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
                        <TextInput
                            style={{ backgroundColor: '#2b2d31', color: '#dbdee1', padding: 10, borderRadius: 8, marginTop: 4 }}
                            placeholder="Ex: #14acc0 (Cyan par défaut)"
                            placeholderTextColor="#80848e"
                            value={storage.customColor2 || ''}
                            onChangeText={(text: string) => (storage.customColor2 = text)}
                        />
                    </View>

                </TableRowGroup>

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
                            text="Preview Toast"
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