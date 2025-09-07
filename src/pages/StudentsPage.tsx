import { useState } from "react";
import { useStudents } from "../hooks/useApi";
import {
  Loader2,
  GraduationCap,
  MapPin,
  Book,
  Briefcase,
  Globe,
  Linkedin,
} from "lucide-react";

function StudentsPage() {
  const [selectedLevel, setSelectedLevel] = useState("all");
  const { data: students, loading, error } = useStudents();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-lg">Loading students...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error max-w-md mx-auto mt-8">
        <span>Failed to load students. Please try again later.</span>
      </div>
    );
  }

  const filteredStudents =
    students?.filter((student) => {
      if (selectedLevel === "all") return true;
      return student.studentProfile?.level === selectedLevel.toUpperCase();
    }) || [];

  const levelCounts = {
    all: students?.length || 0,
    undergrad:
      students?.filter((s) => s.studentProfile?.level === "UNDERGRADUATE")
        .length || 0,
    masters:
      students?.filter((s) => s.studentProfile?.level === "MASTERS").length ||
      0,
    phd: students?.filter((s) => s.studentProfile?.level === "PHD").length || 0,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200">
      {/* Hero Section */}
      <div className="hero bg-gradient-to-r from-primary to-secondary text-primary-content py-16">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <GraduationCap size={64} className="mx-auto mb-4" />
            <h1 className="text-5xl font-bold">Students</h1>
            <p className="py-6 text-lg">
              Discover brilliant students advancing quantum science and
              technology
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filter Tabs */}
        <div className="tabs tabs-boxed justify-center mb-8">
          {[
            { key: "all", label: "All Students", count: levelCounts.all },
            {
              key: "undergrad",
              label: "Undergraduate",
              count: levelCounts.undergrad,
            },
            { key: "masters", label: "Masters", count: levelCounts.masters },
            { key: "phd", label: "PhD", count: levelCounts.phd },
          ].map((tab) => (
            <button
              key={tab.key}
              className={`tab tab-lg ${
                selectedLevel === tab.key ? "tab-active" : ""
              }`}
              onClick={() => setSelectedLevel(tab.key)}
            >
              {tab.label}
              <div className="badge badge-primary badge-sm ml-2">
                {tab.count}
              </div>
            </button>
          ))}
        </div>

        {/* Students Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map((student) => (
            <div
              key={student.id}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="card-body">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="avatar placeholder mr-3">
                      <div className="bg-neutral text-neutral-content rounded-full w-12">
                        <span className="text-xl">
                          {student.firstName[0]}
                          {student.lastName[0]}
                        </span>
                      </div>
                    </div>
                    <div>
                      <h2 className="card-title text-lg">
                        {student.firstName} {student.lastName}
                      </h2>
                      <p className="text-sm text-base-content/70">
                        {student.studentProfile?.level || "Student"}
                      </p>
                    </div>
                  </div>
                  <div className="badge badge-secondary">
                    {student.studentProfile?.year || "N/A"}
                  </div>
                </div>

                {/* Institution & Field */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm">
                    <MapPin size={16} className="mr-2 text-base-content/60" />
                    <span>{student.institution}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Book size={16} className="mr-2 text-base-content/60" />
                    <span>{student.department}</span>
                  </div>
                </div>

                {/* Research Focus */}
                {student.studentProfile?.researchFocus && (
                  <div className="mb-4">
                    <h3 className="font-semibold text-sm mb-2">
                      Research Focus:
                    </h3>
                    <p className="text-sm text-base-content/80">
                      {student.studentProfile.researchFocus}
                    </p>
                  </div>
                )}

                {/* Stats */}
                <div className="flex justify-between text-sm mb-4">
                  <div className="stat p-2">
                    <div className="stat-title text-xs">Level</div>
                    <div className="stat-value text-lg">
                      {student.studentProfile?.level || "N/A"}
                    </div>
                  </div>
                  <div className="stat p-2">
                    <div className="stat-title text-xs">Year</div>
                    <div className="stat-value text-lg">
                      {student.studentProfile?.year || "N/A"}
                    </div>
                  </div>
                </div>

                {/* Bio */}
                {student.bio && (
                  <div className="mb-4">
                    <p className="text-sm text-base-content/80 line-clamp-3">
                      {student.bio}
                    </p>
                  </div>
                )}

                {/* Advisor */}
                {student.studentProfile?.advisor && (
                  <div className="mb-4">
                    <h3 className="font-semibold text-sm mb-2">Advisor:</h3>
                    <p className="text-sm text-base-content/80">
                      {student.studentProfile.advisor}
                    </p>
                  </div>
                )}

                {/* Actions */}
                <div className="card-actions justify-end">
                  {student.website && (
                    <a
                      href={student.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-ghost btn-sm"
                    >
                      <Globe size={16} />
                    </a>
                  )}
                  {student.linkedin && (
                    <a
                      href={student.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-ghost btn-sm"
                    >
                      <Linkedin size={16} />
                    </a>
                  )}
                  <button className="btn btn-primary btn-sm">
                    <Briefcase size={16} />
                    Connect
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredStudents.length === 0 && (
          <div className="text-center py-12">
            <GraduationCap
              size={64}
              className="mx-auto text-base-content/30 mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">No students found</h3>
            <p className="text-base-content/60">
              No students match the selected level filter.
            </p>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="card bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
            <div className="card-body">
              <h2 className="card-title justify-center text-2xl mb-4">
                Are you a student in quantum science?
              </h2>
              <p className="text-center text-base-content/80 mb-6">
                Join our community and connect with peers, professors, and
                industry professionals working on cutting-edge quantum
                technologies.
              </p>
              <div className="card-actions justify-center">
                <button className="btn btn-primary btn-lg">Join QuIRI</button>
                <button className="btn btn-outline btn-lg">Learn More</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentsPage;
