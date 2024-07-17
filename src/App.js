import React, { useEffect } from 'react';
import { View, StyleSheet , Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import JobScreen from './screens/JobScreen';
import BookmarkScreen from './screens/BookmarkScreen';
import JobDetailsScreen from './screens/JobDetailsScreen';
import store from './store';
import { loadBookmarks } from './features/bookmarks/bookmarksSlice';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused }) => {
        let image;

        if (route.name === 'Jobs') {
          image = focused
            ? require('./images/job.png')
            : require('./images/job.png');
        } else if (route.name === 'Bookmarks') {
          image = focused
            ? require('./images/bookmarks.png')
            : require('./images/bookmarks.png');
        }

        return <Image source={image} style={styles.icon} />;
      },
      tabBarActiveTintColor: '#00A35A',
      tabBarInactiveTintColor: 'gray',
      tabBarStyle: {
        backgroundColor: '#232929',
        borderTopColor: '#444', 
      },
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: 'bold',
      },
      headerStyle: {
        backgroundColor: '#232929', 
      },
      headerTitleStyle: {
        color: '#fff',
      },
    })}
  >
    <Tab.Screen
      name="Jobs"
      component={JobScreen}
      options={{
        tabBarLabel: 'Jobs',
        tabBarLabelStyle: styles.tabLabel,
      }}
    />
    <Tab.Screen
      name="Bookmarks"
      component={BookmarkScreen}
      options={{
        tabBarLabel: 'Bookmarks',
        tabBarLabelStyle: styles.tabLabel,
      }}
    />
  </Tab.Navigator>
);

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBookmarks = async () => {
      const storedBookmarks = await AsyncStorage.getItem('bookmarkedJobs');
      if (storedBookmarks) {
        dispatch(loadBookmarks(JSON.parse(storedBookmarks)));
      }
    };
    fetchBookmarks();
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Main"
            component={MainTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="JobDetails"
            component={JobDetailsScreen}
            options={{
              headerStyle: {
                backgroundColor: '#00A35A',
              },
              headerTitleStyle: {
                color: '#fff',
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

const RootApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#232929', // Set your desired background color here
  },
  icon: {
    width: 24,
    height: 24,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: 'bold',
   
  },
});

export default RootApp;
