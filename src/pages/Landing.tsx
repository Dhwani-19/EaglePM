import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Target, Sparkles, Trophy, Eye, Compass, ArrowRight, ShieldCheck, Timer, Rocket, MessageCircle } from 'lucide-react';
import heroImage from '@/assets/hero-learning.jpg';
import PMHeroIllustration from '@/components/PMHeroIllustration';
import { useAuth } from '@/contexts/AuthContext';

const Landing = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const heroRef = useRef<HTMLDivElement | null>(null);
  const [heroInView, setHeroInView] = useState(false);

  useEffect(() => {
    const node = heroRef.current;
    if (!node) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting && setHeroInView(true));
    }, { threshold: 0.25 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const handlePrimaryCta = () => {
    if (user) navigate('/app');
    else navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* HERO */}
      <section ref={heroRef} className="relative overflow-hidden bg-gradient-hero text-white pt-16 pb-24">
        <div className="pointer-events-none absolute inset-0 opacity-60">
          <div className={`absolute -top-16 -left-16 size-[520px] rounded-full bg-primary/30 blur-3xl ${heroInView ? 'animate-drift' : ''}`} />
          <div className={`absolute bottom-0 -right-24 size-[620px] rounded-full bg-accent/30 blur-3xl ${heroInView ? 'animate-drift' : ''}`} />
        </div>
        <div className="container max-w-6xl mx-auto px-4 relative">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-2">
              <BookOpen className="w-7 h-7" />
              <span className="text-xl font-semibold">Eagle PM</span>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10" onClick={() => navigate('/community')}>
                <MessageCircle className="w-4 h-4 mr-2" />Community
              </Button>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10" onClick={() => navigate(user ? '/app' : '/auth')}>
                {user ? 'Open App' : 'Sign In'}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={`transition-all duration-700 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur border border-white/20 mb-4">
                <Eye className="w-4 h-4" />
                <span className="text-sm">Eagle – Visionary Hunter</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
                Learn Product Management with eagle-like precision.
              </h1>
              <p className="text-white/90 mb-6 text-lg">
                Set a goal, follow the path, and achieve mastery with daily 5‑minute lessons and targeted quizzes.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button className="bg-gradient-primary shadow-glow" onClick={handlePrimaryCta}>
                  {user ? 'Go to Dashboard' : 'Start Free'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
                  See how it works
                </Button>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-4 text-white/90">
                <div className="flex items-center gap-2"><Target className="w-5 h-5" /><span className="text-sm">Goal-first roadmap</span></div>
                <div className="flex items-center gap-2"><Timer className="w-5 h-5" /><span className="text-sm">5‑minute lessons</span></div>
                <div className="flex items-center gap-2"><Trophy className="w-5 h-5" /><span className="text-sm">Streaks & badges</span></div>
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
      </section>

      {/* FEATURES */}
      <section className="container max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-card shadow-card border-0 transform transition-all duration-500 hover:-translate-y-1.5 hover:shadow-glow opacity-0 animate-reveal" style={{ animationDelay: '80ms' }}>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2 text-primary"><Compass className="w-5 h-5" /><span className="font-semibold">Vision</span></div>
              <p className="text-sm text-muted-foreground">Define your north star and align learning with outcomes.</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card shadow-card border-0 transform transition-all duration-500 hover:-translate-y-1.5 hover:shadow-glow opacity-0 animate-reveal" style={{ animationDelay: '160ms' }}>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2 text-accent"><Target className="w-5 h-5" /><span className="font-semibold">Focus</span></div>
              <p className="text-sm text-muted-foreground">Short, sharp lessons and quizzes to build precision.</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card shadow-card border-0 transform transition-all duration-500 hover:-translate-y-1.5 hover:shadow-glow opacity-0 animate-reveal" style={{ animationDelay: '240ms' }}>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2 text-success"><Trophy className="w-5 h-5" /><span className="font-semibold">Victory</span></div>
              <p className="text-sm text-muted-foreground">Track progress, earn badges, and keep your streak alive.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* WHY US */}
      <section className="container max-w-6xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-card shadow-card border-0 transform transition-all duration-500 hover:-translate-y-1.5 hover:shadow-glow opacity-0 animate-reveal" style={{ animationDelay: '80ms' }}>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2 text-foreground"><ShieldCheck className="w-5 h-5" /><span className="font-semibold">Backed by structure</span></div>
              <p className="text-sm text-muted-foreground">A guided path from fundamentals to leadership skills.</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card shadow-card border-0 transform transition-all duration-500 hover:-translate-y-1.5 hover:shadow-glow opacity-0 animate-reveal" style={{ animationDelay: '160ms' }}>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2 text-foreground"><Timer className="w-5 h-5" /><span className="font-semibold">Daily momentum</span></div>
              <p className="text-sm text-muted-foreground">Micro-learning designed to fit into your schedule.</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card shadow-card border-0 transform transition-all duration-500 hover:-translate-y-1.5 hover:shadow-glow opacity-0 animate-reveal" style={{ animationDelay: '240ms' }}>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2 text-foreground"><Rocket className="w-5 h-5" /><span className="font-semibold">Real results</span></div>
              <p className="text-sm text-muted-foreground">Apply skills immediately through practical challenges.</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-10 text-center">
          <Button className="bg-gradient-primary shadow-glow" onClick={handlePrimaryCta}>
            {user ? 'Enter App' : 'Start Learning Free'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Landing;


