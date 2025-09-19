import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSocial } from '@/hooks/useSocial';
import { Heart, MessageCircle, Users, UserPlus, UserMinus, Send } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const Community = () => {
  const { posts, followers, following, allUsers, createPost, followUser, unfollowUser, likePost, isFollowing, loading } = useSocial();
  const [newPost, setNewPost] = useState('');
  const [isCreatingPost, setIsCreatingPost] = useState(false);

  const handleCreatePost = async () => {
    if (!newPost.trim()) return;
    
    setIsCreatingPost(true);
    await createPost(newPost);
    setNewPost('');
    setIsCreatingPost(false);
  };

  const handleFollowToggle = async (userId: string) => {
    if (isFollowing(userId)) {
      await unfollowUser(userId);
    } else {
      await followUser(userId);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-hero text-white py-6">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-8 h-8" />
            <h1 className="text-3xl font-bold">Learning Community</h1>
          </div>
          <p className="text-white/90">Connect with fellow learners and share your journey</p>
        </div>
      </header>

      <div className="container max-w-6xl mx-auto px-4 py-8">
        <Tabs defaultValue="feed" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="feed">Community Feed</TabsTrigger>
            <TabsTrigger value="following">Following ({following.length})</TabsTrigger>
            <TabsTrigger value="discover">Discover Users</TabsTrigger>
          </TabsList>

          <TabsContent value="feed" className="space-y-6">
            {/* Create Post */}
            <Card className="bg-gradient-card shadow-card border-0">
              <CardHeader>
                <CardTitle>Share Your Learning Journey</CardTitle>
                <CardDescription>
                  Tell the community about your progress, insights, or challenges
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="What's on your mind? Share a learning tip, celebrate a milestone, or ask for advice..."
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  rows={3}
                />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    {newPost.length}/280 characters
                  </span>
                  <Button
                    onClick={handleCreatePost}
                    disabled={!newPost.trim() || isCreatingPost || newPost.length > 280}
                    className="bg-gradient-primary hover:opacity-90"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {isCreatingPost ? 'Posting...' : 'Post'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Posts Feed */}
            <div className="space-y-4">
              {posts.map((post) => (
                <Card key={post.id} className="bg-gradient-card shadow-card border-0">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={post.profiles.avatar_url || ''} />
                        <AvatarFallback>
                          {post.profiles.display_name?.[0] || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">
                            {post.profiles.display_name || 'Anonymous User'}
                          </h4>
                          <span className="text-sm text-muted-foreground">
                            {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                          </span>
                        </div>
                        <p className="text-foreground mb-4 whitespace-pre-wrap">
                          {post.content}
                        </p>
                        <div className="flex items-center gap-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => likePost(post.id)}
                            className={`${post.is_liked ? 'text-red-500' : 'text-muted-foreground hover:text-primary'}`}
                          >
                            <Heart className={`w-4 h-4 mr-1 ${post.is_liked ? 'fill-red-500 text-red-500' : ''}`} />
                            {post.likes_count}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-muted-foreground"
                          >
                            <MessageCircle className="w-4 h-4 mr-1" />
                            {post.comments_count}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {posts.length === 0 && (
                <Card className="bg-gradient-card shadow-card border-0">
                  <CardContent className="p-8 text-center">
                    <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">No posts yet</h3>
                    <p className="text-muted-foreground">
                      Be the first to share something with the community!
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="following" className="space-y-6">
            <div className="grid gap-4">
              {following.map((follow) => (
                <Card key={follow.following_id} className="bg-gradient-card shadow-card border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={follow.profiles.avatar_url || ''} />
                          <AvatarFallback>
                            {follow.profiles.display_name?.[0] || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold">
                            {follow.profiles.display_name || 'Anonymous User'}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            @{follow.profiles.username || 'user'}
                          </p>
                        </div>
                      </div>
                      <Button
                        onClick={() => handleFollowToggle(follow.following_id)}
                        variant="outline"
                        size="sm"
                        className="bg-primary/10 border-primary/20 hover:bg-primary/20"
                      >
                        <UserMinus className="w-4 h-4 mr-2" />
                        Unfollow
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {following.length === 0 && (
                <Card className="bg-gradient-card shadow-card border-0">
                  <CardContent className="p-8 text-center">
                    <UserPlus className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">Not following anyone yet</h3>
                    <p className="text-muted-foreground">
                      Discover other learners and start following them to see their posts!
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="discover" className="space-y-6">
            <div className="grid gap-4">
              {allUsers.map((userProfile) => (
                <Card key={userProfile.user_id} className="bg-gradient-card shadow-card border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={userProfile.avatar_url || ''} />
                          <AvatarFallback>
                            {userProfile.display_name?.[0] || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold">
                            {userProfile.display_name || 'Anonymous User'}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            @{userProfile.username || 'user'}
                          </p>
                        </div>
                      </div>
                      <Button
                        onClick={() => handleFollowToggle(userProfile.user_id)}
                        variant={isFollowing(userProfile.user_id) ? "outline" : "default"}
                        size="sm"
                        className={isFollowing(userProfile.user_id) 
                          ? "bg-primary/10 border-primary/20 hover:bg-primary/20" 
                          : "bg-gradient-primary hover:opacity-90"
                        }
                      >
                        {isFollowing(userProfile.user_id) ? (
                          <>
                            <UserMinus className="w-4 h-4 mr-2" />
                            Unfollow
                          </>
                        ) : (
                          <>
                            <UserPlus className="w-4 h-4 mr-2" />
                            Follow
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {allUsers.length === 0 && (
                <Card className="bg-gradient-card shadow-card border-0">
                  <CardContent className="p-8 text-center">
                    <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">No other users found</h3>
                    <p className="text-muted-foreground">
                      You're among the first learners in the community!
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Community;