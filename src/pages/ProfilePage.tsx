import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../contexts/AuthContext";
import { profileSchema, type ProfileFormData } from "../lib/validation";
import { formatSocialLink } from "../lib/socialUtils";
import {
  User,
  Mail,
  Building2,
  GraduationCap,
  Globe,
  Github,
  Linkedin,
  Twitter,
  BookOpen,
  Edit3,
  ArrowLeft,
} from "lucide-react";
function ProfilePage() {
  const navigate = useNavigate();
  const { user, updateProfile, isLoading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      bio: "",
      institution: "",
      department: "",
      website: "",
      linkedin: "",
      twitter: "",
      github: "",
      orcid: "",
      researchGate: "",
    },
  });

  // Reset form when user data changes or editing starts
  useEffect(() => {
    if (user && isEditing) {
      reset({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        bio: user.bio || "",
        institution: user.institution || "",
        department: user.department || "",
        website: user.website || "",
        linkedin: user.linkedin || "",
        twitter: user.twitter || "",
        github: user.github || "",
        orcid: user.orcid || "",
        researchGate: user.researchGate || "",
      });
    }
  }, [user, isEditing, reset]);

  const onSubmit = async (data: ProfileFormData) => {
    setUpdateLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await updateProfile(data);
      setSuccessMessage("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
      setErrorMessage("Failed to update profile. Please try again.");
    } finally {
      setUpdateLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-96">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Profile Not Found</h1>
          <p>Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <div className="breadcrumbs text-sm mb-4">
          <ul>
            <li>
              <a
                onClick={() => navigate("/")}
                className="cursor-pointer hover:text-primary"
              >
                <ArrowLeft size={16} />
                Back to Network
              </a>
            </li>
            <li>Profile</li>
          </ul>
        </div>

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Profile</h1>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-primary btn-sm"
            >
              <Edit3 size={16} />
              Edit Profile
            </button>
          )}
        </div>

        {/* Success/Error Messages */}
        {successMessage && (
          <div className="alert alert-success mb-4">
            <span>{successMessage}</span>
          </div>
        )}
        {errorMessage && (
          <div className="alert alert-error mb-4">
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mb-4">
                  <User size={48} className="text-primary-content" />
                </div>
                {isEditing ? (
                  <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                    <div className="form-control w-full mb-4">
                      <input
                        {...register("firstName")}
                        className="input input-bordered input-sm text-center"
                        placeholder="First Name"
                      />
                      {errors.firstName && (
                        <label className="label">
                          <span className="label-text-alt text-error">
                            {errors.firstName.message}
                          </span>
                        </label>
                      )}
                    </div>
                    <div className="form-control w-full mb-4">
                      <input
                        {...register("lastName")}
                        className="input input-bordered input-sm text-center"
                        placeholder="Last Name"
                      />
                      {errors.lastName && (
                        <label className="label">
                          <span className="label-text-alt text-error">
                            {errors.lastName.message}
                          </span>
                        </label>
                      )}
                    </div>
                    <div className="flex gap-2 justify-center">
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="btn btn-ghost btn-sm"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={updateLoading || !isValid}
                        className="btn btn-primary btn-sm"
                      >
                        {updateLoading ? (
                          <span className="loading loading-spinner loading-sm"></span>
                        ) : (
                          "Save"
                        )}
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <h3 className="text-xl font-semibold">
                      {user.firstName} {user.lastName}
                    </h3>
                    <div className="flex items-center gap-2 text-base-content/70 mb-2">
                      <Mail size={16} />
                      {user.email}
                    </div>
                    {user.institution && (
                      <div className="flex items-center gap-2 text-base-content/70">
                        <Building2 size={16} />
                        {user.institution}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Details Card */}
          <div className="lg:col-span-2">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                {isEditing ? (
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="card-title text-2xl">Edit Profile</h2>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setIsEditing(false)}
                          className="btn btn-ghost btn-sm"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={updateLoading || !isValid}
                          className="btn btn-primary btn-sm"
                        >
                          {updateLoading ? (
                            <span className="loading loading-spinner loading-sm"></span>
                          ) : (
                            "Save Changes"
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Institution</span>
                        </label>
                        <input
                          {...register("institution")}
                          className="input input-bordered w-full"
                          placeholder="Your institution"
                        />
                        {errors.institution && (
                          <label className="label">
                            <span className="label-text-alt text-error">
                              {errors.institution.message}
                            </span>
                          </label>
                        )}
                      </div>

                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Department</span>
                        </label>
                        <input
                          {...register("department")}
                          className="input input-bordered w-full"
                          placeholder="Your department"
                        />
                        {errors.department && (
                          <label className="label">
                            <span className="label-text-alt text-error">
                              {errors.department.message}
                            </span>
                          </label>
                        )}
                      </div>
                    </div>

                    <div className="form-control mb-6">
                      <label className="label">
                        <span className="label-text">Bio</span>
                      </label>
                      <textarea
                        {...register("bio")}
                        className="textarea textarea-bordered h-24"
                        placeholder="Tell us about yourself and your research interests..."
                      ></textarea>
                      {errors.bio && (
                        <label className="label">
                          <span className="label-text-alt text-error">
                            {errors.bio.message}
                          </span>
                        </label>
                      )}
                    </div>

                    <h3 className="text-lg font-semibold mb-4">Social Links</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text flex items-center gap-2">
                            <Globe size={16} />
                            Website
                          </span>
                        </label>
                        <input
                          {...register("website")}
                          className="input input-bordered w-full"
                          placeholder="https://yourwebsite.com"
                        />
                        {errors.website && (
                          <label className="label">
                            <span className="label-text-alt text-error">
                              {errors.website.message}
                            </span>
                          </label>
                        )}
                      </div>

                      <div className="form-control">
                        <label className="label">
                          <span className="label-text flex items-center gap-2">
                            <Linkedin size={16} />
                            LinkedIn
                          </span>
                        </label>
                        <input
                          {...register("linkedin")}
                          className="input input-bordered w-full"
                          placeholder="username or full URL"
                        />
                        {errors.linkedin && (
                          <label className="label">
                            <span className="label-text-alt text-error">
                              {errors.linkedin.message}
                            </span>
                          </label>
                        )}
                      </div>

                      <div className="form-control">
                        <label className="label">
                          <span className="label-text flex items-center gap-2">
                            <Twitter size={16} />
                            Twitter
                          </span>
                        </label>
                        <input
                          {...register("twitter")}
                          className="input input-bordered w-full"
                          placeholder="@username or full URL"
                        />
                        {errors.twitter && (
                          <label className="label">
                            <span className="label-text-alt text-error">
                              {errors.twitter.message}
                            </span>
                          </label>
                        )}
                      </div>

                      <div className="form-control">
                        <label className="label">
                          <span className="label-text flex items-center gap-2">
                            <Github size={16} />
                            GitHub
                          </span>
                        </label>
                        <input
                          {...register("github")}
                          className="input input-bordered w-full"
                          placeholder="username or full URL"
                        />
                        {errors.github && (
                          <label className="label">
                            <span className="label-text-alt text-error">
                              {errors.github.message}
                            </span>
                          </label>
                        )}
                      </div>

                      <div className="form-control">
                        <label className="label">
                          <span className="label-text flex items-center gap-2">
                            <BookOpen size={16} />
                            ORCID
                          </span>
                        </label>
                        <input
                          {...register("orcid")}
                          className="input input-bordered w-full"
                          placeholder="0000-0000-0000-0000"
                        />
                        {errors.orcid && (
                          <label className="label">
                            <span className="label-text-alt text-error">
                              {errors.orcid.message}
                            </span>
                          </label>
                        )}
                      </div>

                      <div className="form-control">
                        <label className="label">
                          <span className="label-text flex items-center gap-2">
                            <BookOpen size={16} />
                            ResearchGate
                          </span>
                        </label>
                        <input
                          {...register("researchGate")}
                          className="input input-bordered w-full"
                          placeholder="profile name or full URL"
                        />
                        {errors.researchGate && (
                          <label className="label">
                            <span className="label-text-alt text-error">
                              {errors.researchGate.message}
                            </span>
                          </label>
                        )}
                      </div>
                    </div>
                  </form>
                ) : (
                  <>
                    {/* View Mode */}
                    <h3 className="text-xl font-semibold mb-4">
                      Profile Details
                    </h3>

                    <div className="space-y-4">
                      {user.institution && (
                        <div className="flex items-center gap-3">
                          <Building2 size={20} className="text-primary" />
                          <div>
                            <div className="font-medium">
                              {user.institution}
                            </div>
                            {user.department && (
                              <div className="text-sm text-base-content/70">
                                {user.department}
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {user.bio && (
                        <div className="flex items-start gap-3">
                          <GraduationCap
                            size={20}
                            className="text-primary mt-1"
                          />
                          <div>
                            <div className="font-medium mb-1">About</div>
                            <p className="text-base-content/80 leading-relaxed">
                              {user.bio}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Social Links */}
                      <div className="divider"></div>
                      <div className="flex flex-wrap gap-2">
                        {user.website && (
                          <a
                            href={user.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline btn-sm"
                          >
                            <Globe size={14} />
                            Website
                          </a>
                        )}
                        {user.linkedin && (
                          <a
                            href={formatSocialLink("linkedin", user.linkedin)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline btn-sm"
                          >
                            <Linkedin size={14} />
                            LinkedIn
                          </a>
                        )}
                        {user.twitter && (
                          <a
                            href={formatSocialLink("twitter", user.twitter)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline btn-sm"
                          >
                            <Twitter size={14} />
                            Twitter
                          </a>
                        )}
                        {user.github && (
                          <a
                            href={formatSocialLink("github", user.github)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline btn-sm"
                          >
                            <Github size={14} />
                            GitHub
                          </a>
                        )}
                        {user.orcid && (
                          <a
                            href={formatSocialLink("orcid", user.orcid)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline btn-sm"
                          >
                            <BookOpen size={14} />
                            ORCID
                          </a>
                        )}
                        {user.researchGate && (
                          <a
                            href={formatSocialLink(
                              "researchgate",
                              user.researchGate
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline btn-sm"
                          >
                            <BookOpen size={14} />
                            ResearchGate
                          </a>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
