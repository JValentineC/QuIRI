import { useState } from "react";
import { useProfessors } from "../hooks/useApi";
import type { User } from "../types/database";

function ProfessorsPage() {
  const [selectedField, setSelectedField] = useState("all");
  const { data: professorsData, loading, error } = useProfessors();

  // Helper function to parse research areas from JSON string
  const parseResearchAreas = (researchAreasJson: string): string[] => {
    try {
      return JSON.parse(researchAreasJson);
    } catch {
      return [];
    }
  };

  // Helper function to get field category from research areas
  const getFieldCategory = (user: User): string => {
    if (!user.professorProfile?.researchAreas) return "other";
    const areas = parseResearchAreas(user.professorProfile.researchAreas);

    if (
      areas.some(
        (area) =>
          area.toLowerCase().includes("computing") ||
          area.toLowerCase().includes("algorithm")
      )
    ) {
      return "computing";
    }
    if (
      areas.some(
        (area) =>
          area.toLowerCase().includes("material") ||
          area.toLowerCase().includes("superconductor")
      )
    ) {
      return "materials";
    }
    if (
      areas.some(
        (area) =>
          area.toLowerCase().includes("information") ||
          area.toLowerCase().includes("cryptography")
      )
    ) {
      return "information";
    }
    if (
      areas.some(
        (area) =>
          area.toLowerCase().includes("sensing") ||
          area.toLowerCase().includes("sensor")
      )
    ) {
      return "sensing";
    }
    if (
      areas.some(
        (area) =>
          area.toLowerCase().includes("communication") ||
          area.toLowerCase().includes("network")
      )
    ) {
      return "communications";
    }
    return "other";
  };

  const professors = professorsData || [];

  const fields = [
    { id: "all", name: "All Fields" },
    { id: "computing", name: "Quantum Computing" },
    { id: "materials", name: "Quantum Materials" },
    { id: "information", name: "Quantum Information" },
    { id: "sensing", name: "Quantum Sensing" },
    { id: "communications", name: "Quantum Communications" },
  ];

  const filteredProfessors =
    selectedField === "all"
      ? professors
      : professors.filter((prof) => getFieldCategory(prof) === selectedField);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg"></span>
          <p className="mt-4">Loading professors...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="alert alert-error">
          <span>Error loading professors: {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Meet Our Professors</h1>
        <p className="text-xl text-base-content/70">
          Connect with leading quantum researchers from around the world
        </p>
      </div>

      {/* Field Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {fields.map((field) => (
          <button
            key={field.id}
            className={`btn btn-sm ${
              selectedField === field.id ? "btn-primary" : "btn-outline"
            }`}
            onClick={() => setSelectedField(field.id)}
          >
            {field.name}
          </button>
        ))}
      </div>

      {/* Admin Actions */}
      <div className="flex justify-end mb-6">
        <div className="flex gap-2">
          <button className="btn btn-primary btn-sm">📁 Manage Files</button>
          <button className="btn btn-outline btn-sm">➕ Add Professor</button>
        </div>
      </div>

      {/* Professors Grid */}
      {filteredProfessors.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-base-content/70">No professors found.</p>
          <p className="text-sm text-base-content/50 mt-2">
            The database might be empty. Run the seed script to add sample data.
          </p>
          <button
            className="btn btn-primary mt-4"
            onClick={() => window.location.reload()}
          >
            Refresh
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProfessors.map((professor) => (
            <div
              key={professor.id}
              className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow"
            >
              <div className="card-body text-center">
                {/* Profile Image/Avatar */}
                <div className="text-6xl mb-4">
                  {professor.profileImage ? (
                    <img
                      src={professor.profileImage}
                      alt={`${professor.firstName} ${professor.lastName}`}
                      className="w-16 h-16 rounded-full mx-auto"
                    />
                  ) : (
                    "👨‍🏫"
                  )}
                </div>

                {/* Basic Info */}
                <h2 className="card-title text-lg justify-center mb-2">
                  {professor.professorProfile?.title || "Dr."}{" "}
                  {professor.firstName} {professor.lastName}
                </h2>
                <p className="text-sm font-medium text-primary mb-2">
                  {professor.institution}
                </p>
                {professor.department && (
                  <p className="text-xs text-base-content/60 mb-4">
                    {professor.department}
                  </p>
                )}

                {/* Bio */}
                {professor.bio && (
                  <div className="bg-base-100 p-2 rounded text-xs mb-4">
                    {professor.bio.length > 100
                      ? `${professor.bio.substring(0, 97)}...`
                      : professor.bio}
                  </div>
                )}

                {/* Research Areas */}
                {professor.professorProfile?.researchAreas && (
                  <div className="flex flex-wrap gap-1 justify-center mb-4">
                    {parseResearchAreas(
                      professor.professorProfile.researchAreas
                    )
                      .slice(0, 2)
                      .map((area, index) => (
                        <span
                          key={index}
                          className="badge badge-outline badge-sm"
                        >
                          {area}
                        </span>
                      ))}
                    {parseResearchAreas(
                      professor.professorProfile.researchAreas
                    ).length > 2 && (
                      <span className="badge badge-ghost badge-sm">
                        +
                        {parseResearchAreas(
                          professor.professorProfile.researchAreas
                        ).length - 2}{" "}
                        more
                      </span>
                    )}
                  </div>
                )}

                {/* Stats */}
                {professor.professorProfile && (
                  <div className="grid grid-cols-2 gap-2 text-xs text-base-content/70 mb-4">
                    <div>
                      📄 {professor.professorProfile.publications} Papers
                    </div>
                    <div>🔬 {professor.professorProfile.projects} Projects</div>
                  </div>
                )}

                {/* Privacy Status */}
                <div className="flex justify-center mb-4">
                  <span
                    className={`badge ${
                      professor.isPublic ? "badge-success" : "badge-warning"
                    }`}
                  >
                    {professor.isPublic ? "🌐 Public" : "🔒 Private"}
                  </span>
                </div>

                {/* Actions */}
                <div className="card-actions justify-center">
                  <button className="btn btn-primary btn-sm">
                    View Profile
                  </button>
                  <div className="dropdown dropdown-end">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn btn-ghost btn-sm"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 5v.01M12 12v.01M12 19v.01"
                        />
                      </svg>
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                    >
                      {professor.linkedin && (
                        <li>
                          <a
                            href={professor.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            LinkedIn
                          </a>
                        </li>
                      )}
                      {professor.website && (
                        <li>
                          <a
                            href={professor.website}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Website
                          </a>
                        </li>
                      )}
                      <li>
                        <a>Message</a>
                      </li>
                      <li>
                        <a>Collaborate</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* File Management Section */}
      <div className="mt-12">
        <div className="divider"></div>
        <h2 className="text-2xl font-bold mb-6">
          Research Files & Publications
        </h2>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h3 className="card-title">📁 Upload Research Files</h3>
              <p className="text-sm text-base-content/70 mb-4">
                Share your research papers, datasets, and other academic
                materials
              </p>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">File Privacy</span>
                </label>
                <select className="select select-bordered select-sm">
                  <option>🌐 Public - Visible to all</option>
                  <option>🏫 Institution Only</option>
                  <option>🔒 Private - Only me</option>
                  <option>👥 Collaborators Only</option>
                </select>
              </div>

              <div className="card-actions justify-end mt-4">
                <button className="btn btn-primary btn-sm">Upload Files</button>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h3 className="card-title">📊 Research Analytics</h3>
              <div className="stats stats-vertical">
                <div className="stat py-2">
                  <div className="stat-title text-xs">Active Professors</div>
                  <div className="stat-value text-lg">{professors.length}</div>
                </div>
                <div className="stat py-2">
                  <div className="stat-title text-xs">Total Publications</div>
                  <div className="stat-value text-lg">
                    {professors.reduce(
                      (sum, prof) =>
                        sum + (prof.professorProfile?.publications || 0),
                      0
                    )}
                  </div>
                </div>
                <div className="stat py-2">
                  <div className="stat-title text-xs">Active Projects</div>
                  <div className="stat-value text-lg">
                    {professors.reduce(
                      (sum, prof) =>
                        sum + (prof.professorProfile?.projects || 0),
                      0
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfessorsPage;
