import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/");
      }
    });
  }, [navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        toast({
          title: "Welcome back!",
          description: "You've successfully logged in.",
        });
        navigate("/");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
          },
        });
        if (error) throw error;
        toast({
          title: "Account created!",
          description: "Welcome to UrbanThreads.",
        });
        navigate("/");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-2 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse">
            URBANTHREADS
          </h1>
          <p className="text-muted-foreground uppercase tracking-widest text-sm">
            {isLogin ? "Welcome Back" : "Join the Crew"}
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-card border-2 border-primary/20 p-8 backdrop-blur-sm animate-scale-in hover:border-primary/40 transition-all duration-300">
          <div className="flex gap-2 mb-8">
            <Button
              variant={isLogin ? "default" : "outline"}
              className="flex-1 transition-all duration-300"
              onClick={() => setIsLogin(true)}
            >
              Login
            </Button>
            <Button
              variant={!isLogin ? "default" : "outline"}
              className="flex-1 transition-all duration-300"
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </Button>
          </div>

          <form onSubmit={handleAuth} className="space-y-6">
            <div className="space-y-2 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <label className="text-sm font-medium uppercase tracking-wider">
                Email
              </label>
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="transition-all duration-300 focus:scale-105"
              />
            </div>

            <div className="space-y-2 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <label className="text-sm font-medium uppercase tracking-wider">
                Password
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="transition-all duration-300 focus:scale-105"
              />
            </div>

            <Button
              type="submit"
              variant="hero"
              className="w-full animate-fade-in"
              style={{ animationDelay: "0.3s" }}
              disabled={loading}
            >
              {loading ? "Loading..." : isLogin ? "Sign In" : "Create Account"}
            </Button>
          </form>

          {isLogin && (
            <div className="mt-6 text-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors story-link"
              >
                Forgot Password?
              </a>
            </div>
          )}
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center animate-fade-in" style={{ animationDelay: "0.5s" }}>
          <button
            onClick={() => navigate("/")}
            className="text-sm text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider story-link"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
