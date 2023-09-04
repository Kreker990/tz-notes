import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import Main from './src/screen/Main';
import NoteAdd from './src/screen/NoteAdd';
import NoteInfo from './src/screen/NoteInfo';
import Favorites from './src/screen/Favorites';
import { store } from './src/redux/store';
import * as SQLite from 'expo-sqlite';
import { Animated } from 'react-native'

const av = new Animated.Value(0);
av.addListener(() => { return });

const main = "main"
const noteAdd = "noteAdd"
const noteInfo = "noteInfo"
const favorites = "favorites"

const Stack = createStackNavigator();

export default function App() {
  const db = SQLite.openDatabase('mydatabase.db');
  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, content TEXT, favorite INTEGER DEFAULT 0)',
      [],
      () => {
      },
      (error) => {
        console.error('Error creating table', error);
      }
    );
  });
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar style='auto' backgroundColor='#ffffff' />
        <Stack.Navigator initialRouteName={main}
          screenListeners={{
            focus: () => {
              Animated.timing(av, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
              }).start();
            },
          }}>
          <Stack.Screen component={Main} name={main} options={{ headerShown: false }} />
          <Stack.Screen component={NoteAdd} name={noteAdd} options={{ headerShown: false }} />
          <Stack.Screen component={NoteInfo} name={noteInfo} options={{ headerShown: false }} />
          <Stack.Screen component={Favorites} name={favorites} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
