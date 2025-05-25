import React, { useState } from 'react';
import useAuthUser from './useAuthUser';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface SidebarProps {
  onNavigate?: () => void;
}

export default function Sidebar({ onNavigate }: SidebarProps) {
  const [currentTitle, setCurrentTitle] = useState('DASHBOARD');

  const menuItems = [
    {
      icon: 'home-outline',
      label: 'Dashboard',
      route: '/(tabs)',
      title: 'DASHBOARD'
    },
    {
      icon: 'list-outline',
      label: 'Students List',
      route: '/students',
      title: 'STUDENTS LIST'
    },
  ];

  const handleNavigation = (route: string, title: string) => {
    setCurrentTitle(title);
    router.push(route);
    if (onNavigate) {
      onNavigate();
    }
  };

  const handleAddStudent = () => {
    setCurrentTitle('ADD STUDENT');
    router.push('/add-student');
    if (onNavigate) {
      onNavigate();
    }
  };

  const handleSignOut = () => {
    router.replace('/login');
  };

  const user = useAuthUser();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.menuItems}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => handleNavigation(item.route, item.title)}
            activeOpacity={0.7}
          >
            <Ionicons name={item.icon as any} size={24} color="#1B5E20" />
            <Text style={styles.menuText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.addRecordCard}>
        <View style={styles.addIconContainer}>
          <Ionicons name="add" size={24} color="white" />
        </View>
        <Text style={styles.addRecordTitle}>ADD STUDENT</Text>
        <Text style={styles.addRecordSubtitle}>Add new students info</Text>
        <TouchableOpacity 
          style={styles.clickButton}
          activeOpacity={0.7}
          onPress={handleAddStudent}
        >
          <Text style={styles.clickButtonText}>CLICK HERE</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.signOutSection}>
        <View style={styles.adminInfo}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person" size={24} color="#fff" />
          </View>
          <View style={styles.adminDetails}>
            <Text style={styles.adminTitle}>Admin</Text>
            <Text style={styles.adminEmail}>{user?.email || 'Not logged in'}</Text>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.signOutButton}
          onPress={handleSignOut}
          activeOpacity={0.7}
        >
          <Text style={styles.signOutText}>Sign out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  logo: {
    width: 60,
    height: 60,
  },
  menuItems: {
    gap: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  menuText: {
    fontSize: 16,
    color: '#1B5E20',
  },
  addRecordCard: {
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
  },
  addIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1B5E20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  addRecordTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1B5E20',
    marginBottom: 4,
  },
  addRecordSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  clickButton: {
    backgroundColor: '#1B5E20',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
  },
  clickButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  signOutSection: {
    marginTop: 'auto',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  adminInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1B5E20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  adminDetails: {
    flex: 1,
  },
  adminTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  adminEmail: {
    fontSize: 14,
    color: '#666',
  },
  signOutButton: {
    backgroundColor: '#FFF2F2',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  signOutText: {
    color: '#FF3D71',
    fontSize: 16,
    fontWeight: '500',
  },
}); 