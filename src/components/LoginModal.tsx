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
} from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister: () => void;
}

export default function LoginModal({
  isOpen,
  onClose,
  onSwitchToRegister,
}: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      onClose();
      setEmail("");
      setPassword("");
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
  };

  const handleClose = () => {
    setEmail("");
    setPassword("");
    setError("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box w-11/12 max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Welcome Back</h2>
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
                placeholder="your@email.com"
                className="input input-bordered flex-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
          </div>

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
                placeholder="••••••••"
                className="input input-bordered flex-1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

          <div className="form-control mt-6">
            <button
              type="submit"
              className={`btn btn-primary ${isLoading ? "loading" : ""}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin mr-2" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </div>

          {/* Demo Credentials Section */}
          <div className="bg-base-200 p-4 rounded-lg mt-4">
            <h3 className="font-semibold text-sm mb-3 text-center">
              🚀 Demo Accounts
            </h3>
            <div className="grid grid-cols-1 gap-3 text-xs">
              <div className="bg-base-100 p-3 rounded border">
                <div className="font-medium text-primary mb-1">
                  👨‍🏫 Professor Account
                </div>
                <div className="space-y-1">
                  <div>
                    <span className="opacity-70">Email:</span> dr.chen@quiri.org
                  </div>
                  <div>
                    <span className="opacity-70">Password:</span> professor123
                  </div>
                </div>
              </div>
              <div className="bg-base-100 p-3 rounded border">
                <div className="font-medium text-secondary mb-1">
                  🎓 Student Account
                </div>
                <div className="space-y-1">
                  <div>
                    <span className="opacity-70">Email:</span>{" "}
                    emma.johnson@student.quiri.org
                  </div>
                  <div>
                    <span className="opacity-70">Password:</span> student123
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="divider">Don't have an account?</div>

          <button
            type="button"
            className="btn btn-outline btn-block"
            onClick={onSwitchToRegister}
            disabled={isLoading}
          >
            <User size={20} />
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}
