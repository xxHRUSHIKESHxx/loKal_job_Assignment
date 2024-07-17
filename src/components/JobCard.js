import React, {useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {useDispatch, useSelector} from 'react-redux';
import {
  addBookmark,
  removeBookmark,
} from '../features/bookmarks/bookmarksSlice';

const JobCard = ({job, onPress}) => {
  const {
    id,
    title = '',
    company_name = '',
    primary_details = {},
    job_tags = [],
    creatives = [{thumb_url: ''}],
  } = job;

  const {Place = '', Job_Type = '', Qualification = ''} = primary_details;

  const abbreviatedTitle =
    title.length > 30 ? `${title.substring(0, 30)}...` : title;

  const dispatch = useDispatch();
  const bookmarks = useSelector(state => state.bookmarks.bookmarks);

  const isBookmarked = bookmarks.some(bookmarkedJob => bookmarkedJob.id === id);

  const toggleBookmark = () => {
    if (isBookmarked) {
      dispatch(removeBookmark(job));
    } else {
      dispatch(addBookmark(job));
    }
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <View style={styles.content}>
          <View style={styles.head}>
            <Text style={styles.title}>{abbreviatedTitle}</Text>
            <TouchableOpacity onPress={toggleBookmark}>
              <Image
                source={
                  isBookmarked
                    ? require('../images/greenbookmark.png')
                    : require('../images/bookmark.png')
                }
                style={styles.image}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.companyContainer}>
            <Text style={styles.company}>{company_name}</Text>
          </View>
          <View style={styles.tags}>
            <View style={styles.loc}>
              <Image
                source={require('../images/location.png')}
                style={styles.location}
              />
              <Text>
                {Place} | {Job_Type}
              </Text>
            </View>

            <Text style={styles.details}>
              {job_tags.length > 0 ? job_tags[0].value : ''}
            </Text>
            <Text style={styles.details}>{Qualification}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: '#ccc',
    backgroundColor: '#1C1C1D',
    padding: 5,
  },
  head: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  companyContainer: {
    marginBottom: 5,
  },
  company: {
    fontSize: 14,
  },
  details: {
    fontSize: 12,
    backgroundColor: '#39383B',
    padding: 5,
    borderRadius: 5,
    margin: 2,
  },
  tags: {
    display: 'flex',
    flexDirection: 'row',
    padding: 5,
    maxWidth: '90%',
    flexWrap: 'wrap',
  },
  icon: {
    color: 'white',
  },
  image: {
    width: 20,
    height: 20,
  },
  location: {
    height: 18,
    width: 18,
  },
  loc:{
    display: 'flex',
    flexDirection: 'row',
    fontSize: 12,
    backgroundColor: '#39383B',
    padding: 5,
    borderRadius: 5,
    margin: 2,
  }
});

export default JobCard;
