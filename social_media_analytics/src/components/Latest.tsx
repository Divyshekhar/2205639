import React, { useEffect, useState } from 'react';
import { MessageSquare, Heart, Share2 } from 'lucide-react';
import {
  Container,
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  CircularProgress,
  Alert,
  Stack,
} from '@mui/material';
import type { Post } from '../types';

const Latest: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/posts?type=latest');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();

    // Poll for new posts every 30 seconds
    const pollInterval = setInterval(fetchPosts, 30000);

    return () => clearInterval(pollInterval);
  }, []);

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Stack spacing={3}>
        {posts.map((post) => (
          <Card key={post.id} elevation={2}>
            <CardContent>
              <Typography variant="body1">{post.content}</Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="like">
                <Heart size={20} />
              </IconButton>
              <IconButton aria-label="comment">
                <MessageSquare size={20} />
              </IconButton>
              <Typography variant="body2" color="text.secondary" sx={{ mx: 1 }}>
                {post.commentCount} comments
              </Typography>
              <IconButton aria-label="share" sx={{ ml: 'auto' }}>
                <Share2 size={20} />
              </IconButton>
            </CardActions>
          </Card>
        ))}
      </Stack>
    </Container>
  );
};

export default Latest;