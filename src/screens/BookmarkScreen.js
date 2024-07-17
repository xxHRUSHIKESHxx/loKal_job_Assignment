import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  FlatList,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import JobCard from '../components/JobCard';

const BookmarkScreen = ({navigation}) => {
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadBookmarkedJobs = async () => {
    try {
      const storedJobs = await AsyncStorage.getItem('bookmarkedJobs');
      if (storedJobs) {
        setBookmarkedJobs(JSON.parse(storedJobs));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookmarkedJobs();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadBookmarkedJobs();
    }, []),
  );

  const renderJob = ({item}) => (
    <JobCard
      job={item}
      onPress={() => navigation.navigate('JobDetails', {job: item})}
    />
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {bookmarkedJobs.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Image
            source={require('../images/empty-icon.png')}
            style={styles.image}
          />
          <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}}>
            No bookmarks available
          </Text>
        </View>
      ) : (
        <FlatList
          data={bookmarkedJobs}
          renderItem={renderJob}
          keyExtractor={item => item.id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1D',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
});

export default BookmarkScreen;
