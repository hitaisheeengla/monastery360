import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Mail, Lock, Chrome } from "lucide-react";
import monasteryBg from "@/assets/monastery-login-bg.jpg";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${monasteryBg})`
        }}
      />
      <div className="absolute inset-0 z-10 bg-black/40 backdrop-blur-[2px]" />
      
      {/* Compact Login Card */}
      <div className="relative z-20 w-full max-w-sm">
        <Card className="bg-white/95 backdrop-blur-md border border-amber-200/30 shadow-2xl rounded-2xl overflow-hidden">
          <CardHeader className="text-center space-y-2 pb-3">
            {/* Compact Icon */}
            <div className="w-10 h-10 mx-auto bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
              <div className="text-lg">🏯</div>
            </div>
            
            <div>
              <CardTitle className="text-lg font-serif text-gray-800">
                Monastery360
              </CardTitle>
              {/* <CardDescription className="text-gray-600 text-xs">
                Continue your spiritual journey
              </CardDescription> */}
            </div>
          </CardHeader>

          <CardContent className="space-y-3 px-5 pb-5">
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Compact Email Field */}
              <div className="space-y-1">
                <Label htmlFor="email" className="text-gray-700 text-xs font-medium">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 h-3.5 w-3.5" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className="pl-8 h-9 text-sm bg-gray-50/80 border-gray-200 text-gray-800 placeholder:text-gray-400 focus:border-amber-500 focus:ring-amber-500/20 rounded-lg"
                    required
                  />
                </div>
              </div>

              {/* Compact Password Field */}
              <div className="space-y-1">
                <Label htmlFor="password" className="text-gray-700 text-xs font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 h-3.5 w-3.5" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    className="pl-8 pr-8 h-9 text-sm bg-gray-50/80 border-gray-200 text-gray-800 placeholder:text-gray-400 focus:border-amber-500 focus:ring-amber-500/20 rounded-lg"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  </button>
                </div>
              </div>

              {/* Forgot Password - Compact */}
              <div className="text-right">
                <Link 
                  to="/forgot-password" 
                  className="text-amber-600 hover:text-amber-700 transition-colors text-xs font-medium"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Compact Login Button */}
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 transition-all duration-300 text-white font-semibold h-9 text-sm rounded-lg shadow-md hover:shadow-lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="animate-spin w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  "Log In"
                )}
              </Button>
            </form>

            {/* Compact Divider */}
            <div className="relative my-3">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-2 text-gray-500">or</span>
              </div>
            </div>

            {/* Compact Google Login */}
            <Button 
              variant="outline" 
              className="w-full border-gray-200 bg-white hover:bg-gray-50 text-gray-700 transition-all duration-300 h-9 text-sm rounded-lg"
            >
              <Chrome className="mr-2 h-3.5 w-3.5" />
              Continue with Google
            </Button>

            {/* Compact Sign Up Link */}
            <div className="text-center text-xs pt-1">
              <span className="text-gray-500">New to Monastery360? </span>
              <Link 
                to="/signup" 
                className="text-amber-600 hover:text-amber-700 transition-colors font-semibold"
              >
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Compact Quote */}
        <div className="text-center mt-3">
          <p className="text-white/90 text-xs italic font-serif drop-shadow-sm">
            "Peace comes from within"
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;