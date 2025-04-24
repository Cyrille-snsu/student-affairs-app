import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Layout from '../components/Layout';
import { Svg, Circle, G, Path } from 'react-native-svg';

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');

  const stats = [
    {
      icon: 'document-outline',
      title: 'Total records',
      subtitle: 'Total Records',
      value: '53,000'
    },
    {
      icon: 'accessibility-outline',
      title: 'Indigenous People',
      subtitle: 'Indigenous People',
      value: '2,300'
    },
    {
      icon: 'body-outline',
      title: 'Person with Disability',
      subtitle: 'Person with Disability',
      value: '3,052'
    },
    {
      icon: 'home-outline',
      title: 'Renting a House',
      subtitle: 'Renting a House',
      value: '3,000'
    }
  ];

  const chartData = [
    { label: 'Indigenous', percentage: 35, color: '#40E0D0' },
    { label: "PWD's", percentage: 25, color: '#006400' },
    { label: 'Renting', percentage: 25, color: '#90EE90' },
    { label: 'No gadget', percentage: 15, color: '#1E90FF' }
  ];

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
          {stats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <View style={styles.statContent}>
                <Text style={styles.statSubtitle}>{stat.subtitle}</Text>
                <Text style={styles.statValue}>{stat.value}</Text>
              </View>
              <View style={styles.iconContainer}>
                <Ionicons name={stat.icon as any} size={24} color="#1B5E20" />
              </View>
            </View>
          ))}
        </View>

        <View style={styles.chartSection}>
          <Text style={styles.chartTitle}>Socio Demographic</Text>
          <Text style={styles.totalValue}>53,000</Text>
          <Text style={styles.totalLabel}>Totals</Text>
          
          <View style={styles.chartContainer}>
            {renderDonutChart()}
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
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
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
});
