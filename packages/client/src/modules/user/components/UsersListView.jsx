/*eslint-disable no-unused-vars*/
import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import {
  List,
  ListItem,
  Card,
  CardItem,
  CardLabel,
  CardText,
  SwipeAction,
  Button,
  primary
} from '../../common/components/native';
import translate from '../../../i18n';

const UsersListView = ({ users, loading, navigation, deleteUser, t }) => {
  return (
    <View style={styles.container}>
      <ScrollView>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <View>
            <View style={styles.buttonWrapper}>
              <Button type={primary} onPress={() => navigation.navigate('UserEdit', { id: 0 })}>
                Add user
              </Button>
            </View>
            {(users &&
              users.length && (
                <List>
                  {users.map(({ username, email, isActive, role, id }, idx) => (
                    <ListItem key={idx} onPress={() => navigation.navigate('UserEdit', { id })}>
                      <Card>
                        <CardItem>
                          <View style={styles.itemsContainer}>
                            <CardItem style={styles.cardItemWrapper}>
                              <CardLabel>{`${t('users.column.name')}: `}</CardLabel>
                              <CardText>{username}</CardText>
                            </CardItem>
                            <CardItem style={styles.cardItemWrapper}>
                              <CardLabel>{`${t('users.column.email')}: `}</CardLabel>
                              <CardText>{email}</CardText>
                            </CardItem>
                            <CardItem style={styles.cardItemWrapper}>
                              <CardLabel>{`${t('users.column.role')}: `}</CardLabel>
                              <CardText>{role}</CardText>
                            </CardItem>
                            <CardItem style={styles.cardItemWrapper}>
                              <CardLabel>{`${t('users.column.active')}: `}</CardLabel>
                              <CardText>{String(isActive)}</CardText>
                            </CardItem>
                          </View>
                          <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.iconWrapper} onPress={() => deleteUser(id)}>
                              <FontAwesome name="trash" size={25} style={{ color: '#de5251' }} />
                            </TouchableOpacity>
                          </View>
                        </CardItem>
                      </Card>
                    </ListItem>
                  ))}
                </List>
              )) || (
              <View style={styles.notificationContainer}>
                <Text style={styles.notificationText}>Users not found</Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

UsersListView.propTypes = {
  t: PropTypes.func
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch'
  },
  iconWrapper: {
    backgroundColor: 'transparent',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  buttonWrapper: {
    paddingHorizontal: 15,
    marginBottom: 15
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemsContainer: {
    flex: 9
  },
  cardItemWrapper: {
    paddingTop: 5,
    paddingBottom: 5,
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  notificationContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  notificationText: {
    fontSize: 24,
    fontWeight: '600'
  }
});

UsersListView.propTypes = {
  users: PropTypes.array,
  navigation: PropTypes.object,
  deleteUser: PropTypes.func,
  loading: PropTypes.bool
};

export default translate('user')(UsersListView);
