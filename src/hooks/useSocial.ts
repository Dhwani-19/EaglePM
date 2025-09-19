import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface UserProfile {
  user_id: string;
  display_name: string | null;
  avatar_url: string | null;
  username: string | null;
}

interface CommunityPost {
  id: string;
  user_id: string;
  content: string;
  likes_count: number;
  comments_count: number;
  created_at: string;
  profiles: UserProfile;
  is_liked?: boolean;
}

interface Follow {
  follower_id: string;
  following_id: string;
  profiles: UserProfile;
}

export const useSocial = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [followers, setFollowers] = useState<Follow[]>([]);
  const [following, setFollowing] = useState<Follow[]>([]);
  const [allUsers, setAllUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchPosts();
      fetchFollowers();
      fetchFollowing();
      fetchAllUsers();
    }
  }, [user]);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('community_posts')
        .select(`
          *,
          profiles (
            user_id,
            display_name,
            avatar_url,
            username
          )
        `)
        .order('created_at', { ascending: false });

      if (!error && data) {
        // Determine which posts are liked by the current user to drive UI state
        if (user && data.length > 0) {
          const postIds = data.map((p: any) => p.id);
          const { data: likedRows } = await supabase
            .from('post_likes')
            .select('post_id')
            .eq('user_id', user.id)
            .in('post_id', postIds as any);

          const likedSet = new Set((likedRows || []).map((r: any) => r.post_id));
          const mapped = data.map((p: any) => ({ ...p, is_liked: likedSet.has(p.id) }));
          setPosts(mapped);
        } else {
          setPosts(data);
        }
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const fetchFollowers = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_followers')
        .select(`
          follower_id,
          following_id,
          profiles!user_followers_follower_fkey (
            user_id,
            display_name,
            avatar_url,
            username
          )
        `)
        .eq('following_id', user.id);

      if (!error && data) {
        setFollowers(data);
      }
    } catch (error) {
      console.error('Error fetching followers:', error);
    }
  };

  const fetchFollowing = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_followers')
        .select(`
          follower_id,
          following_id,
          profiles!user_followers_following_fkey (
            user_id,
            display_name,
            avatar_url,
            username
          )
        `)
        .eq('follower_id', user.id);

      if (!error && data) {
        setFollowing(data);
      }
    } catch (error) {
      console.error('Error fetching following:', error);
    }
  };

  const fetchAllUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('user_id, display_name, avatar_url, username')
        .neq('user_id', user?.id || '');

      if (!error && data) {
        setAllUsers(data);
      }
    } catch (error) {
      console.error('Error fetching all users:', error);
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (content: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('community_posts')
        .insert([{
          user_id: user.id,
          content
        }]);

      if (!error) {
        fetchPosts();
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const followUser = async (userId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('user_followers')
        .insert([{
          follower_id: user.id,
          following_id: userId
        }]);

      if (!error) {
        fetchFollowing();
      }
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  const unfollowUser = async (userId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('user_followers')
        .delete()
        .eq('follower_id', user.id)
        .eq('following_id', userId);

      if (!error) {
        fetchFollowing();
      }
    } catch (error) {
      console.error('Error unfollowing user:', error);
    }
  };

  const likePost = async (postId: string) => {
    if (!user) return;

    try {
      // Check if already liked
      const { data: existingLike } = await supabase
        .from('post_likes')
        .select('id')
        .eq('user_id', user.id)
        .eq('post_id', postId)
        .single();

      if (existingLike) {
        // Unlike
        await supabase
          .from('post_likes')
          .delete()
          .eq('user_id', user.id)
          .eq('post_id', postId);

        // Update post likes count
        await supabase.rpc('decrement_likes', { post_id: postId });
      } else {
        // Like
        await supabase
          .from('post_likes')
          .insert([{
            user_id: user.id,
            post_id: postId
          }]);

        // Update post likes count
        await supabase.rpc('increment_likes', { post_id: postId });
      }

      fetchPosts();
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const isFollowing = (userId: string) => {
    return following.some(f => f.following_id === userId);
  };

  return {
    posts,
    followers,
    following,
    allUsers,
    loading,
    createPost,
    followUser,
    unfollowUser,
    likePost,
    isFollowing
  };
};