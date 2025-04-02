import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { BarChart2, Users, MessageSquare } from 'lucide-react';

interface NavItemProps {
  active: boolean;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ active, icon, label, onClick }) => (
  <Button
    onClick={onClick}
    sx={{
      color: active ? 'primary.main' : 'text.secondary',
      backgroundColor: active ? 'action.selected' : 'transparent',
      '&:hover': {
        backgroundColor: active ? 'action.selected' : 'action.hover',
      },
      mx: 1,
    }}
    startIcon={icon}
  >
    {label}
  </Button>
);

interface NavbarProps {
  activePage: string;
  onPageChange: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activePage, onPageChange }) => {
  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <Typography variant="h6" color="primary" sx={{ flexGrow: 0 }}>
          Social Analytics
        </Typography>
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <NavItem
            active={activePage === 'top-users'}
            icon={<Users size={20} />}
            label="Top Users"
            onClick={() => onPageChange('top-users')}
          />
          <NavItem
            active={activePage === 'trending'}
            icon={<BarChart2 size={20} />}
            label="Trending"
            onClick={() => onPageChange('trending')}
          />
          <NavItem
            active={activePage === 'latest'}
            icon={<MessageSquare size={20} />}
            label="Latest"
            onClick={() => onPageChange('latest')}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;