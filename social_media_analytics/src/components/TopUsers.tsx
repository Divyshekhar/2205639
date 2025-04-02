import React, { useEffect, useState } from 'react';
import { Trophy, Medal } from 'lucide-react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  CircularProgress,
  Alert,
} from '@mui/material';
import type { User } from '../types';

const TopUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3}>
        <Box sx={{ p: 3, bgcolor: 'primary.main', color: 'white' }}>
          <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center' }}>
            <Trophy size={24} style={{ marginRight: 8 }} /> Top Contributors
          </Typography>
        </Box>
        <List>
          {users.map((user, index) => (
            <ListItem
              key={user.id}
              sx={{
                py: 2,
                '&:hover': { bgcolor: 'action.hover' },
              }}
            >
              <ListItemAvatar>
                <Box sx={{ position: 'relative' }}>
                  {index < 3 && (
                    <Medal
                      className={`absolute -top-2 -right-0 ${
                        index === 0
                          ? 'text-yellow-400'
                          : index === 1
                          ? 'text-gray-400'
                          : 'text-orange-400'
                      }`}
                      size={20}
                    />
                  )}
                  <Avatar
                    src={user.avatar}
                    alt={user.name}
                    sx={{ width: 48, height: 48 }}
                  />
                </Box>
              </ListItemAvatar>
              <ListItemText
                primary={user.name}
                secondary={`#${index + 1} Ranked`}
              />
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="h6" color="primary">
                  {user.postCount}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  posts
                </Typography>
              </Box>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default TopUsers;