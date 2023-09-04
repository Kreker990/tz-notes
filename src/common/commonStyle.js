import { Dimensions, StyleSheet } from "react-native";

export const screenWidth = Dimensions.get('window').width
export const screenHeight = Dimensions.get('window').height

export const widthScale = screenWidth / 375
export const heightScale = screenHeight / 812

export const colors = {
    orange: "#e8bc43",
    yellow: "#d9d921",
    black: "#323232",
    gray: "#7D7D80",
    lightOrange: "#faf6e8",
    white: '#FFFFFF',
    bgcolor: '#F3F5F5',
    green: '#78f587',
    red: '#de2121'
}
export const shadowBlock = {
    shadowColor: colors.gray,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 5,
}
