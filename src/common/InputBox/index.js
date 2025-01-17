import { View, TextInput } from 'react-native';
import React from 'react';
import styles from './styles';
import { AppText, BLACK, EIGHTEEN, FORTEEN, INTER_BOLD, INTER_MEDIUM, INTER_SEMI_BOLD, SIXTEEN, TWELVE, TWENTY, TWENTY_FIVE } from '../AppText';
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
    cursorColor,
    autoCapitalize,
    amount,
    offers,
    codeApplied,
    onCodeApplied,
    onSubmit,
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
                    {amount && (<View style={{
                        height: 29 ,
                        width: 10,
                        marginLeft: 15,
                      
                    }}>
                        <AppText type={TWENTY} color={BLACK} weight={INTER_BOLD}>₹</AppText>
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
                        onSubmitEditing={onSubmit}
                        cursorColor={cursorColor}
                        autoCapitalize={autoCapitalize}
                    />
                    {isPassword && (
                        <TouchableOpacityView
                            style={styles.toggleButton}
                            onPress={onToggle}>
                            <FastImage
                                source={secureTextEntry ? eye_close : eye_open}
                                style={styles.eyeIcon}
                                resizeMode="contain"
                            />
                        </TouchableOpacityView>
                    )}
                    {offers && 
                    <TouchableOpacityView style={{marginRight: 20}} onPress={onCodeApplied}>
                        <AppText type={FORTEEN} weight={INTER_SEMI_BOLD} style={{color: value ? "#01B9F5" : colors.disableText}}>{'Apply'}</AppText>
                        </TouchableOpacityView>}
                </View>
            </View>
        </View>
    );
};

export default InputBox;