import { View, TextInput } from 'react-native';
import React from 'react';
import styles from './styles';
import { AppText, FORTEEN, INTER_MEDIUM, SIXTEEN, TWELVE, TWENTY_FIVE } from '../AppText';
import FastImage from 'react-native-fast-image';
import { eye_close, eye_open } from '../../helper/image';
import { TouchableOpacityView } from '../TouchableOpacityView';
import { colors } from '../../theme/color';

const InputBox = ({
    secureTextEntry,
    label,
    labelStyle,
    value,
    returnKeyType,
    placeholder,
    textInputBox,
    textInputStyle,
    placeholderTextColor,
    onChange,
    isPassword,
    onToggle,
    closeImage,
    onPressClose,
    style,
    keyboardType,
    maxLength,
    editable,
    top,
    phone,
    onFocus,
    onBlur,
    containerStyle,
    ...props
}) => {
    return (
        <View style={style}>
            {label && (
                <AppText
                    {...props}
                    type={FORTEEN}
                    weight={INTER_MEDIUM}
                    style={[styles.NameLabel, labelStyle]}>
                    {label}
                </AppText>
            )}

            <View style={styles.gradient}>
                <View
                    style={[{
                        // borderWidth: 1,
                        borderRadius: 10,
                        backgroundColor: "#FFFFFF1A",
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: top ? 10 : 0,
                        // borderColor: "red"
                    }, containerStyle]}>
                    {phone && (<View style={{
                        height: 20,
                        width: 40,
                        marginLeft: 10,
                        flexDirection: "row",
                        borderRightWidth: 1,
                        borderRightColor: "#FFFFFF26"
                    }}>
                        <AppText type={SIXTEEN}>+91</AppText>
                    </View>)}

                    <TextInput
                        {...props}
                        placeholder={placeholder}
                        allowFontScaling={false}
                        placeholderTextColor={
                            placeholderTextColor ? placeholderTextColor : "#5E6272"
                        }
                        style={[
                            styles.textinputstyle,
                            textInputBox,
                            textInputStyle,
                        ]}
                        secureTextEntry={secureTextEntry ? true : false}
                        value={value}
                        returnKeyType={returnKeyType}
                        onChangeText={onChange}
                        keyboardType={keyboardType}
                        maxLength={maxLength}
                        editable={editable}
                        onFocus={onFocus}
                        onBlur={onBlur}
                    />
                    {isPassword && (
                        <TouchableOpacityView
                            style={styles.toggleButton}
                            onPress={onToggle}>
                            <FastImage
                                source={secureTextEntry ? eye_open : eye_close}
                                style={styles.eyeIcon}
                                resizeMode="contain"
                            />
                        </TouchableOpacityView>
                    )}
                </View>
            </View>
        </View>
    );
};

export default InputBox;