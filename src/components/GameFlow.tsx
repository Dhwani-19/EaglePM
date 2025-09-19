import { useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface GameFlowProps {
  items: Array<{
    id: number;
    title: string;
    completed: boolean;
  }>;
  onStart: (id: number) => void;
}

export const GameFlow = ({ items, onStart }: GameFlowProps) => {
  const nextIndex = useMemo(() => items.findIndex(i => !i.completed), [items]);

  return (
    <div className="relative overflow-hidden rounded-xl p-4 bg-gradient-card border-0 shadow-card">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-12 -left-12 size-80 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-12 -right-12 size-96 bg-accent/20 rounded-full blur-3xl" />
      </div>

      <div className="relative">
        <div className="flex items-center justify-between mb-3">
          <div className="text-foreground font-semibold">Your Journey</div>
          <Badge variant="secondary" className="text-xs">{items.filter(i => i.completed).length}/{items.length} complete</Badge>
        </div>
        <div className="flex items-center gap-3 overflow-x-auto py-2">
          {items.map((step, idx) => {
            const isNext = idx === (nextIndex === -1 ? items.length - 1 : nextIndex);
            return (
              <div key={step.id} className="flex items-center gap-3">
                <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold border 
                  ${step.completed ? 'bg-success/20 border-success text-success' : isNext ? 'bg-primary/20 border-primary text-primary' : 'bg-muted border-muted-foreground/20 text-muted-foreground'}`}
                  title={step.title}
                >
                  {idx + 1}
                </div>
                {idx < items.length - 1 && (
                  <div className={`w-16 h-1 rounded ${idx < (nextIndex === -1 ? items.length : nextIndex) ? 'bg-success' : 'bg-muted-foreground/30'}`} />
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-muted-foreground truncate max-w-[70%]">
            {nextIndex === -1 ? 'All lessons complete. Great job!' : `Up next: ${items[nextIndex].title}`}
          </div>
          <Button
            className="bg-gradient-primary"
            size="sm"
            onClick={() => {
              const target = nextIndex === -1 ? items[items.length - 1] : items[nextIndex];
              onStart(target.id);
            }}
          >
            {nextIndex === -1 ? 'Review Last' : 'Continue'}
          </Button>
        </div>
      </div>

      {/* Eagle animation */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20">
        <div className="eagle-fly" />
      </div>
    </div>
  );
};




