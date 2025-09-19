import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PlayCircle, Clock, Trophy, ArrowRight } from 'lucide-react';

interface LessonCardProps {
  lesson: {
    id: number;
    title: string;
    description: string;
    duration: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    completed: boolean;
    content: string;
  };
  onStartLesson: (lessonId: number) => void;
  moduleLabel?: string;
  chapterLabel?: string;
  lessonNumber?: number;
}

export const LessonCard = ({ lesson, onStartLesson, moduleLabel, chapterLabel, lessonNumber }: LessonCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-gradient-success text-success-foreground';
      case 'Intermediate': return 'bg-gradient-primary text-primary-foreground';
      case 'Advanced': return 'bg-warning text-warning-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className="bg-gradient-card shadow-card hover:shadow-elevated transition-all duration-300 border-0">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge className={`${getDifficultyColor(lesson.difficulty)} text-xs font-medium`}>
                {lesson.difficulty}
              </Badge>
              {chapterLabel && (
                <Badge variant="outline" className="text-xs">
                  {chapterLabel}
                </Badge>
              )}
              {moduleLabel && (
                <Badge variant="outline" className="text-xs">
                  {moduleLabel}
                </Badge>
              )}
              {lesson.completed && (
                <Badge className="bg-gradient-success text-success-foreground">
                  <Trophy className="w-3 h-3 mr-1" />
                  Completed
                </Badge>
              )}
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              {lessonNumber ? `Lesson ${lessonNumber}: ` : ''}{lesson.title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{lesson.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1 text-muted-foreground text-sm">
            <Clock className="w-4 h-4" />
            {lesson.duration}
          </div>
        </div>

        {isExpanded && (
          <div className="mb-4 p-4 bg-secondary/50 rounded-lg">
            <div className="text-sm text-foreground leading-relaxed whitespace-pre-line">
              {lesson.content}
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            variant="outline"
            size="sm"
            className="flex-1"
          >
            {isExpanded ? 'Show Less' : 'Preview'}
          </Button>
          <Button
            onClick={() => onStartLesson(lesson.id)}
            className="flex-1 bg-gradient-primary hover:opacity-90 transition-opacity"
          >
            <PlayCircle className="w-4 h-4 mr-2" />
            {lesson.completed ? 'Review' : 'Start Lesson'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};