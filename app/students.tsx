import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Layout from './components/Layout';
import { getFirestore, collection, getDocs, QuerySnapshot, DocumentData } from 'firebase/firestore';
import app from '../firebaseConfig';

const db = getFirestore(app);

interface Student {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  status?: 'Cleared' | 'Not cleared'; // Optional for compatibility
}

interface Location {
  name: string;
  percentage: number;
}

import { router } from 'expo-router';

export default function StudentsList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(collection(db, 'students'));
      const studentsData: Student[] = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          firstName: data.firstName || '',
          middleName: data.middleName || '',
          lastName: data.lastName || '',
          email: data.email || '',
          status: data.status || 'Uncleared', // Default or fetched value
        };
      });
      setStudents(studentsData);
    } catch (error) {
      setStudents([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchStudents();
    }, [])
  );

  const totalPages = 6;

  return (
    <Layout pageTitle="Pages / Lists">
      <ScrollView style={[styles.container, { paddingHorizontal: 12 }]}>
        <View style={[styles.searchContainer, { margin: 12 }]}>
          <Ionicons name="search-outline" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Type to search..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.header}>

          <View style={[styles.section, { margin: 12 }]}>
            <Text style={styles.sectionTitle}>STUDENTS</Text>
            <Text style={styles.sectionSubtitle}>STATUS</Text>
            
            {loading ? (
              <ActivityIndicator size="large" color="#1B5E20" style={{ marginVertical: 40 }} />
            ) : (
              students
                .filter(student =>
                  (`${student.firstName} ${student.middleName} ${student.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  student.email.toLowerCase().includes(searchQuery.toLowerCase()))
                )
                 .map((student) => (
                  <View key={student.id} style={styles.studentItem}>
                    <View style={styles.studentInfo}>
                      <View style={styles.avatar}>
                        <Ionicons name="person" size={20} color="#666" />
                      </View>
                      <View>
                        <Text style={styles.studentName}>{`${student.firstName} ${student.middleName} ${student.lastName}`.trim()}</Text>
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
                      <TouchableOpacity style={styles.editButton} onPress={() => router.push({ pathname: '/edit-student', params: { id: student.id } })}>
                        <Text style={styles.editText}>Edit</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))
          )}


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
    paddingTop: 8,
    paddingHorizontal: 0,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
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
    paddingHorizontal: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
  listTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 3,
    elevation: 2,
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
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    minHeight: 56,
  },
  studentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    minWidth: 0,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  studentName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
    flexWrap: 'wrap',
    maxWidth: 200,
  },
  studentEmail: {
    fontSize: 12,
    color: '#666',
    maxWidth: 200,
    flexWrap: 'wrap',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
    marginRight: 0,
    minWidth: 68,
    alignItems: 'center',
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