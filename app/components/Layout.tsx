import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Header from './Header';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
}

export default function Layout({ children, pageTitle = 'Pages / Dashboard' }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.sidebarContainer, !isSidebarOpen && styles.sidebarClosed]}>
        <Sidebar onNavigate={() => setIsSidebarOpen(false)} />
      </View>
      
      <View style={[styles.mainContent, !isSidebarOpen && styles.mainContentExpanded]}>
        <Header onMenuPress={toggleSidebar} pageTitle={pageTitle} />
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
  },
  sidebarContainer: {
    width: 250,
    backgroundColor: '#fff',
    borderRightWidth: 1,
    borderRightColor: '#eee',
  },
  sidebarClosed: {
    width: 0,
  },
  mainContent: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  mainContentExpanded: {
    flex: 1,
  },
}); 