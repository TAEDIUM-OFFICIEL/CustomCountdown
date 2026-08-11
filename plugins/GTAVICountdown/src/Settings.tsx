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
// Importations nettoyées : plus d'Image, ni de StyleSheet, ni de Linking !
const { ScrollView, View, TextInput } = ReactNative

const Slider = (props: any) => (
    <View style={{ marginTop: 8 }}>
        {RawSlider ? (
            <RawSlider {...props} onValueChange={(val: any) => props.value !== val && props.onValueChange?.(val)} />
        ) : (
            <Text color="TEXT_FEEDBACK_CRITICAL">Missing Slider</Text>
        )}
    </View>
)

export default function Settings() {
    useProxy(storage)

    return (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 38 }}>
            <Stack style={{ paddingVertical: 24, paddingHorizontal: 16 }} spacing={24}>
                
                {/* TON CHAMP PERSONNALISÉ EST MAINTENANT LE TOUT PREMIER ÉLÉMENT */}
                <TableRowGroup title="Personnalisation">
                    <TableRow
                        label="Date de fin du compteur"
                        subLabel="Format exact : YYYY-MM-DD (ex: 2026-11-19)"
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
                </TableRowGroup>

                {/* Les paramètres de fréquence */}
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

                {/* Le paramètre de durée d'affichage */}
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

                {/* Le bouton de test */}
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