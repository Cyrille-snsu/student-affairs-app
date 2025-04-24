import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface HeaderProps {
  onMenuPress: () => void;
  pageTitle?: string;
}

export default function Header({ onMenuPress, pageTitle = 'Pages / Dashboard' }: HeaderProps) {
  const handleAdminPress = () => {
    router.push('/admin-list');
  };

  return (
    <View style={styles.header}>
      <View style={styles.leftContainer}>
        <TouchableOpacity onPress={onMenuPress} style={styles.menuButton}>
          <Ionicons name="menu-outline" size={24} color="#1B5E20" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{pageTitle}</Text>
      </View>
      <TouchableOpacity 
        style={styles.adminButton} 
        onPress={handleAdminPress}
        activeOpacity={0.7}
      >
        <Text style={styles.adminText}>Admin</Text>
        <Ionicons name="person-circle-outline" size={24} color="#1B5E20" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    height: 60,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  menuButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  adminButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#E8F5E9',
  },
  adminText: {
    fontSize: 16,
    color: '#1B5E20',
    fontWeight: '500',
  },
}); 