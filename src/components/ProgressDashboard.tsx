import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Target, Flame, Calendar, Award } from 'lucide-react';

interface ProgressData {
  currentStreak: number;
  longestStreak: number;
  lessonsCompleted: number;
  totalLessons: number;
  quizScore: number;
  badges: Array<{
    id: string;
    name: string;
    description: string;
    earned: boolean;
    icon: string;
  }>;
}

interface ProgressDashboardProps {
  data: ProgressData;
}

export const ProgressDashboard = ({ data }: ProgressDashboardProps) => {
  const progressPercentage = (data.lessonsCompleted / data.totalLessons) * 100;

  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'trophy': return Trophy;
      case 'target': return Target;
      case 'flame': return Flame;
      case 'calendar': return Calendar;
      case 'award': return Award;
      default: return Trophy;
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-gradient-primary shadow-card border-0">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary-foreground">{data.currentStreak}</div>
            <div className="text-sm text-primary-foreground/90">Day Streak</div>
            <Flame className="w-6 h-6 mx-auto mt-2 text-primary-foreground" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-success shadow-card border-0">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-success-foreground">{data.lessonsCompleted}</div>
            <div className="text-sm text-success-foreground/90">Lessons Done</div>
            <Trophy className="w-6 h-6 mx-auto mt-2 text-success-foreground" />
          </CardContent>
        </Card>
      </div>

      {/* Progress Overview */}
      <Card className="bg-gradient-card shadow-card border-0">
        <CardHeader>
          <CardTitle className="text-lg text-foreground">Learning Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Course Completion</span>
              <span className="text-foreground font-medium">
                {data.lessonsCompleted}/{data.totalLessons} lessons
              </span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Quiz Performance</span>
              <span className="text-foreground font-medium">{data.quizScore}% average</span>
            </div>
            <Progress value={data.quizScore} className="h-3" />
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="text-center">
              <div className="text-lg font-bold text-foreground">{data.longestStreak}</div>
              <div className="text-xs text-muted-foreground">Longest Streak</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-foreground">
                {Math.round(progressPercentage)}%
              </div>
              <div className="text-xs text-muted-foreground">Complete</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Badges Section */}
      <Card className="bg-gradient-card shadow-card border-0">
        <CardHeader>
          <CardTitle className="text-lg text-foreground">Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {data.badges.map((badge) => {
              const IconComponent = getBadgeIcon(badge.icon);
              return (
                <div
                  key={badge.id}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    badge.earned
                      ? 'border-success bg-success/10 shadow-glow'
                      : 'border-muted bg-muted/30 opacity-60'
                  }`}
                >
                  <div className="text-center">
                    <IconComponent
                      className={`w-6 h-6 mx-auto mb-1 ${
                        badge.earned ? 'text-success' : 'text-muted-foreground'
                      }`}
                    />
                    <div className="text-xs font-medium text-foreground">{badge.name}</div>
                    <div className="text-xs text-muted-foreground mt-1">{badge.description}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};