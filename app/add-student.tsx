import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Layout from './components/Layout';

interface RadioButtonProps {
  selected: boolean;
  onPress: () => void;
  label: string;
}

interface FormData {
  firstName: string;
  middleName: string;
  lastName: string;
  course: string;
  yearLevel: string;
  studentNumber: string;
  hasSmartphone: string;
  hasTablet: string;
  hasLaptop: string;
  hasDesktop: string;
  hasInternet: string;
  isIndigenous: boolean;
  isPWD: boolean;
  isRenting: boolean;
  address: string;
  contactNumber: string;
  email: string;
  transportation: string;
  dailyFare: string;
  monthlyRent: string;
}

export default function AddStudent() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    middleName: '',
    lastName: '',
    course: '',
    yearLevel: '',
    studentNumber: '',
    hasSmartphone: '',
    hasTablet: '',
    hasLaptop: '',
    hasDesktop: '',
    hasInternet: '',
    isIndigenous: false,
    isPWD: false,
    isRenting: false,
    address: '',
    contactNumber: '',
    email: '',
    transportation: '',
    dailyFare: '',
    monthlyRent: '',
  });

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setFormData({
        firstName: '',
        middleName: '',
        lastName: '',
        course: '',
        yearLevel: '',
        studentNumber: '',
        hasSmartphone: '',
        hasTablet: '',
        hasLaptop: '',
        hasDesktop: '',
        hasInternet: '',
        isIndigenous: false,
        isPWD: false,
        isRenting: false,
        address: '',
        contactNumber: '',
        email: '',
        transportation: '',
        dailyFare: '',
        monthlyRent: '',
      });
    }, 3000);
  };

  const RadioButton: React.FC<RadioButtonProps> = ({ selected, onPress, label }) => (
    <TouchableOpacity style={styles.radioOption} onPress={onPress}>
      <View style={[styles.radio, selected && styles.radioSelected]}>
        {selected && <View style={styles.radioInner} />}
      </View>
      <Text style={styles.radioLabel}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <Layout pageTitle="Pages / Add Student">
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {showSuccess && (
          <View style={styles.successMessage}>
            <Text style={styles.successText}>Student information successfully added!</Text>
            <TouchableOpacity onPress={() => setShowSuccess(false)}>
              <Text style={styles.closeButton}>×</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>Student Information</Text>
          
          <View style={styles.fullWidth}>
            <Text style={styles.label}>FIRST NAME</Text>
            <TextInput
              style={styles.input}
              value={formData.firstName}
              onChangeText={(text) => setFormData({ ...formData, firstName: text })}
              placeholder="Enter first name"
            />
          </View>
          
          <View style={styles.fullWidth}>
            <Text style={styles.label}>MIDDLE NAME</Text>
            <TextInput
              style={styles.input}
              value={formData.middleName}
              onChangeText={(text) => setFormData({ ...formData, middleName: text })}
              placeholder="Enter middle name"
            />
          </View>
          
          <View style={styles.fullWidth}>
            <Text style={styles.label}>LAST NAME</Text>
            <TextInput
              style={styles.input}
              value={formData.lastName}
              onChangeText={(text) => setFormData({ ...formData, lastName: text })}
              placeholder="Enter last name"
            />
          </View>

          <View style={styles.fullWidth}>
            <Text style={styles.label}>COURSE</Text>
            <TextInput
              style={styles.input}
              value={formData.course}
              onChangeText={(text) => setFormData({ ...formData, course: text })}
              placeholder="Select course"
            />
          </View>
          
          <View style={styles.fullWidth}>
            <Text style={styles.label}>YEAR LEVEL</Text>
            <TextInput
              style={styles.input}
              value={formData.yearLevel}
              onChangeText={(text) => setFormData({ ...formData, yearLevel: text })}
              placeholder="Select year level"
            />
          </View>
          
          <View style={styles.fullWidth}>
            <Text style={styles.label}>STUDENT NUMBER</Text>
            <TextInput
              style={styles.input}
              value={formData.studentNumber}
              onChangeText={(text) => setFormData({ ...formData, studentNumber: text })}
              placeholder="Enter student number"
            />
          </View>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>Devices</Text>
          
          <View style={styles.fullWidth}>
            <Text style={styles.label}>Do you have a smartphone?</Text>
            <View style={styles.radioGroup}>
              <RadioButton
                selected={formData.hasSmartphone === 'yes'}
                onPress={() => setFormData({ ...formData, hasSmartphone: 'yes' })}
                label="Yes"
              />
              <RadioButton
                selected={formData.hasSmartphone === 'no'}
                onPress={() => setFormData({ ...formData, hasSmartphone: 'no' })}
                label="No"
              />
            </View>
          </View>

          <View style={styles.fullWidth}>
            <Text style={styles.label}>Do you have a tablet?</Text>
            <View style={styles.radioGroup}>
              <RadioButton
                selected={formData.hasTablet === 'yes'}
                onPress={() => setFormData({ ...formData, hasTablet: 'yes' })}
                label="Yes"
              />
              <RadioButton
                selected={formData.hasTablet === 'no'}
                onPress={() => setFormData({ ...formData, hasTablet: 'no' })}
                label="No"
              />
            </View>
          </View>

          <View style={styles.fullWidth}>
            <Text style={styles.label}>Do you have a laptop?</Text>
            <View style={styles.radioGroup}>
              <RadioButton
                selected={formData.hasLaptop === 'yes'}
                onPress={() => setFormData({ ...formData, hasLaptop: 'yes' })}
                label="Yes"
              />
              <RadioButton
                selected={formData.hasLaptop === 'no'}
                onPress={() => setFormData({ ...formData, hasLaptop: 'no' })}
                label="No"
              />
            </View>
          </View>

          <View style={styles.fullWidth}>
            <Text style={styles.label}>Do you have a desktop computer?</Text>
            <View style={styles.radioGroup}>
              <RadioButton
                selected={formData.hasDesktop === 'yes'}
                onPress={() => setFormData({ ...formData, hasDesktop: 'yes' })}
                label="Yes"
              />
              <RadioButton
                selected={formData.hasDesktop === 'no'}
                onPress={() => setFormData({ ...formData, hasDesktop: 'no' })}
                label="No"
              />
            </View>
          </View>

          <View style={styles.fullWidth}>
            <Text style={styles.label}>Do you have internet access at home?</Text>
            <View style={styles.radioGroup}>
              <RadioButton
                selected={formData.hasInternet === 'yes'}
                onPress={() => setFormData({ ...formData, hasInternet: 'yes' })}
                label="Yes"
              />
              <RadioButton
                selected={formData.hasInternet === 'no'}
                onPress={() => setFormData({ ...formData, hasInternet: 'no' })}
                label="No"
              />
            </View>
          </View>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>Additional Information</Text>

          <View style={styles.fullWidth}>
            <Text style={styles.label}>Are you an Indigenous Person?</Text>
            <View style={styles.radioGroup}>
              <RadioButton
                selected={formData.isIndigenous}
                onPress={() => setFormData({ ...formData, isIndigenous: true })}
                label="Yes"
              />
              <RadioButton
                selected={!formData.isIndigenous}
                onPress={() => setFormData({ ...formData, isIndigenous: false })}
                label="No"
              />
            </View>
          </View>

          <View style={styles.fullWidth}>
            <Text style={styles.label}>Are you a Person with Disability (PWD)?</Text>
            <View style={styles.radioGroup}>
              <RadioButton
                selected={formData.isPWD}
                onPress={() => setFormData({ ...formData, isPWD: true })}
                label="Yes"
              />
              <RadioButton
                selected={!formData.isPWD}
                onPress={() => setFormData({ ...formData, isPWD: false })}
                label="No"
              />
            </View>
          </View>

          <View style={styles.fullWidth}>
            <Text style={styles.label}>Are you renting a house/apartment/boarding house?</Text>
            <View style={styles.radioGroup}>
              <RadioButton
                selected={formData.isRenting}
                onPress={() => setFormData({ ...formData, isRenting: true })}
                label="Yes"
              />
              <RadioButton
                selected={!formData.isRenting}
                onPress={() => setFormData({ ...formData, isRenting: false })}
                label="No"
              />
            </View>
          </View>

          <View style={styles.fullWidth}>
            <Text style={styles.label}>ADDRESS</Text>
            <TextInput
              style={styles.input}
              value={formData.address}
              onChangeText={(text) => setFormData({ ...formData, address: text })}
              placeholder="Enter complete address"
              multiline
            />
          </View>

          <View style={styles.fullWidth}>
            <Text style={styles.label}>CONTACT NUMBER</Text>
            <TextInput
              style={styles.input}
              value={formData.contactNumber}
              onChangeText={(text) => setFormData({ ...formData, contactNumber: text })}
              placeholder="Enter contact number"
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.fullWidth}>
            <Text style={styles.label}>EMAIL ADDRESS</Text>
            <TextInput
              style={styles.input}
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              placeholder="Enter email address"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.fullWidth}>
            <Text style={styles.label}>MODE OF TRANSPORTATION</Text>
            <TextInput
              style={styles.input}
              value={formData.transportation}
              onChangeText={(text) => setFormData({ ...formData, transportation: text })}
              placeholder="Enter mode of transportation"
            />
          </View>

          <View style={styles.fullWidth}>
            <Text style={styles.label}>DAILY FARE</Text>
            <TextInput
              style={styles.input}
              value={formData.dailyFare}
              onChangeText={(text) => setFormData({ ...formData, dailyFare: text })}
              placeholder="Enter daily fare amount"
              keyboardType="numeric"
            />
          </View>

          {formData.isRenting && (
            <View style={styles.fullWidth}>
              <Text style={styles.label}>MONTHLY RENT</Text>
              <TextInput
                style={styles.input}
                value={formData.monthlyRent}
                onChangeText={(text) => setFormData({ ...formData, monthlyRent: text })}
                placeholder="Enter monthly rent amount"
                keyboardType="numeric"
              />
            </View>
          )}
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
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
  radioGroup: {
    flexDirection: 'row',
    gap: 20,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radio: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  radioSelected: {
    borderColor: '#007AFF',
  },
  radioInner: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#007AFF',
  },
  radioLabel: {
    fontSize: 16,
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#007AFF',
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  successText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  closeButton: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
}); 