import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  AlertCircle,
  Loader2,
  GraduationCap,
  Briefcase,
} from "lucide-react";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

export default function RegisterModal({
  isOpen,
  onClose,
  onSwitchToLogin,
}: RegisterModalProps) {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    role: "STUDENT" as "STUDENT" | "PROFESSOR",
    institution: "",
    department: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const { register, isLoading } = useAuth();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      const { confirmPassword, ...registrationData } = formData;
      await register(registrationData);
      onClose();
      resetForm();
    } catch (err: any) {
      setError(err.message || "Registration failed");
    }
  };

  const resetForm = () => {
    setFormData({
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      role: "STUDENT",
      institution: "",
      department: "",
    });
    setError("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box w-11/12 max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Join QuIRI</h2>
          <button
            className="btn btn-sm btn-circle btn-ghost"
            onClick={handleClose}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="alert alert-error">
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}

          {/* Role Selection */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">I am a</span>
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label
                className={`cursor-pointer ${
                  formData.role === "STUDENT" ? "bg-primary/10" : "bg-base-200"
                } rounded-lg p-4 border-2 ${
                  formData.role === "STUDENT"
                    ? "border-primary"
                    : "border-transparent"
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value="STUDENT"
                  checked={formData.role === "STUDENT"}
                  onChange={handleChange}
                  className="hidden"
                />
                <div className="flex items-center space-x-3">
                  <GraduationCap
                    size={24}
                    className={
                      formData.role === "STUDENT" ? "text-primary" : ""
                    }
                  />
                  <span className="font-medium">Student</span>
                </div>
              </label>
              <label
                className={`cursor-pointer ${
                  formData.role === "PROFESSOR"
                    ? "bg-primary/10"
                    : "bg-base-200"
                } rounded-lg p-4 border-2 ${
                  formData.role === "PROFESSOR"
                    ? "border-primary"
                    : "border-transparent"
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value="PROFESSOR"
                  checked={formData.role === "PROFESSOR"}
                  onChange={handleChange}
                  className="hidden"
                />
                <div className="flex items-center space-x-3">
                  <Briefcase
                    size={24}
                    className={
                      formData.role === "PROFESSOR" ? "text-primary" : ""
                    }
                  />
                  <span className="font-medium">Professor</span>
                </div>
              </label>
            </div>
          </div>

          {/* Personal Information */}
          <div className="grid grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">First Name</span>
              </label>
              <input
                type="text"
                name="firstName"
                placeholder="John"
                className="input input-bordered"
                value={formData.firstName}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Last Name</span>
              </label>
              <input
                type="text"
                name="lastName"
                placeholder="Doe"
                className="input input-bordered"
                value={formData.lastName}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Account Information */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <div className="input-group">
              <span>
                <Mail size={20} />
              </span>
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                className="input input-bordered flex-1"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <div className="input-group">
              <span>
                <User size={20} />
              </span>
              <input
                type="text"
                name="username"
                placeholder="johndoe"
                className="input input-bordered flex-1"
                value={formData.username}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Password */}
          <div className="grid grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="input-group">
                <span>
                  <Lock size={20} />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  className="input input-bordered flex-1"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="btn btn-square btn-ghost"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <div className="input-group">
                <span>
                  <Lock size={20} />
                </span>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="••••••••"
                  className="input input-bordered flex-1"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="btn btn-square btn-ghost"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isLoading}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Institution Information */}
          <div className="grid grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Institution</span>
              </label>
              <input
                type="text"
                name="institution"
                placeholder="MIT, Stanford, etc."
                className="input input-bordered"
                value={formData.institution}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Department</span>
              </label>
              <input
                type="text"
                name="department"
                placeholder="Physics, Computer Science, etc."
                className="input input-bordered"
                value={formData.department}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="form-control mt-6">
            <button
              type="submit"
              className={`btn btn-primary ${isLoading ? "loading" : ""}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin mr-2" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </div>

          <div className="divider">Already have an account?</div>

          <button
            type="button"
            className="btn btn-outline btn-block"
            onClick={onSwitchToLogin}
            disabled={isLoading}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
