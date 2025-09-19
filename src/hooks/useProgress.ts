import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface UserProgress {
  current_streak: number;
  longest_streak: number;
  lessons_completed: number;
  total_quizzes: number;
  total_quiz_score: number;
  last_activity: string | null;
}

interface UserBadge {
  badge_type: string;
  earned_at: string;
}

export const useProgress = () => {
  const { user } = useAuth();
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [badges, setBadges] = useState<UserBadge[]>([]);
  const [completedLessons, setCompletedLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserProgress();
      fetchUserBadges();
      fetchCompletedLessons();
    }
  }, [user]);

  const fetchUserProgress = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code === 'PGRST116') {
        // No data found, create initial progress
        const { data: newProgress } = await supabase
          .from('user_progress')
          .insert([{ user_id: user.id }])
          .select()
          .single();
        
        setProgress(newProgress);
      } else if (data) {
        // Reset streak to zero if the user has missed at least one full day
        const today = new Date();
        const todayStr = today.toISOString().split('T')[0];
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        const lastActivity = data.last_activity;

        // If last activity is neither today nor yesterday, the streak should be 0
        if (lastActivity && lastActivity !== todayStr && lastActivity !== yesterdayStr) {
          try {
            const { data: resetData } = await supabase
              .from('user_progress')
              .update({ current_streak: 0 })
              .eq('user_id', user.id)
              .select()
              .single();

            setProgress(resetData ?? { ...data, current_streak: 0 });
          } catch (resetError) {
            console.error('Error resetting streak on fetch:', resetError);
            setProgress({ ...data, current_streak: 0 });
          }
        } else {
          setProgress(data);
        }
      }
    } catch (error) {
      console.error('Error fetching user progress:', error);
    }
  };

  const fetchUserBadges = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_badges')
        .select('*')
        .eq('user_id', user.id);

      if (!error && data) {
        setBadges(data);
      }
    } catch (error) {
      console.error('Error fetching user badges:', error);
    }
  };

  const fetchCompletedLessons = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('completed_lessons')
        .select('*')
        .eq('user_id', user.id);

      if (!error && data) {
        setCompletedLessons(data);
      }
    } catch (error) {
      console.error('Error fetching completed lessons:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStreak = async (base?: Partial<UserProgress>) => {
    if (!user || !progress) return;

    const source = { ...progress, ...(base || {}) } as UserProgress;
    const today = new Date().toISOString().split('T')[0];
    const lastActivity = source.last_activity;
    
    let newStreak = source.current_streak;
    
    if (!lastActivity || lastActivity !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];
      
      if (lastActivity === yesterdayStr) {
        newStreak += 1;
      } else if (!lastActivity || lastActivity < yesterdayStr) {
        newStreak = 1;
      }
    }

    const updatedProgress: UserProgress = {
      ...source,
      current_streak: newStreak,
      longest_streak: Math.max(source.longest_streak, newStreak),
      last_activity: today
    };

    try {
      await supabase
        .from('user_progress')
        .update(updatedProgress)
        .eq('user_id', user.id);
      
      setProgress(updatedProgress);
    } catch (error) {
      console.error('Error updating streak:', error);
    }
  };

  const completeLesson = async (lessonId: number, quizScore?: number) => {
    if (!user || !progress) return;

    try {
      // Add completed lesson
      const { error: lessonError } = await supabase
        .from('completed_lessons')
        .insert([{
          user_id: user.id,
          lesson_id: lessonId,
          quiz_score: quizScore || null
        }]);

      if (lessonError) {
        console.error('Error inserting completed lesson:', lessonError);
        return;
      }

      // Update progress
      const updatedProgress: UserProgress = {
        ...progress,
        lessons_completed: progress.lessons_completed + 1,
        total_quizzes: quizScore !== undefined ? progress.total_quizzes + 1 : progress.total_quizzes,
        total_quiz_score: quizScore ? progress.total_quiz_score + quizScore : progress.total_quiz_score
      };

      await supabase
        .from('user_progress')
        .update(updatedProgress)
        .eq('user_id', user.id);

      setProgress(updatedProgress);
      await updateStreak(updatedProgress);
      await fetchCompletedLessons();

      // Check for badges
      await checkAndAwardBadges(updatedProgress);
    } catch (error) {
      console.error('Error completing lesson:', error);
    }
  };

  const checkAndAwardBadges = async (currentProgress: UserProgress) => {
    if (!user) return;

    const badgesToAward = [];

    // First lesson badge
    if (currentProgress.lessons_completed >= 1 && !badges.find(b => b.badge_type === 'first_lesson')) {
      badgesToAward.push('first_lesson');
    }

    // 5 lessons badge
    if (currentProgress.lessons_completed >= 5 && !badges.find(b => b.badge_type === 'five_lessons')) {
      badgesToAward.push('five_lessons');
    }

    // Week streak badge
    if (currentProgress.current_streak >= 7 && !badges.find(b => b.badge_type === 'week_streak')) {
      badgesToAward.push('week_streak');
    }

    // Quiz master badge
    if (currentProgress.total_quizzes >= 10 && !badges.find(b => b.badge_type === 'quiz_master')) {
      badgesToAward.push('quiz_master');
    }

    for (const badgeType of badgesToAward) {
      try {
        await supabase
          .from('user_badges')
          .insert([{
            user_id: user.id,
            badge_type: badgeType
          }]);
      } catch (error) {
        console.error('Error awarding badge:', error);
      }
    }

    if (badgesToAward.length > 0) {
      fetchUserBadges();
    }
  };

  return {
    progress,
    badges,
    completedLessons,
    loading,
    completeLesson,
    updateStreak,
    refreshProgress: fetchUserProgress
  };
};