import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';
import {
    interRegular,
    interLight,
    interItalic,
    interSemiBold,
    interBold,
    interMedium,
} from '../theme/typography';
import { NewColor, colors } from '../theme/color';

export const THIRTEEN = 'THIRTEEN';
export const FIFTEEN = 'FIFTEEN';
export const SIXTEEN = 'SIXTEEN';
export const TWENTY = 'TWENTY';
export const TWENTY_FOUR = 'TWENTY_FOUR';
export const FORTEEN = 'FORTEEN';
export const EIGHTEEN = 'EIGHTEEN';
export const NINETEEN = 'NINETEEN';
export const TWELVE = 'TWELVE';
export const FORTY = 'FORTY';
export const TWENTY_TWO = 'TWENTY_TWO';
export const TEN = 'TEN';
export const ELEVEN = 'ELEVEN';
export const TWENTY_FIVE = 'TWENTY_FIVE';
export const NORMAL = 'normal';
export const SEMI_BOLD = 'semibold';
export const BOLD = 'bold';
export const INTER_REGULAR = 'INTER_REGULAR';
export const INTER_LIGHT = 'INTER_LIGHT';
export const INTER_ITALIC = 'INTER_ITALIC';
export const INTER_MEDIUM = "INTER_MEDIUM";
export const INTER_SEMI_BOLD = 'INTER_SEMI_BOLD';
export const INTER_BOLD = 'INTER_BOLD';

export const WHITE = 'WHITE';
export const GREEN = 'GREEN';
export const RED = 'RED';
export const BORDERPINK = 'BORDERPINK';
export const LIGHTGOLDEN = 'LIGHTGOLDEN';
export const LIGHTWHITE = 'LIGHTWHITE';
export const BITTEXT = 'BITTEXT';
export const MYTEXT = "MYTEXT";
export const MENUTEXT = "MENUTEXT";
export const LIGHTTEXT = "LIGHTTEXT";
export const LIGHTMYTEXT = "LIGHTMYTEXT";
export const NEWTEXT = "NEWTEXT";
export const LIGHTDISABLE = "LIGHTDISABLE";
export const BROWNYELLOW = "BROWNYELLOW";


export const GRY = 'GRY';
export const BOTTOMTEXT = 'BOTTOMTEXT';
export const BLUE = 'BLUE';
export const RBBACKGROUND = 'RBBACKGROUND';
export const GOLDEN = 'GOLDEN';
export const DISABLETEXT = "DISABLETEXT";
export const FOCUSEDTEXT = "FOCUSEDTEXT";
export const TEXTGREY = "TEXTGREY";
export const LIGHTGREY = "LIGHTGREY";



export const LIGHTPINK = 'LIGHTPINK';
export const BLACK = 'BLACK';
export const LIGHTBLUE = 'LIGHTBLUE';
export const BLACKOPACITY = 'BLACKOPACITY';
export const EIGHT = 'EIGHT';
export const THIRTEENTH = 'THIRTEENTH';
export const FIFTEENTH = 'FIFTEENTH';
export const THIRTY = 'THIRTY';
export const WITHDRAWBLUE = "WITHDRAWBLUE";

export const TWENTY_ONE_L = 'TWENTY_ONE_L';
export const THIRTY_SIX_L = 'THIRTY_SIX_L';

const AppText = ({
  type,
  weight,
  style,
  color,
  line,
  onPress,
  ...props
}) => {
  return (
    <Text
      allowFontScaling={false}
      onPress={onPress}
      style={StyleSheet.flatten([
        styles.text(type, weight, color, line),
        style,
      ])}
      {...props}
    />
  );
};

