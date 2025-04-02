import React, { useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Navbar from './components/Navbar';
import TopUsers from './components/TopUsers';
import TrendingPosts from './components/TrendingPosts';
import Latest from './components/Latest';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4f46e5',
    },
  },
});

function App() {
  const [currentPage, setCurrentPage] = useState('top-users');

  const renderPage = () => {
    switch (currentPage) {
      case 'top-users':
        return <TopUsers />;
      case 'trending':
        return <TrendingPosts />;
      case 'latest':
        return <Latest />;
      default:
        return <TopUsers />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <Navbar activePage={currentPage} onPageChange={setCurrentPage} />
        <main>{renderPage()}</main>
      </div>
    </ThemeProvider>
  );
}

export default App