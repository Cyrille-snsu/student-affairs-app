import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, ActivityIndicator, Modal, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Layout from '../components/Layout';
import { Svg, Circle, G, Path } from 'react-native-svg';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import app from '../../firebaseConfig';

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState<any[]>([]);
  const [showAllModal, setShowAllModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  useEffect(() => {
    if (!showAllModal) {
      setSearchText('');
      setSearchResults([]);
    }
  }, [showAllModal]);

  const handleSearch = () => {
    const text = searchText.trim().toLowerCase();
    if (!text) {
      setSearchResults([]);
      return;
    }
    setSearchResults(
      students.filter(s =>
        (`${s.firstName} ${s.middleName} ${s.lastName}`.toLowerCase().includes(text) ||
         s.firstName.toLowerCase().includes(text) ||
         s.middleName.toLowerCase().includes(text) ||
         s.lastName.toLowerCase().includes(text))
      )
    );
  };

  // Analytics state
  const [stats, setStats] = useState([
    {
      icon: 'document-outline',
      title: 'Total records',
      subtitle: 'Total Records',
      value: '0'
    },
    {
      icon: 'accessibility-outline',
      title: 'Indigenous People',
      subtitle: 'Indigenous People',
      value: '0'
    },
    {
      icon: 'body-outline',
      title: 'Person with Disability',
      subtitle: 'Person with Disability',
      value: '0'
    },
    {
      icon: 'home-outline',
      title: 'Renting a House',
      subtitle: 'Renting a House',
      value: '0'
    }
  ]);

  const [chartData, setChartData] = useState([
    { label: 'Indigenous', percentage: 0, color: '#40E0D0' },
    { label: "PWD's", percentage: 0, color: '#006400' },
    { label: 'Renting', percentage: 0, color: '#90EE90' },
    { label: 'No gadget', percentage: 0, color: '#1E90FF' }
  ]);

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      const db = getFirestore(app);
      const querySnapshot = await getDocs(collection(db, 'students'));
      const studentsData = querySnapshot.docs.map(doc => doc.data());
      setStudents(studentsData);
      // Compute analytics
      const total = studentsData.length;
      const indigenous = studentsData.filter(s => s.isIndigenous).length;
      const pwd = studentsData.filter(s => s.isPWD).length;
      const renting = studentsData.filter(s => s.isRenting).length;
      // "No gadget" = no smartphone, tablet, laptop, desktop
      const noGadget = studentsData.filter(s =>
        (!s.hasSmartphone || s.hasSmartphone === 'No') &&
        (!s.hasTablet || s.hasTablet === 'No') &&
        (!s.hasLaptop || s.hasLaptop === 'No') &&
        (!s.hasDesktop || s.hasDesktop === 'No')
      ).length;
      setStats([
        {
          icon: 'document-outline',
          title: 'Total records',
          subtitle: 'Total Records',
          value: String(total)
        },
        {
          icon: 'accessibility-outline',
          title: 'Indigenous People',
          subtitle: 'Indigenous People',
          value: String(indigenous)
        },
        {
          icon: 'body-outline',
          title: 'Person with Disability',
          subtitle: 'Person with Disability',
          value: String(pwd)
        },
        {
          icon: 'home-outline',
          title: 'Renting a House',
          subtitle: 'Renting a House',
          value: String(renting)
        }
      ]);
      setChartData([
        { label: 'Indigenous', percentage: total ? (indigenous / total) * 100 : 0, color: '#40E0D0' },
        { label: "PWD's", percentage: total ? (pwd / total) * 100 : 0, color: '#006400' },
        { label: 'Renting', percentage: total ? (renting / total) * 100 : 0, color: '#90EE90' },
        { label: 'No gadget', percentage: total ? (noGadget / total) * 100 : 0, color: '#1E90FF' }
      ]);
      setLoading(false);
    };
    fetchStudents();
  }, []);

  const renderDonutChart = () => {
    let currentAngle = 0;
    const paths = chartData.map((item, index) => {
      const angle = (item.percentage / 100) * 360;
      const x1 = Math.cos((currentAngle - 90) * (Math.PI / 180)) * 50 + 60;
      const y1 = Math.sin((currentAngle - 90) * (Math.PI / 180)) * 50 + 60;
      const x2 = Math.cos((currentAngle + angle - 90) * (Math.PI / 180)) * 50 + 60;
      const y2 = Math.sin((currentAngle + angle - 90) * (Math.PI / 180)) * 50 + 60;
      
      const largeArcFlag = angle > 180 ? 1 : 0;
      const pathData = `M 60 60 L ${x1} ${y1} A 50 50 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
      currentAngle += angle;
      
      return <Path key={index} d={pathData} fill={item.color} />;
    });

    return (
      <Svg height="200" width="200" viewBox="0 0 120 120">
        <Circle cx="60" cy="60" r="40" fill="white" />
        {paths}
        <Circle cx="60" cy="60" r="25" fill="white" />
      </Svg>
    );
  };

  return (
    <Layout pageTitle="Pages / Dashboard">
      <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="handled">
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.pageTitle}>Dashboard</Text>
        </View>

        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Type to search..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.statsContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#1B5E20" style={{ marginVertical: 40 }} />
          ) : (
            stats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <View style={styles.statContent}>
                  <Text style={styles.statSubtitle}>{stat.subtitle}</Text>
                  <Text style={styles.statValue}>{stat.value}</Text>
                  {index === 0 && (
                    <TouchableOpacity style={styles.viewAllButton} onPress={() => setShowAllModal(true)}>
                      <Text style={styles.viewAllButtonText}>View All</Text>
                    </TouchableOpacity>
                  )}
                </View>
                <View style={styles.iconContainer}>
                  <Ionicons name={stat.icon as any} size={24} color="#1B5E20" />
                </View>
              </View>
            ))
          )}
        </View>

        {/* Modal for viewing all students */}
        <Modal visible={showAllModal} animationType="slide" onRequestClose={() => setShowAllModal(false)}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>All Student Records</Text>
            <TouchableOpacity style={styles.closeModalButton} onPress={() => setShowAllModal(false)}>
              <Text style={styles.closeModalButtonText}>Close</Text>
            </TouchableOpacity>
            {/* Search Bar */}
            <View style={styles.searchBarContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search student by name..."
                value={searchText}
                onChangeText={setSearchText}
                onSubmitEditing={handleSearch}
                returnKeyType="search"
              />
              <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                <Text style={styles.searchButtonText}>Search</Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={{ flex: 1 }}>
              {(searchText ? searchResults : students).length === 0 ? (
                <Text style={{ textAlign: 'center', marginTop: 40 }}>No students found.</Text>
              ) : (
                (searchText ? searchResults : students).map((student, idx) => (
                  <TouchableOpacity
                    key={student.id || idx}
                    style={styles.compactStudentCard}
                    onPress={() => setSelectedStudent(student)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.compactStudentName}>{student.firstName} {student.middleName} {student.lastName}</Text>
                  </TouchableOpacity>
                ))
              )}
            </ScrollView> 
          </View>
        </Modal>

        {/* Detail modal for selected student */}
        <Modal
          visible={!!selectedStudent}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setSelectedStudent(null)}
        >
          <View style={styles.detailModalOverlay}>
            <View style={styles.detailModalCard}>
              <TouchableOpacity style={styles.closeModalButton} onPress={() => setSelectedStudent(null)}>
                <Text style={styles.closeModalButtonText}>Close</Text>
              </TouchableOpacity>
              {selectedStudent && (
                <ScrollView>
                  <Text style={styles.studentProfileName}>{selectedStudent.firstName} {selectedStudent.middleName} {selectedStudent.lastName}</Text>
                  <View style={styles.clearanceStatusRow}>
                    <Text style={
                      [styles.clearanceBadge,
                        selectedStudent.status === 'Cleared'
                          ? styles.clearedBadge
                          : styles.notClearedBadge
                      ]
                    }>
                      {selectedStudent.status === 'Cleared' ? 'Cleared' : 'Not Cleared'}
                    </Text>
                  </View>
                  <View style={styles.studentProfileDivider} />
                  <View style={styles.studentProfileSectionRow}>
                    <View style={styles.studentProfileSectionCol}>
                      <Text style={styles.studentProfileLabel}>Student No.</Text>
                      <Text style={styles.studentProfileValue}>{selectedStudent.studentNumber}</Text>
                    </View>
                    <View style={styles.studentProfileSectionCol}>
                      <Text style={styles.studentProfileLabel}>Year/Course</Text>
                      <Text style={styles.studentProfileValue}>{selectedStudent.yearLevel} / {selectedStudent.course}</Text>
                    </View>
                  </View>
                  <View style={styles.studentProfileSectionRow}>
                    <View style={styles.studentProfileSectionCol}>
                      <Text style={styles.studentProfileLabel}>Status</Text>
                      <Text style={styles.studentProfileValue}>{selectedStudent.status}</Text>
                    </View>
                    <View style={styles.studentProfileSectionCol}>
                      <Text style={styles.studentProfileLabel}>Contact</Text>
                      <Text style={styles.studentProfileValue}>{selectedStudent.contactNumber}</Text>
                    </View>
                  </View>
                  <View style={styles.studentProfileSectionRow}>
                    <View style={styles.studentProfileSectionCol}>
                      <Text style={styles.studentProfileLabel}>Email</Text>
                      <Text style={styles.studentProfileValue}>{selectedStudent.email}</Text>
                    </View>
                    <View style={styles.studentProfileSectionCol}>
                      <Text style={styles.studentProfileLabel}>Address</Text>
                      <Text style={styles.studentProfileValue}>{selectedStudent.address}</Text>
                    </View>
                  </View>
                  <View style={styles.studentProfileSectionRow}>
                    <View style={styles.studentProfileSectionCol}>
                      <Text style={styles.studentProfileLabel}>Daily Fare</Text>
                      <Text style={styles.studentProfileValue}>{selectedStudent.dailyFare}</Text>
                    </View>
                    <View style={styles.studentProfileSectionCol}>
                      <Text style={styles.studentProfileLabel}>Monthly Rent</Text>
                      <Text style={styles.studentProfileValue}>{selectedStudent.monthlyRent}</Text>
                    </View>
                  </View>
                  <View style={styles.studentProfileDivider} />
                  <View style={styles.studentProfileSectionRow}>
                    <View style={styles.studentProfileSectionCol}>
                      <Text style={styles.studentProfileLabel}>Indigenous</Text>
                      <Text style={styles.studentProfileValue}>{selectedStudent.isIndigenous ? 'Yes' : 'No'}</Text>
                    </View>
                    <View style={styles.studentProfileSectionCol}>
                      <Text style={styles.studentProfileLabel}>PWD</Text>
                      <Text style={styles.studentProfileValue}>{selectedStudent.isPWD ? 'Yes' : 'No'}</Text>
                    </View>
                    <View style={styles.studentProfileSectionCol}>
                      <Text style={styles.studentProfileLabel}>Renting</Text>
                      <Text style={styles.studentProfileValue}>{selectedStudent.isRenting ? 'Yes' : 'No'}</Text>
                    </View>
                  </View>
                  <View style={styles.studentProfileSectionRow}>
                    <View style={styles.studentProfileSectionCol}>
                      <Text style={styles.studentProfileLabel}>Smartphone</Text>
                      <Text style={styles.studentProfileValue}>{selectedStudent.hasSmartphone === 'yes' || selectedStudent.hasSmartphone === true ? 'Yes' : 'No'}</Text>
                    </View>
                    <View style={styles.studentProfileSectionCol}>
                      <Text style={styles.studentProfileLabel}>Tablet</Text>
                      <Text style={styles.studentProfileValue}>{selectedStudent.hasTablet === 'yes' || selectedStudent.hasTablet === true ? 'Yes' : 'No'}</Text>
                    </View>
                    <View style={styles.studentProfileSectionCol}>
                      <Text style={styles.studentProfileLabel}>Laptop</Text>
                      <Text style={styles.studentProfileValue}>{selectedStudent.hasLaptop === 'yes' || selectedStudent.hasLaptop === true ? 'Yes' : 'No'}</Text>
                    </View>
                    <View style={styles.studentProfileSectionCol}>
                      <Text style={styles.studentProfileLabel}>Desktop</Text>
                      <Text style={styles.studentProfileValue}>{selectedStudent.hasDesktop === 'yes' || selectedStudent.hasDesktop === true ? 'Yes' : 'No'}</Text>
                    </View>
                    <View style={styles.studentProfileSectionCol}>
                      <Text style={styles.studentProfileLabel}>Internet</Text>
                      <Text style={styles.studentProfileValue}>{selectedStudent.hasInternet === 'yes' || selectedStudent.hasInternet === true ? 'Yes' : 'No'}</Text>
                    </View>
                  </View>
                </ScrollView>
              )}
            </View>
          </View>
        </Modal>

        <View style={styles.chartSection}>
          <Text style={styles.chartTitle}>Socio Demographic</Text>
          <Text style={styles.totalValue}>{stats[0]?.value || 0}</Text>
          <Text style={styles.totalLabel}>Totals</Text>
          
          <View style={styles.chartContainer}>
            {loading ? (
              <ActivityIndicator size="large" color="#1B5E20" style={{ marginVertical: 40 }} />
            ) : renderDonutChart()}
            <View style={styles.legendContainer}>
              {chartData.map((item, index) => (
                <View key={index} style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: item.color }]} />
                  <Text style={styles.legendText}>{item.label}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
        {/* Address/Location section moved from Students List */}
        <View style={styles.section}>
          <Text style={styles.addressTitle}>Address</Text>
          <View style={styles.locationHeader}>
            <Text style={styles.locationTitle}>Student location</Text>
            <Text style={styles.percentageTitle}>PERCENTAGE</Text>
          </View>
          {/* Dynamic location analytics */}
          {(() => {
            const locations = [
              { name: 'Surigao', key: 'Surigao' },
              { name: 'Dinagat', key: 'Dinagat' },
              { name: 'Badas', key: 'Badas' },
              { name: 'Boyongan', key: 'Boyongan' },
              { name: 'Timamana', key: 'Timamana' },
              { name: 'Placer', key: 'Placer' },
            ];
            const total = students.length;
            return (
              <>
                {locations.map((loc, index) => {
                  const count = students.filter(s =>
                    s.address && typeof s.address === 'string' &&
                    s.address.toLowerCase().includes(loc.key.toLowerCase())
                  ).length;
                  const percentage = total ? Math.round((count / total) * 100) : 0;
                  return (
                    <View key={index} style={styles.locationItem}>
                      <View style={styles.locationNameRow}>
                        <Text style={styles.locationName}>{loc.name}</Text>
                      </View>
                      <View style={styles.percentageContainer}>
                        <View style={styles.percentageBarBg}>
                          <View style={[styles.percentageBar, { width: `${percentage}%` }]} />
                        </View>
                        <Text style={styles.locationCount}>{count}</Text>
                        <Text style={styles.percentageText}>({percentage}%)</Text>
                      </View>
                    </View>
                  );
                })}
              </>
            );
          })()}
        </View>
      </ScrollView>
      </ScrollView>
    </Layout>
  );
}

// Ensure no duplicate property names and all keys are unique
const styles = StyleSheet.create({
  viewAllButton: {
    marginTop: 10,
    paddingVertical: 6,
    paddingHorizontal: 16,
    backgroundColor: '#1B5E20',
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  viewAllButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  // Only one definition for compactStudentCard and compactStudentName is kept. Remove this duplicate.
  // compactStudentCard: {
  //   backgroundColor: '#fff',
  //   borderRadius: 10,
  //   paddingVertical: 16,
  //   paddingHorizontal: 20,
  //   marginBottom: 12,
  //   borderWidth: 1,
  //   borderColor: '#e0e0e0',
  //   elevation: 1,
  //   shadowColor: '#000',
  //   shadowOffset: { width: 0, height: 1 },
  //   shadowOpacity: 0.04,
  //   shadowRadius: 2,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // compactStudentName: {
  //   fontSize: 17,
  //   fontWeight: 'bold',
  //   color: '#1B5E20',
  //   textAlign: 'center',
  // },

  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 50,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  closeModalButton: {
    position: 'absolute',
    right: 20,
    top: 50,
    backgroundColor: '#eee',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    zIndex: 2,
  },
  closeModalButtonText: {
    color: '#1B5E20',
    fontWeight: 'bold',
    fontSize: 14,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 8,
    paddingHorizontal: 8,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginRight: 8,
  },
  searchButton: {
    backgroundColor: '#1B5E20',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  compactStudentCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  compactStudentName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1B5E20',
    textAlign: 'center',
  },
  clearanceStatusRow: {
    alignItems: 'center',
    marginVertical: 6,
  },
  clearanceBadge: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingVertical: 4,
    paddingHorizontal: 14,
    borderRadius: 16,
    overflow: 'hidden',
    color: '#fff',
    marginBottom: 2,
    alignSelf: 'center',
  },
  clearedBadge: {
    backgroundColor: '#43a047',
  },
  notClearedBadge: {
    backgroundColor: '#e53935',
  },
  detailModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailModalCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 22,
    width: '92%',
    maxHeight: '90%',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  studentProfileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 6,
    textAlign: 'center',
  },
  studentProfileDivider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 10,
    width: '100%',
  },
  studentProfileSectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    flexWrap: 'wrap',
  },
  studentProfileSectionCol: {
    flex: 1,
    minWidth: 110,
    marginRight: 8,
    marginBottom: 4,
  },
  studentProfileLabel: {
    fontSize: 13,
    color: '#888',
    marginBottom: 2,
  },
  studentProfileValue: {
    fontSize: 15,
    color: '#222',
    fontWeight: '500',
    marginBottom: 2,
  },
  studentFieldRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  studentFieldLabel: {
    fontWeight: 'bold',
    marginRight: 8,
    color: '#1B5E20',
    minWidth: 90,
  },
  studentFieldValue: {
    flex: 1,
    color: '#333',
  },
  percentageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    marginBottom: 10,
  },
  percentageBarBg: {
    width: 100,
    height: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
    overflow: 'hidden',
    marginRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationCount: {
    fontSize: 14,
    color: '#333',
    marginLeft: 10,
    fontWeight: 'bold',
    minWidth: 18,
    textAlign: 'right',
  },
  percentageText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
    minWidth: 36,
    textAlign: 'left',
  },
  locationNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 20,
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
  statsContainer: {
    paddingHorizontal: 20,
  },
  statCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statContent: {
    flex: 1,
  },
  statSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartSection: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  totalValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  totalLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  chartContainer: {
    alignItems: 'center',
    width: '100%',
  },
  legendContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 20,
    gap: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    color: '#666',
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
  // Only one definition for percentageText is kept below. Remove this duplicate.
  // percentageText: {
  //   position: 'absolute',
  //   right: -40,
  //   top: -4,
  //   fontSize: 12,
  //   color: '#666',
  // },

});