const getTextStyle = (
  type,
  weight,
  color,
  line,
) => {
  var style = {};
  switch (type) {
    case EIGHT:
      style['fontSize'] = 8;
      break;
    case ELEVEN:
      style['fontSize'] = 11;
      break;
    case FORTEEN:
      style['fontSize'] = 13;
      break;
    case THIRTEEN:
      style['fontSize'] = 14;
      break;
    case FIFTEEN:
      style['fontSize'] = 15;
      break;
    case TWENTY:
      style['fontSize'] = 20;
      break;
    case TWENTY_FOUR:
      style['fontSize'] = 24;
      break;
    case FORTEEN:
      style['fontSize'] = 14;
      break;
    case EIGHTEEN:
      style['fontSize'] = 18;
      break;
    case TWELVE:
      style['fontSize'] = 12;
      break;
    case NINETEEN:
      style['fontSize'] = 19;
      break;
    case THIRTY:
      style['fontSize'] = 30;
      break;
    case FORTY:
      style['fontSize'] = 40;
      break;
    case SIXTEEN:
      style['fontSize'] = 16;
      break;
    case TWENTY_TWO:
      style['fontSize'] = 22;
      break;
    case TEN:
      style['fontSize'] = 10;
      break;
    case TWENTY_FIVE:
      style['fontSize'] = 25;
      break;
    default:
      style['fontSize'] = 12;
  }

  switch (weight) {
    case INTER_REGULAR:
      style['fontFamily'] = interRegular;
      break;
    case INTER_LIGHT:
      style['fontFamily'] = interLight;
      break;

    case INTER_ITALIC:
      style['fontFamily'] = interItalic;
      break;

    case INTER_SEMI_BOLD:
      style['fontFamily'] = interSemiBold;
      break;

    case INTER_BOLD:
      style['fontFamily'] = interBold;
      break;
    default:
      style['fontFamily'] = interMedium;
  }
  switch (line) {
    case TWENTY_ONE_L:
      style['lineHeight'] = 21;
      break;
    case THIRTY_SIX_L:
      style['lineHeight'] = 36;
      break;
  }

  switch (color) {
    case WHITE:
      style['color'] = 'white';
      break;
    case GREEN:
      style['color'] = colors.green;
      break;
    case RED:
      style['color'] = colors.lightRed;
      break;
    case LIGHTPINK:
      style['color'] = colors.ligthPickText;
      break;
    case BLACK:
      style['color'] = colors.black;
      break;
    case LIGHTBLUE:
      style['color'] = colors.lightBlue;
      break;
    case BLACKOPACITY:
      style['color'] = NewColor.linerBlacklight;
      break;
    case RED:
      style['color'] = 'red';
      break;
    case GRY:
      style['color'] = colors.gray;
      break;
    case BOTTOMTEXT:
      style['color'] = colors.bottomText;
      break;
    case BLUE:
      style['color'] = colors.menuText;
      break;
    case RBBACKGROUND:
      style['color'] = colors.rbBackground;
      break;
    case GOLDEN:
      style['color'] = colors.goldenColor;
      break;
      case LIGHTGOLDEN:
        style['color'] = colors.lightGolden;
        break;
        case LIGHTWHITE:
          style['color'] = colors.lightWhite;
          break;
      case BORDERPINK:
        style['color'] = colors.borderPick;
        break;
        case TEXTGREY:
        style['color'] = colors.textGrey;
        break;
        case WITHDRAWBLUE:
        style['color'] = colors.withdrawBlue;
        break;
        case LIGHTGREY:
        style['color'] = colors.lightGrey;
        break;
        

    case MYTEXT:
      style['color'] = colors.myText;
      break;
    case MENUTEXT:
      style['color'] = colors.menuText;
      break;
    case EIGHT:
      style['color'] = NewColor.linerWhitefifty;
      break;
    case THIRTEENTH:
      style['color'] = colors.myGreen;
      break;
    case FIFTEENTH:
      style['color'] = colors.convertText;
      break;
      case DISABLETEXT:
      style['color'] = colors.disableText;
      break;
      case FOCUSEDTEXT:
      style['color'] = colors.focusedText;
      break;
      case LIGHTTEXT:
      style['color'] = colors.lightText;
      break;
      case LIGHTMYTEXT:
      style['color'] = colors.lightMyText;
      break;
      case NEWTEXT:
      style['color'] = colors.newText;
      break;
      case LIGHTDISABLE:
      style['color'] = NewColor.linerBlacklightEight;
      break;
      case BROWNYELLOW:
      style['color'] = colors.brownYellow;
      break;
    default:
      style['color'] = 'white';
      break;
  }

  return style;
};

const styles = {
  text: (type, weight, color, line) => ({
    ...getTextStyle(type, weight, color, line),
  }),
};

export { AppText };