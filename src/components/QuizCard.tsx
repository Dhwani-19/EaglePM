import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';

interface Quiz {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizCardProps {
  quiz: Quiz;
  onComplete: (result: { correct: boolean; selectedIndex: number }) => void;
  onBack: () => void;
  currentQuestion?: number;
  totalQuestions?: number;
  score?: number;
}

export const QuizCard = ({ quiz, onComplete, onBack, currentQuestion = 1, totalQuestions = 1, score = 0 }: QuizCardProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const isLastQuestion = currentQuestion >= totalQuestions;

  // Reset selection and feedback when the question changes
  useEffect(() => {
    setSelectedAnswer('');
  }, [quiz.id, currentQuestion]);

  const handleNext = () => {
    const answerIndex = parseInt(selectedAnswer);
    const correct = answerIndex === quiz.correctAnswer;
    onComplete({ correct, selectedIndex: answerIndex });
  };

  const handleAnswerSelect = (value: string) => {
    setSelectedAnswer(value);
  };

  return (
    <Card className="bg-gradient-card shadow-elevated border-0 max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Button
            onClick={onBack}
            variant="ghost"
            size="sm"
            className="p-2 hover:bg-secondary/80"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <CardTitle className="text-lg text-foreground">
            Quiz Progress: {currentQuestion}/{totalQuestions} (Score: {score}/{currentQuestion - 1})
          </CardTitle>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="p-4 bg-secondary/30 rounded-lg">
          <h3 className="text-lg font-semibold text-foreground mb-4">{quiz.question}</h3>
        </div>

        <RadioGroup
          value={selectedAnswer}
          onValueChange={handleAnswerSelect}
          className="space-y-3"
        >
          {quiz.options.map((option, index) => {
            let itemClasses = "flex items-center space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer hover:bg-secondary/50";
            itemClasses += selectedAnswer === index.toString() 
              ? " border-primary bg-primary/10" 
              : " border-border hover:border-primary/50";

            return (
              <div
                key={index}
                className={itemClasses}
                onClick={() => handleAnswerSelect(index.toString())}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleAnswerSelect(index.toString());
                  }
                }}
                role="button"
                tabIndex={0}
              >
                <RadioGroupItem 
                  value={index.toString()} 
                  id={`option-${index}`}
                />
                <Label 
                  htmlFor={`option-${index}`}
                  className="flex-1 cursor-pointer font-medium"
                >
                  {option}
                </Label>
              </div>
            );
          })}
        </RadioGroup>

        <Button
          onClick={handleNext}
          disabled={!selectedAnswer}
          className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
        >
          {isLastQuestion ? 'Submit Quiz' : 'Next'}
        </Button>
      </CardContent>
    </Card>
  );
};