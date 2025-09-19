-- Create social features tables for following/followers
CREATE TABLE public.user_followers (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    follower_id UUID NOT NULL,
    following_id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE(follower_id, following_id),
    CHECK (follower_id != following_id)
);

-- Create community posts table
CREATE TABLE public.community_posts (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    content TEXT NOT NULL,
    likes_count INTEGER NOT NULL DEFAULT 0,
    comments_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create post likes table
CREATE TABLE public.post_likes (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    post_id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE(user_id, post_id)
);

-- Create post comments table
CREATE TABLE public.post_comments (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    post_id UUID NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.user_followers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_comments ENABLE ROW LEVEL SECURITY;

-- Create policies for user_followers
CREATE POLICY "Users can view all followers/following relationships"
ON public.user_followers
FOR SELECT
USING (true);

CREATE POLICY "Users can create their own follow relationships"
ON public.user_followers
FOR INSERT
WITH CHECK (auth.uid() = follower_id);

CREATE POLICY "Users can delete their own follow relationships"
ON public.user_followers
FOR DELETE
USING (auth.uid() = follower_id);

-- Create policies for community_posts
CREATE POLICY "Users can view all posts"
ON public.community_posts
FOR SELECT
USING (true);

CREATE POLICY "Users can create their own posts"
ON public.community_posts
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own posts"
ON public.community_posts
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own posts"
ON public.community_posts
FOR DELETE
USING (auth.uid() = user_id);

-- Create policies for post_likes
CREATE POLICY "Users can view all post likes"
ON public.post_likes
FOR SELECT
USING (true);

CREATE POLICY "Users can create their own likes"
ON public.post_likes
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own likes"
ON public.post_likes
FOR DELETE
USING (auth.uid() = user_id);

-- Create policies for post_comments
CREATE POLICY "Users can view all comments"
ON public.post_comments
FOR SELECT
USING (true);

CREATE POLICY "Users can create their own comments"
ON public.post_comments
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own comments"
ON public.post_comments
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own comments"
ON public.post_comments
FOR DELETE
USING (auth.uid() = user_id);

-- Add foreign key relationships
ALTER TABLE public.user_followers 
ADD CONSTRAINT user_followers_follower_fkey 
FOREIGN KEY (follower_id) REFERENCES public.profiles(user_id) ON DELETE CASCADE;

ALTER TABLE public.user_followers 
ADD CONSTRAINT user_followers_following_fkey 
FOREIGN KEY (following_id) REFERENCES public.profiles(user_id) ON DELETE CASCADE;

ALTER TABLE public.community_posts 
ADD CONSTRAINT community_posts_user_fkey 
FOREIGN KEY (user_id) REFERENCES public.profiles(user_id) ON DELETE CASCADE;

ALTER TABLE public.post_likes 
ADD CONSTRAINT post_likes_user_fkey 
FOREIGN KEY (user_id) REFERENCES public.profiles(user_id) ON DELETE CASCADE;

ALTER TABLE public.post_likes 
ADD CONSTRAINT post_likes_post_fkey 
FOREIGN KEY (post_id) REFERENCES public.community_posts(id) ON DELETE CASCADE;

ALTER TABLE public.post_comments 
ADD CONSTRAINT post_comments_user_fkey 
FOREIGN KEY (user_id) REFERENCES public.profiles(user_id) ON DELETE CASCADE;

ALTER TABLE public.post_comments 
ADD CONSTRAINT post_comments_post_fkey 
FOREIGN KEY (post_id) REFERENCES public.community_posts(id) ON DELETE CASCADE;

-- Create trigger for community_posts updated_at
CREATE TRIGGER update_community_posts_updated_at
BEFORE UPDATE ON public.community_posts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();