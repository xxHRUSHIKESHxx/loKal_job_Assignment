import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Linking,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addBookmark, removeBookmark } from '../features/bookmarks/bookmarksSlice';

const JobDetailScreen = ({ route, navigation }) => {
  const { job } = route.params;

  const dispatch = useDispatch();
  const bookmarks = useSelector((state) => state.bookmarks.bookmarks);
  const isBookmarked = bookmarks.some((bookmarkedJob) => bookmarkedJob.id === job.id);

  const toggleBookmark = () => {
    if (isBookmarked) {
      dispatch(removeBookmark(job));
    } else {
      dispatch(addBookmark(job));
    }
  };

  const OpenURLButton = ({ url, children }) => {
    const handlePress = async () => {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        console.log(`Don't know how to open URL: ${url}`);
      }
    };

    return (
      <TouchableOpacity onPress={handlePress}>
        <Text style={styles.link}>{children}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.companyName}>{job.company_name}</Text>
      <Text style={styles.description}>{job.title}</Text>
      <Text style={styles.detailText}>{job.job_location_slug}</Text>
      <View style={styles.border}></View>

      <View>
        <Text style={styles.highlights}>Job Highlights</Text>
        <View style={styles.tags}>
          <Text style={styles.details}>{job.job_category}</Text>
          <Text style={styles.details}>{job.job_hours}</Text>
          <Text style={styles.details}>{job.job_role}</Text>

          {job.salary_min ? (
            <Text style={styles.details}>
              {' '}
              ₹ {job.salary_min} - {job.salary_max}{' '}
            </Text>
          ) : null}
          <Text style={styles.details}>{job.openings_count} openings</Text>
          <Text style={styles.details}>{job.num_applications} applied</Text>
        </View>
      </View>

      <View>
        <Text style={styles.description}>Other Details</Text>
        <Text style={styles.detailText}>{job.other_details}</Text>
      </View>

      <View style={styles.contactButtons}>
        <View style={styles.callbutton}>
          <OpenURLButton url={job.custom_link}>{job.button_text}</OpenURLButton>
        </View>
      </View>

      <View style={styles.detailContainer}>
        <Text style={styles.detailLabel}>Created On:</Text>
        <Text style={styles.detailText}>
          {new Date(job.created_on).toDateString()}
        </Text>
      </View>

      <View style={styles.detailContainer}>
        <Text style={styles.detailLabel}>Expire On:</Text>
        <Text style={styles.detailText}>
          {new Date(job.expire_on).toDateString()}
        </Text>
      </View>

      <View style={styles.detailContainer}>
        <Text style={styles.detailLabel}>Fees Charged:</Text>
        <Text style={styles.detailText}>₹{job.fees_charged}</Text>
      </View>

      <View style={styles.detailContainer}>
        <Text style={styles.detailLabel}>WhatsApp Number:</Text>
        <Text style={styles.detailText}>{job.whatsapp_no}</Text>
      </View>

      <Button
        title={isBookmarked ? 'Bookmarked' : 'Bookmark'}
        onPress={toggleBookmark}
        color={isBookmarked ? '#00A35A' : '#646B68'}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#232929',
  },
  companyName: {
    fontSize: 15,
    fontWeight: '900',
    marginBottom: 10,
    color: 'white',
  },
  highlights: {
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 10,
    color: 'white',
  },
  description: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  detailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff',
  },
  detailText: {
    fontSize: 15,
    color: '#fff',
  },
  details: {
    fontSize: 12,
    backgroundColor: '#39383B',
    padding: 5,
    borderRadius: 5,
    margin: 2,
    color: '#fff',
    fontWeight: 'bold',
  },
  tags: {
    flexDirection: 'row',
    paddingVertical: 3,
    flexWrap: 'wrap',
  },
  border: {
    borderWidth: 0.5,
    borderColor: '#fff',
    marginVertical: 3,
  },
  callbutton: {
    backgroundColor: '#00A35A',
    borderRadius: 10,
    padding: 5,
    marginBottom: 20,
    margin: 5,
    maxWidth: '30%',
  },
  link: {
    color: '#fff',
    fontWeight: 'bold',
  },
  contactButtons: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default JobDetailScreen;
