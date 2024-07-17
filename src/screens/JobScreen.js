import React, { useEffect, useState, useCallback } from 'react';
import { View, FlatList, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { fetchJobs } from '../api/jobsApi';
import JobCard from '../components/JobCard';
import ErrorPopup from '../components/ErrorPopup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const JobScreen = ({ navigation }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [isEndReached, setIsEndReached] = useState(false); // Track if end of data is reached
  const [error, setError] = useState(false);
  const [reloadNeeded, setReloadNeeded] = useState(false); // Flag to track if reload is needed

  const loadJobs = async () => {
    setLoading(true);
    try {
      const data = await fetchJobs(page);
      if (data.length > 0) {
        setJobs(prevJobs => [...prevJobs, ...data]);
      } else {
        setIsEndReached(true); // No more data available
      }
      setError(false);
      setReloadNeeded(false); // Reset the reload flag on successful load
    } catch (error) {
      setError(true);
      setReloadNeeded(true); // Set reload flag on error
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, [page]);

  useFocusEffect(
    useCallback(() => {
      if (reloadNeeded) {
        setPage(1); // Reset the page to 1 if reload is needed
        setJobs([]); // Clear current jobs
        loadJobs();
      }
    }, [reloadNeeded])
  );

  const handleLoadMore = () => {
    if (!loading && !isEndReached) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const handleCloseError = () => {
    setError(false);
    navigation.navigate('Bookmarks');
  };

  const renderJob = ({ item }) => {
    // Check if job has a title, render only if title exists
    if (!item.title) {
      return null;
    }

    return (
      <JobCard
        job={item}
        onPress={() => navigation.navigate('JobDetails', { job: item })}
      />
    );
  };

  return (
    <View style={{ flex: 1 , backgroundColor: '#1C1C1D'}}>
      <ErrorPopup
        visible={error}
        onClose={handleCloseError}
        message="Some error occurred. Please go to the Bookmarks page to see the saved jobs."
      />

      {loading && page === 1 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#00A35A" />
        </View>
      ) : (
        <FlatList
          data={jobs}
          renderItem={renderJob}
          keyExtractor={item => item.id?.toString()} // Ensure keyExtractor returns a string
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loading && page > 1 ? <ActivityIndicator size="large"  color="#00A35A"  /> : null
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default JobScreen;
