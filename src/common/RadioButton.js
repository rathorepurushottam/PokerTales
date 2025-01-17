import { TouchableOpacity, View } from "react-native";

function RadioButton(props) {
    return (
        <View 
        style={[{
          height: 18,
          width: 18,
          borderRadius: 12,
          borderWidth: 2,
          borderColor: props.selected ? "#0F65F8":'#D6D6D6',
          alignItems: 'center',
          justifyContent: 'center',
        }, props.style]}>
          {
            props.selected ?
              <View style={{
                height: 8,
                width: 8,
                borderRadius: 6,
                backgroundColor: '#0F65F8',
              }}/>
              : null
          }
        </View>
    );
  };

export default RadioButton;