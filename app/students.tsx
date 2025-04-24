import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Layout from './components/Layout';

interface Student {
  id: number;
  name: string;
  email: string;
  status: 'Cleared' | 'Not cleared';
}

interface Location {
  name: string;
  percentage: number;
}

export default function StudentsList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const students: Student[] = [
    { id: 1, name: 'Rashed Brigole', email: 'rbrigole2@ssct.edu.ph', status: 'Cleared' },
    { id: 2, name: 'Nikko Maturan', email: 'nmaturan@ssct.edu.ph', status: 'Not cleared' },
    { id: 3, name: 'Rovic Dean Pantilo', email: 'rpantilo4@ssct.edu.ph', status: 'Cleared' },
    { id: 4, name: 'Juliet Bernadez', email: 'jbernadez@ssct.edu.ph', status: 'Cleared' },
    { id: 5, name: 'Andrei Escanan', email: 'aescanan@ssct.edu.ph', status: 'Not cleared' },
    { id: 6, name: 'Jomacar Salve', email: 'jsalve@ssct.edu.ph', status: 'Not cleared' },
  ];

  const locations: Location[] = [
    { name: 'Surigao City', percentage: 60 },
    { name: 'Dinagat Islands', percentage: 10 },
    { name: 'Badas', percentage: 100 },
    { name: 'Boyongan', percentage: 100 },
    { name: 'Timamana', percentage: 25 },
    { name: 'Placer', percentage: 40 },
  ];

  const totalPages = 6;

  return (
    <Layout pageTitle="Pages / Lists">
      <ScrollView style={styles.container}>
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Type to search..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.header}>
          <Text style={styles.listTitle}>Lists</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>STUDENTS</Text>
          <Text style={styles.sectionSubtitle}>STATUS</Text>
          
          {students.map((student) => (
            <View key={student.id} style={styles.studentItem}>
              <View style={styles.studentInfo}>
                <View style={styles.avatar}>
                  <Ionicons name="person" size={20} color="#666" />
                </View>
                <View>
                  <Text style={styles.studentName}>{student.name}</Text>
                  <Text style={styles.studentEmail}>{student.email}</Text>
                </View>
              </View>
              <View style={styles.statusContainer}>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: student.status === 'Cleared' ? '#E8F5E9' : '#FFEBEE' }
                ]}>
                  <Text style={[
                    styles.statusText,
                    { color: student.status === 'Cleared' ? '#1B5E20' : '#C62828' }
                  ]}>
                    {student.status}
                  </Text>
                </View>
                <TouchableOpacity style={styles.editButton}>
                  <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

          <View style={styles.pagination}>
            {[...Array(totalPages)].map((_, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.pageButton,
                  currentPage === index + 1 && styles.activePageButton
                ]}
                onPress={() => setCurrentPage(index + 1)}
              >
                <Text style={[
                  styles.pageButtonText,
                  currentPage === index + 1 && styles.activePageButtonText
                ]}>
                  {index + 1}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.pageButton}>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.addressTitle}>Address</Text>
          <View style={styles.locationHeader}>
            <Text style={styles.locationTitle}>Student location</Text>
            <Text style={styles.percentageTitle}>PERCENTAGE</Text>
          </View>
          
          {locations.map((location, index) => (
            <View key={index} style={styles.locationItem}>
              <Text style={styles.locationName}>{location.name}</Text>
              <View style={styles.percentageContainer}>
                <View style={[styles.percentageBar, { width: `${location.percentage}%` }]} />
                <Text style={styles.percentageText}>{location.percentage}%</Text>
              </View>
            </View>
          ))}

          <View style={styles.pagination}>
            {[...Array(totalPages)].map((_, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.pageButton,
                  currentPage === index + 1 && styles.activePageButton
                ]}
                onPress={() => setCurrentPage(index + 1)}
              >
                <Text style={[
                  styles.pageButtonText,
                  currentPage === index + 1 && styles.activePageButtonText
                ]}>
                  {index + 1}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.pageButton}>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  header: {
    padding: 20,
    paddingTop: 0,
  },
  listTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  section: {
    backgroundColor: '#fff',
    margin: 20,
    marginTop: 0,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    marginBottom: 20,
  },
  studentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  studentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  studentName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  studentEmail: {
    fontSize: 12,
    color: '#666',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  editButton: {
    paddingHorizontal: 12,
  },
  editText: {
    fontSize: 14,
    color: '#1B5E20',
    fontWeight: '500',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    gap: 8,
  },
  pageButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  activePageButton: {
    backgroundColor: '#1B5E20',
  },
  pageButtonText: {
    fontSize: 14,
    color: '#666',
  },
  activePageButtonText: {
    color: '#fff',
  },
  addressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  locationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  locationTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  percentageTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  locationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationName: {
    fontSize: 14,
    color: '#333',
  },
  percentageContainer: {
    flex: 1,
    marginLeft: 20,
    height: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
    overflow: 'hidden',
    position: 'relative',
  },
  percentageBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#1B5E20',
    borderRadius: 4,
  },
  percentageText: {
    position: 'absolute',
    right: -40,
    top: -4,
    fontSize: 12,
    color: '#666',
  },
}); 