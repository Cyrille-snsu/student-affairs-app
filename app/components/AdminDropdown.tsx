import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface AdminDropdownProps {
  isVisible: boolean;
  onClose: () => void;
  onSignOut: () => void;
}

export default function AdminDropdown({ isVisible, onClose, onSignOut }: AdminDropdownProps) {
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.overlay} 
        activeOpacity={1} 
        onPress={onClose}
      >
        <View style={styles.dropdown}>
          <View style={styles.adminInfo}>
            <View style={styles.avatarContainer}>
              <Ionicons name="person" size={24} color="#fff" />
            </View>
            <View style={styles.adminDetails}>
              <Text style={styles.adminTitle}>Admin</Text>
              <Text style={styles.adminEmail}>studentaffairs@ssct.edu.ph</Text>
            </View>
          </View>
          
          <Pressable 
            style={({ pressed }) => [
              styles.signOutButton,
              pressed && styles.signOutButtonPressed
            ]}
            onPress={onSignOut}
          >
            <Ionicons name="log-out-outline" size={20} color="#FF3D71" />
            <Text style={styles.signOutText}>Sign out</Text>
          </Pressable>

          <TouchableOpacity 
            style={styles.closeButton}
            onPress={onClose}
          >
            <Text style={styles.closeText}>×</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginTop: 60,
    marginRight: 16,
    width: 300,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  adminInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EDF1F7',
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
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
    color: '#222B45',
    marginBottom: 4,
  },
  adminEmail: {
    fontSize: 14,
    color: '#8F9BB3',
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#FFF2F2',
  },
  signOutButtonPressed: {
    backgroundColor: '#FFE6E6',
  },
  signOutText: {
    fontSize: 14,
    color: '#FF3D71',
    fontWeight: '500',
  },
  closeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    fontSize: 24,
    color: '#8F9BB3',
    lineHeight: 24,
  },
}); 