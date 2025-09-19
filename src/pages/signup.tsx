import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Chrome,
  Check,
  X,
} from "lucide-react";
import monasteryBg from "@/assets/monastery-login-bg.jpg";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate signup
    setTimeout(() => setIsLoading(false), 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const passwordsMatch =
    formData.password &&
    formData.confirmPassword &&
    formData.password === formData.confirmPassword;
  const passwordValid = formData.password.length >= 8;

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat "
        style={{ backgroundImage: `url(${monasteryBg})`}}
      />
      <div className="absolute inset-0 z-10 bg-black/40 backdrop-blur-[2px]" />

      {/* Compact Signup Card */}
      <div className="relative z-20 w-full max-w-sm">
        <Card className="bg-white/95 backdrop-blur-md border border-amber-200/30 shadow-2xl rounded-2xl overflow-hidden">
          <CardHeader className="text-center space-y-2 pb-3">
            <div className="w-10 h-10 mx-auto bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
              <div className="text-lg">🏯</div>
            </div>
            <div>
              <CardTitle className="text-lg font-serif text-gray-800">
                Join Monastery360
              </CardTitle>
              <CardDescription className="text-gray-600 text-xs">
                Begin your spiritual journey
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-3 px-5 pb-5">
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Name Field */}
              <div className="space-y-1">
                <Label htmlFor="name" className="text-gray-700 text-xs font-medium">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 h-3.5 w-3.5" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    className="pl-8 h-9 text-sm bg-gray-50/80 border-gray-200 text-gray-800 placeholder:text-gray-400 focus:border-amber-500 focus:ring-amber-500/20 rounded-lg"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-1">
                <Label htmlFor="email" className="text-gray-700 text-xs font-medium">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 h-3.5 w-3.5" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    className="pl-8 h-9 text-sm bg-gray-50/80 border-gray-200 text-gray-800 placeholder:text-gray-400 focus:border-amber-500 focus:ring-amber-500/20 rounded-lg"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1">
                <Label htmlFor="password" className="text-gray-700 text-xs font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 h-3.5 w-3.5" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="8+ characters"
                    className="pl-8 pr-8 h-9 text-sm bg-gray-50/80 border-gray-200 text-gray-800 placeholder:text-gray-400 focus:border-amber-500 focus:ring-amber-500/20 rounded-lg"
                    value={formData.password}
                    onChange={handleInputChange}
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
                {formData.password && (
                  <div className="flex items-center">
                    {passwordValid ? (
                      <div className="flex items-center text-xs text-green-600">
                        <Check className="h-3 w-3 mr-1" />
                        Valid
                      </div>
                    ) : (
                      <div className="flex items-center text-xs text-red-500">
                        <X className="h-3 w-3 mr-1" />
                        Too short
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-1">
                <Label htmlFor="confirmPassword" className="text-gray-700 text-xs font-medium">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 h-3.5 w-3.5" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    className="pl-8 pr-8 h-9 text-sm bg-gray-50/80 border-gray-200 text-gray-800 placeholder:text-gray-400 focus:border-amber-500 focus:ring-amber-500/20 rounded-lg"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-3.5 w-3.5" />
                    ) : (
                      <Eye className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
                {formData.confirmPassword && (
                  <div className="flex items-center">
                    {passwordsMatch ? (
                      <div className="flex items-center text-xs text-green-600">
                        <Check className="h-3 w-3 mr-1" />
                        Match
                      </div>
                    ) : (
                      <div className="flex items-center text-xs text-red-500">
                        <X className="h-3 w-3 mr-1" />
                        No match
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="mt-0.5 h-3 w-3 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                  required
                />
                <label htmlFor="terms" className="text-xs text-gray-600">
                  I agree to{" "}
                  <Link to="/terms" className="text-amber-600 hover:text-amber-700 underline">
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-amber-600 hover:text-amber-700 underline">
                    Privacy
                  </Link>
                </label>
              </div>

              {/* Sign Up Button */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 transition-all duration-300 text-white font-semibold h-9 text-sm rounded-lg shadow-md hover:shadow-lg"
                disabled={isLoading || !passwordsMatch || !passwordValid}
              >
                {isLoading ? (
                  <div className="animate-spin w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-3">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-2 text-gray-500">or</span>
              </div>
            </div>

            {/* Google Signup */}
            <Button
              variant="outline"
              className="w-full border-gray-200 bg-white hover:bg-gray-50 text-gray-700 transition-all duration-300 h-9 text-sm rounded-lg"
            >
              <Chrome className="mr-2 h-3.5 w-3.5" />
              Continue with Google
            </Button>

            {/* Login Link */}
            <div className="text-center text-xs pt-1">
              <span className="text-gray-500">Have an account? </span>
              <Link to="/login" className="text-amber-600 hover:text-amber-700 transition-colors font-semibold">
                Log in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;