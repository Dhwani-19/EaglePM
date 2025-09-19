import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="bg-gradient-card shadow-elevated border-0 max-w-md w-full">
        <CardContent className="p-8 text-center">
          <div className="text-6xl font-bold text-primary mb-4">404</div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Page Not Found</h1>
          <p className="text-muted-foreground mb-6">
            Oops! The page you're looking for doesn't exist. Let's get you back to learning!
          </p>
          <Button
            onClick={() => window.location.href = "/"}
            className="bg-gradient-primary hover:opacity-90 transition-opacity"
          >
            <Home className="w-4 h-4 mr-2" />
            Return to Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
