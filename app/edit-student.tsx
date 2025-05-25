import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import app from '../firebaseConfig';

const db = getFirestore(app);

export default function EditStudent() {
  const { id } = useLocalSearchParams();
  const [student, setStudent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudent = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, 'students', String(id));
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setStudent({ id: docSnap.id, ...docSnap.data() });
        } else {
          setShowError('Student not found.');
        }
      } catch (err) {
        setShowError('Failed to fetch student.');
      }
      setLoading(false);
    };
    if (id) fetchStudent();
  }, [id]);

  const handleChange = (field: string, value: string | boolean) => {
    setStudent((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleMarkAsCleared = async () => {
    if (!student) return;
    setUpdating(true);
    try {
      const docRef = doc(db, 'students', student.id);
      await updateDoc(docRef, { status: 'Cleared' });
      setStudent((prev: any) => ({ ...prev, status: 'Cleared' }));
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    } catch (err) {
      setShowError('Failed to update status.');
    }
    setUpdating(false);
  };

  if (!student) {
    return null;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonIcon}>{'←'}</Text>
        <Text style={styles.backButtonText}>Go Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Edit Student</Text>
      {showSuccess && (
        <View style={styles.successMessage}>
          <Text style={styles.successText}>Student marked as Cleared!</Text>
        </View>
      )}
      <View style={styles.formContainer}>
        <Text style={styles.sectionTitle}>Student Information</Text>
        {[
          { label: 'First Name', field: 'firstName' },
          { label: 'Middle Name', field: 'middleName' },
          { label: 'Last Name', field: 'lastName' },
          { label: 'Course', field: 'course' },
          { label: 'Year Level', field: 'yearLevel' },
          { label: 'Student Number', field: 'studentNumber' },
          { label: 'Address', field: 'address' },
          { label: 'Contact Number', field: 'contactNumber' },
          { label: 'Email', field: 'email' },
          { label: 'Mode of Transportation', field: 'transportation' },
          { label: 'Daily Fare', field: 'dailyFare' },
          { label: 'Monthly Rent', field: 'monthlyRent' },
        ].map(({ label, field }) => (
          <View style={styles.fullWidth} key={field}>
            <Text style={styles.label}>{label.toUpperCase()}</Text>
            <TextInput
              style={styles.input}
              value={student[field] ? String(student[field]) : ''}
              onChangeText={text => handleChange(field, text)}
              editable={field !== 'email' && field !== 'studentNumber'}
            />
          </View>
        ))}
        {/* Boolean fields */}
        <View style={styles.fullWidth}>
          <Text style={styles.label}>Indigenous Person</Text>
          <Text>{student.isIndigenous ? 'Yes' : 'No'}</Text>
        </View>
        <View style={styles.fullWidth}>
          <Text style={styles.label}>Person with Disability</Text>
          <Text>{student.isPWD ? 'Yes' : 'No'}</Text>
        </View>
        <View style={styles.fullWidth}>
          <Text style={styles.label}>Renting</Text>
          <Text>{student.isRenting ? 'Yes' : 'No'}</Text>
        </View>
        <View style={styles.fullWidth}>
          <Text style={styles.label}>Has Smartphone</Text>
          <Text>{student.hasSmartphone ? 'Yes' : 'No'}</Text>
        </View>
        <View style={styles.fullWidth}>
          <Text style={styles.label}>Has Tablet</Text>
          <Text>{student.hasTablet ? 'Yes' : 'No'}</Text>
        </View>
        <View style={styles.fullWidth}>
          <Text style={styles.label}>Has Laptop</Text>
          <Text>{student.hasLaptop ? 'Yes' : 'No'}</Text>
        </View>
        <View style={styles.fullWidth}>
          <Text style={styles.label}>Has Desktop</Text>
          <Text>{student.hasDesktop ? 'Yes' : 'No'}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={[styles.submitButton, { backgroundColor: student.status === 'Cleared' ? '#ccc' : '#1B5E20' }]}
        onPress={handleMarkAsCleared}
        disabled={student.status === 'Cleared' || updating}
      >
        <Text style={styles.submitButtonText}>
          {student.status === 'Cleared' ? 'Already Cleared' : updating ? 'Marking...' : 'Mark as Cleared'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 18,
    color: '#1B5E20',
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  fullWidth: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    color: '#666',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fff',
  },
  submitButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 30,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  successMessage: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  successText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  backButtonIcon: {
    fontSize: 22,
    color: '#1B5E20',
    marginRight: 6,
    fontWeight: 'bold',
  },
  backButtonText: {
    fontSize: 16,
    color: '#1B5E20',
    fontWeight: '500',
  },
});
