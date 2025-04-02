import React, { useEffect, useState } from 'react';
import { TrendingUp, MessageCircle } from 'lucide-react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Avatar,
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  CardActions,
  IconButton,
  CircularProgress,
  Alert,
  Divider,
} from '@mui/material';
import type { Post } from '../types';

const TrendingPosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrendingPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/posts?type=popular');
        if (!response.ok) {
          throw new Error('Failed to fetch trending posts');
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingPosts();
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
            <TrendingUp size={24} style={{ marginRight: 8 }} /> Trending Posts
          </Typography>
        </Box>
        <Box sx={{ p: 2 }}>
          {posts.map((post, index) => (
            <React.Fragment key={post.id}>
              {index > 0 && <Divider sx={{ my: 2 }} />}
              <Card elevation={0}>
                <CardContent>
                  <Typography variant="body1">{post.content}</Typography>
                </CardContent>
                <CardActions>
                  <IconButton size="small" color="inherit">
                    <MessageCircle size={20} />
                  </IconButton>
                  <Typography variant="body2" color="text.secondary">
                    {post.commentCount} comments
                  </Typography>
                </CardActions>
              </Card>
            </React.Fragment>
          ))}
        </Box>
      </Paper>
    </Container>
  );
};

export default TrendingPosts;