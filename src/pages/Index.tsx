import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { LessonCard } from '@/components/LessonCard';
import { QuizCard } from '@/components/QuizCard';
import { ProgressDashboard } from '@/components/ProgressDashboard';
import { useAuth } from '@/contexts/AuthContext';
import { useProgress } from '@/hooks/useProgress';
import { BookOpen, Trophy, BarChart3, Sparkles, Play, Clock, LogOut, User, MessageCircle, Target, Eye, ArrowRight } from 'lucide-react';
import { sampleQuizzes, lessonQuizzesByTitle } from '@/data/sampleData';
import { flattenCurriculum, curriculum } from '@/data/curriculum';
import heroImage from '@/assets/hero-learning.jpg';
import PMHeroIllustration from '@/components/PMHeroIllustration';
import { useToast } from '@/hooks/use-toast';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { GameFlow } from '@/components/GameFlow';

const Index = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { progress, badges, completedLessons, loading: progressLoading, completeLesson, refreshProgress } = useProgress();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null);
  const [activeQuiz, setActiveQuiz] = useState<{
    lessonId: number;
    questions: any[];
    currentIndex: number;
    score: number;
    answers: { selectedIndex: number; correctIndex: number; correct: boolean }[];
  } | null>(null);
  const [quizFinished, setQuizFinished] = useState<{
    total: number;
    score: number;
    percentage: number;
    lessonId: number;
    answers: { selectedIndex: number; correctIndex: number; correct: boolean }[];
    questions: any[];
  } | null>(null);
  const [lessonsData, setLessonsData] = useState(flattenCurriculum());
  const canonicalLessons = useMemo(() => flattenCurriculum(), []);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const [heroInView, setHeroInView] = useState(false);

  // Provide quizzes for every lesson by falling back to an auto-generated quiz
  const getLessonQuizzes = (lessonId: number) => {
    const predefined = sampleQuizzes[lessonId as keyof typeof sampleQuizzes] as any[] | undefined;
    // Prefer title-based content quizzes if available
    const lesson = (canonicalLessons || []).find(l => l.id === lessonId);
    if (lesson) {
      const byTitle = lessonQuizzesByTitle[lesson.title as keyof typeof lessonQuizzesByTitle] as any[] | undefined;
      if (byTitle && byTitle.length > 0) return byTitle;
    }
    if (predefined && predefined.length > 0) return predefined;

    const title = lesson?.title || 'This Lesson';
    const track = lesson?.trackTitle || 'Product Management Foundations';
    const moduleTitle = lesson?.moduleTitle || 'Core Concepts';
    const difficulty = lesson?.difficulty || 'Beginner';

    const optionsForDifficulty = ['Beginner', 'Intermediate', 'Advanced', 'All levels'];
    const correctDifficultyIndex = Math.max(0, optionsForDifficulty.indexOf(difficulty));

    return [
      {
        id: Number(`${lessonId}01`),
        question: 'What is the primary focus of this lesson?',
        options: [title, 'Design Systems', 'QA Testing', 'Code Compilation'],
        correctAnswer: 0,
        explanation: `The lesson focuses on ${title}.`
      },
      {
        id: Number(`${lessonId}02`),
        question: 'Which track does this lesson belong to?',
        options: [track, 'Data for Product Managers', 'Experimentation & A / B Testing', 'Mastery Skills for PMs'],
        correctAnswer: 0,
        explanation: `This lesson is part of the ${track} track.`
      },
      {
        id: Number(`${lessonId}03`),
        question: 'Which module contains this lesson?',
        options: [moduleTitle, 'Feature Development', 'Feature Design', 'Leveraging Data'],
        correctAnswer: 0,
        explanation: `This lesson is in the ${moduleTitle} module.`
      },
      {
        id: Number(`${lessonId}04`),
        question: 'What is the difficulty level of this lesson?',
        options: optionsForDifficulty,
        correctAnswer: correctDifficultyIndex,
        explanation: `Difficulty level: ${difficulty}.`
      },
      {
        id: Number(`${lessonId}05`),
        question: 'What should you do after completing the lesson?',
        options: ['Apply it to a real scenario and take the quiz', 'Ignore the content', 'Delete your progress', 'Skip to another track'],
        correctAnswer: 0,
        explanation: 'Reinforce learning by applying concepts and completing the quiz.'
      }
    ];
  };

  // Global pagination across lessons (single pager)
  const LESSONS_PER_PAGE = 5;
  const [lessonPage, setLessonPage] = useState(1);

  // Compute effective lessons by overlaying completion on canonical content
  const completedLessonIds = new Set((completedLessons || []).map((l: any) => l.lesson_id));
  const locallyCompletedIds = new Set(lessonsData.filter(l => l.completed).map(l => l.id));
  const effectiveLessons = canonicalLessons.map(lesson => ({
    ...lesson,
    completed: locallyCompletedIds.has(lesson.id) || completedLessonIds.has(lesson.id)
  }));

  useEffect(() => {
    if (activeTab === 'overview' || activeTab === 'progress') {
      refreshProgress();
    }
  }, [activeTab]);

  const handleStartLesson = (lessonId: number) => {
    setSelectedLesson(lessonId);
    setActiveTab('lessons');
  };

  const handleStartQuiz = (lessonId: number) => {
    const lessonQuizzes = getLessonQuizzes(lessonId);
    setActiveQuiz({ lessonId, questions: lessonQuizzes, currentIndex: 0, score: 0, answers: [] });
    setQuizFinished(null);
    setActiveTab('lessons');
  };

  const handleQuizComplete = async (payload: { correct: boolean; selectedIndex: number }) => {
    if (!activeQuiz) return;

    const newScore = activeQuiz.score + (payload.correct ? 1 : 0);
    const nextIndex = activeQuiz.currentIndex + 1;
    const newAnswers = [
      ...activeQuiz.answers,
      {
        selectedIndex: payload.selectedIndex,
        correctIndex: activeQuiz.questions[activeQuiz.currentIndex].correctAnswer,
        correct: payload.correct,
      },
    ];

    // If there are more questions, continue with next question
    if (nextIndex < activeQuiz.questions.length) {
      setActiveQuiz({
        ...activeQuiz,
        currentIndex: nextIndex,
        score: newScore,
        answers: newAnswers,
      });
      return;
    }

    // Quiz completed - compute score and show results screen
    const finalScore = newScore;
    const totalQuestions = activeQuiz.questions.length;
    const scorePercentage = (finalScore / totalQuestions) * 100;
    const isPassing = scorePercentage > 80;

    setQuizFinished({
      total: totalQuestions,
      score: finalScore,
      percentage: Math.round(scorePercentage),
      lessonId: activeQuiz.lessonId,
      answers: newAnswers,
      questions: activeQuiz.questions,
    });

    if (isPassing) {
      // Only mark lesson as completed if score > 80%
      await completeLesson(activeQuiz.lessonId, finalScore);
      setLessonsData(prev => prev.map(lesson => 
        lesson.id === activeQuiz.lessonId ? { ...lesson, completed: true } : lesson
      ));
    }

    setActiveQuiz(null);
  };

  const handleBackFromQuiz = () => {
    setActiveQuiz(null);
  };

  const currentLesson = selectedLesson ? effectiveLessons.find(l => l.id === selectedLesson) : null;
  const currentQuiz = activeQuiz ? activeQuiz.questions[activeQuiz.currentIndex] : null;
  const nextLesson = effectiveLessons.find(l => !l.completed) || null;
  const totalLessons = canonicalLessons.length;
  const completedLessonsCount = effectiveLessons.filter(l => l.completed).length;

  useEffect(() => {
    const node = heroRef.current;
    if (!node) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setHeroInView(true);
      });
    }, { threshold: 0.3 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Show quiz if active
  if (currentQuiz) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="container max-w-4xl mx-auto py-8">
          <QuizCard
            quiz={currentQuiz}
            onComplete={handleQuizComplete}
            onBack={handleBackFromQuiz}
            currentQuestion={activeQuiz.currentIndex + 1}
            totalQuestions={activeQuiz.questions.length}
            score={activeQuiz.score}
          />
        </div>
      </div>
    );
  }

  // Show results screen after quiz finishes
  if (quizFinished) {
    const isPassing = quizFinished.percentage > 80;
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="container max-w-2xl mx-auto py-12">
          <Card className="bg-gradient-card shadow-elevated border-0 text-center p-6">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground">
                {isPassing ? '🎉 Great job! You passed!' : 'Keep practicing!'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-foreground text-lg">
                Score: <span className="font-bold">{quizFinished.score}/{quizFinished.total}</span> ({quizFinished.percentage}%)
              </div>
              <div className="text-left space-y-3">
                {quizFinished.questions.map((q, idx) => {
                  const ans = quizFinished.answers[idx];
                  const isCorrect = ans?.correct;
                  return (
                    <div key={idx} className={`p-3 rounded border ${isCorrect ? 'border-success/40 bg-success/10' : 'border-destructive/40 bg-destructive/10'}`}>
                      <div className="font-medium text-foreground mb-1">Q{idx + 1}. {q.question}</div>
                      <div className="text-sm">
                        Your answer: <span className="font-semibold">{q.options[ans?.selectedIndex ?? -1] || '—'}</span>
                      </div>
                      {!isCorrect && (
                        <div className="text-sm">
                          Correct answer: <span className="font-semibold">{q.options[q.correctAnswer]}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-4 justify-center">
                <Button
                  className="bg-gradient-primary"
                  onClick={() => {
                    setQuizFinished(null);
                    setSelectedLesson(null);
                    refreshProgress();
                    if (isPassing) {
                      setActiveTab('progress');
                    } else {
                      setActiveTab('lessons');
                    }
                  }}
                >
                  Continue
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    // Retry the quiz
                    const lessonQuizzes = sampleQuizzes[quizFinished.lessonId as keyof typeof sampleQuizzes];
                    if (lessonQuizzes && lessonQuizzes.length > 0) {
                      setActiveQuiz({ lessonId: quizFinished.lessonId, questions: lessonQuizzes, currentIndex: 0, score: 0, answers: [] });
                      setQuizFinished(null);
                    }
                  }}
                >
                  Retry Quiz
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Show individual lesson if selected
  if (currentLesson) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="container max-w-4xl mx-auto py-8">
          <Card className="bg-gradient-card shadow-elevated border-0 mb-6">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Button
                  onClick={() => setSelectedLesson(null)}
                  variant="outline"
                  size="sm"
                >
                  ← Back to Lessons
                </Button>
                <Badge className="bg-gradient-primary text-primary-foreground">
                  {currentLesson.difficulty}
                </Badge>
              </div>
              <CardTitle className="text-2xl text-foreground">{currentLesson.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="prose prose-sm max-w-none">
                <div className="text-foreground leading-relaxed whitespace-pre-line">
                  {currentLesson.content}
                </div>
              </div>
              
              <div className="flex gap-4 pt-4">
                <Button
                  onClick={() => handleStartQuiz(currentLesson.id)}
                  className="bg-gradient-success hover:opacity-90 transition-opacity"
                >
                  <Trophy className="w-4 h-4 mr-2" />
                  Take Quiz
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Eagle – Visionary Hunter Hero */}
      <header ref={heroRef} className="relative overflow-hidden bg-gradient-hero text-white pt-16 pb-20">
        <div className="pointer-events-none absolute inset-0 opacity-50">
          <div className={`absolute -top-10 -left-10 size-[420px] rounded-full bg-primary/30 blur-3xl ${heroInView ? 'animate-drift' : ''}`} />
          <div className={`absolute bottom-0 -right-16 size-[520px] rounded-full bg-accent/30 blur-3xl ${heroInView ? 'animate-drift' : ''}`} />
        </div>
        <div className="container max-w-6xl mx-auto px-4 relative">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <BookOpen className="w-8 h-8" />
              <h1 className="text-3xl font-bold">Eagle PM</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button onClick={() => navigate('/community')} variant="outline" size="sm" className="bg-white/15 border-white/30 text-white hover:bg-white/25">
                <MessageCircle className="w-4 h-4 mr-2" />Community
              </Button>
              <Button
                onClick={signOut}
                variant="outline"
                size="sm"
                className="bg-white/15 border-white/30 text-white hover:bg-white/25"
              >
                <LogOut className="w-4 h-4 mr-2" />Sign Out
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className={`transition-all duration-700 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur border border-white/20 mb-4">
                <Eye className="w-4 h-4" />
                <span className="text-sm">Eagle – Visionary Hunter</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
                See the goal. Set the path. Strike with precision.
              </h2>
              <p className="text-white/85 mb-6 text-lg">
                Build elite product instincts with micro-lessons, challenges, and a goal-driven roadmap.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button className="bg-gradient-primary shadow-glow" onClick={() => setActiveTab('lessons')}>
                  Start Learning <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-4 text-white/90">
                <div className="flex items-center gap-2"><Clock className="w-5 h-5" /><span className="text-sm">5‑min micro‑lessons</span></div>
                <div className="flex items-center gap-2"><Target className="w-5 h-5" /><span className="text-sm">Goal-first roadmap</span></div>
                <div className="flex items-center gap-2"><Sparkles className="w-5 h-5" /><span className="text-sm">Daily wins</span></div>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl shadow-elevated overflow-hidden ring-1 ring-white/10 will-change-transform bg-white/5" style={{ transform: heroInView ? 'perspective(1000px) rotateX(2deg) rotateY(-3deg)' : undefined, transition: 'transform 800ms cubic-bezier(0.22, 1, 0.36, 1)' }}>
                <PMHeroIllustration className="w-full h-full" variant="duotone" showOKRs showBacklog showJourney />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-xl bg-primary/20 backdrop-blur border border-white/10 animate-[float_6s_ease-in-out_infinite]" />
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-accent/20 backdrop-blur border border-white/10 animate-[float_7s_ease-in-out_infinite]" />
              <div className="absolute -top-10 left-1/4 w-20 h-20 rounded-full bg-white/8 blur-xl animate-pulse-soft" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container max-w-6xl mx-auto px-4 py-10">
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Play className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="lessons" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Lessons
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              Completed
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Progress
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gradient-card shadow-card border-0">
                <CardContent className="p-6 text-center">
                  <BookOpen className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {progressLoading ? '...' : (
                      <>
                        <AnimatedCounter value={completedLessonsCount} />/{totalLessons}
                      </>
                    )}
                  </h3>
                  <p className="text-muted-foreground">Lessons Completed</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card shadow-card border-0">
                <CardContent className="p-6 text-center">
                  <Trophy className="w-12 h-12 mx-auto mb-4 text-success" />
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {progressLoading ? '...' : <AnimatedCounter value={badges.length} />}
                  </h3>
                  <p className="text-muted-foreground">Badges Earned</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card shadow-card border-0">
                <CardContent className="p-6 text-center">
                  <BarChart3 className="w-12 h-12 mx-auto mb-4 text-accent" />
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {progressLoading ? '...' : <AnimatedCounter value={progress?.current_streak || 0} />}
                  </h3>
                  <p className="text-muted-foreground">Day Streak</p>
                </CardContent>
              </Card>
            </div>

            {/* Today's Lesson */}
            <Card className="bg-gradient-card shadow-card border-0">
              <CardHeader>
                <CardTitle className="text-xl text-foreground">Today's Lesson</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {nextLesson ? (
                    <LessonCard
                      key={nextLesson.id}
                      lesson={nextLesson}
                      onStartLesson={handleStartLesson}
                    />
                  ) : (
                    <div className="text-sm text-muted-foreground">
                      You're all caught up for today. Check back tomorrow for more!
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="lessons" className="space-y-8">
            {(() => {
              // Flatten all incomplete lessons preserving track/module order
              const orderedModules = curriculum.flatMap(track => track.modules.map(m => ({ ...m, trackTitle: track.title, trackId: track.id })));
              const allIncomplete = orderedModules.flatMap(m =>
                effectiveLessons
                  .filter(l => l.moduleId === m.id && !l.completed)
                  .map(l => ({ lesson: l, moduleTitle: m.title, moduleId: m.id, trackTitle: (m as any).trackTitle, trackId: (m as any).trackId }))
              );
              const totalPages = Math.max(1, Math.ceil(allIncomplete.length / LESSONS_PER_PAGE));
              const safePage = Math.min(Math.max(lessonPage, 1), totalPages);
              const start = (safePage - 1) * LESSONS_PER_PAGE;
              const slice = allIncomplete.slice(start, start + LESSONS_PER_PAGE);

              return (
                <div className="space-y-6">
                  <GameFlow
                    items={effectiveLessons.map(l => ({ id: l.id, title: l.title, completed: l.completed }))}
                    onStart={handleStartLesson}
                  />

                  {slice.length > 0 ? (
                    <div className="grid gap-6">
                      {slice.map((it: any) => (
                        <LessonCard
                          key={it.lesson.id}
                          lesson={it.lesson}
                          onStartLesson={handleStartLesson}
                          chapterLabel={`Chapter ${it.trackId}: ${it.trackTitle}`}
                          moduleLabel={`Module ${it.moduleId}: ${it.moduleTitle}`}
                          lessonNumber={it.lesson.lessonNumber}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-sm text-muted-foreground">All lessons completed. Great job!</div>
                  )}

                  <div className="flex items-center justify-between pt-2">
                    <div className="text-xs text-muted-foreground">Page {safePage} of {totalPages}</div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" onClick={() => setLessonPage(safePage > 1 ? safePage - 1 : totalPages)}>Previous</Button>
                      <Button variant="outline" onClick={() => setLessonPage(safePage < totalPages ? safePage + 1 : 1)}>Next</Button>
                    </div>
                  </div>
                </div>
              );
            })()}
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            {(() => {
              const finishedLessons = effectiveLessons.filter(l => l.completed);
              return finishedLessons.length > 0 ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Completed Lessons</h3>
                  <div className="grid gap-6">
                    {finishedLessons.map(lesson => (
                      <LessonCard key={lesson.id} lesson={lesson} onStartLesson={handleStartLesson} />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-sm text-muted-foreground">You haven't completed any lessons yet.</div>
              );
            })()}
          </TabsContent>

          <TabsContent value="progress">
            <ProgressDashboard 
              data={{
                currentStreak: progress?.current_streak || 0,
                longestStreak: progress?.longest_streak || 0,
                lessonsCompleted: completedLessonsCount,
                totalLessons: totalLessons,
                quizScore: progress?.total_quizzes ? Math.round((progress.total_quiz_score / (progress.total_quizzes * 100)) * 100) : 0,
                badges: [
                  { id: 'first_lesson', name: 'First Steps', description: 'Complete your first lesson', icon: 'Trophy', earned: badges.some(b => b.badge_type === 'first_lesson') },
                  { id: 'five_lessons', name: 'Dedicated Learner', description: 'Complete 5 lessons', icon: 'BookOpen', earned: badges.some(b => b.badge_type === 'five_lessons') },
                  { id: 'week_streak', name: 'Week Warrior', description: 'Maintain a 7-day streak', icon: 'Calendar', earned: badges.some(b => b.badge_type === 'week_streak') },
                  { id: 'quiz_master', name: 'Quiz Master', description: 'Complete 10 quizzes', icon: 'Brain', earned: badges.some(b => b.badge_type === 'quiz_master') },
                ]
              }}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;