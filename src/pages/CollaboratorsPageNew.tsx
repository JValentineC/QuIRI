import { useState } from "react";
import { useCollaborations } from "../hooks/useApi";
import { usePagination } from "../hooks/usePagination";
import { Pagination } from "../components/Pagination";
import {
  Loader2,
  Users,
  Calendar,
  Briefcase,
  User,
  MessageCircle,
} from "lucide-react";

function CollaboratorsPage() {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const { data: collaborations, loading, error } = useCollaborations();

  // Move pagination hook to top - before any conditional returns
  const filteredCollaborations =
    collaborations?.filter((collaboration) => {
      if (selectedStatus === "all") return true;
      return collaboration.status === selectedStatus.toUpperCase();
    }) || [];

  const {
    currentPage,
    totalPages,
    paginatedData: paginatedCollaborations,
    goToPage,
  } = usePagination({
    data: filteredCollaborations,
    itemsPerPage: 6,
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-lg">Loading collaborations...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error max-w-md mx-auto mt-8">
        <span>Failed to load collaborations. Please try again later.</span>
      </div>
    );
  }

  const statusCounts = {
    all: collaborations?.length || 0,
    active: collaborations?.filter((c) => c.status === "ACTIVE").length || 0,
    recruiting:
      collaborations?.filter((c) => c.status === "RECRUITING").length || 0,
    completed:
      collaborations?.filter((c) => c.status === "COMPLETED").length || 0,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "badge-success";
      case "RECRUITING":
        return "badge-warning";
      case "COMPLETED":
        return "badge-info";
      case "PAUSED":
        return "badge-neutral";
      default:
        return "badge-neutral";
    }
  };

  const formatStatus = (status: string) => {
    return status
      .toLowerCase()
      .replace("_", " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200">
      <div className="container mx-auto px-4 py-8">
        {/* Filter Tabs */}
        <div className="tabs tabs-boxed justify-center mb-8">
          {[
            { key: "all", label: "All Projects", count: statusCounts.all },
            {
              key: "recruiting",
              label: "Recruiting",
              count: statusCounts.recruiting,
            },
            { key: "active", label: "Active", count: statusCounts.active },
            {
              key: "completed",
              label: "Completed",
              count: statusCounts.completed,
            },
          ].map((tab) => (
            <button
              key={tab.key}
              className={`tab tab-lg ${
                selectedStatus === tab.key ? "tab-active" : ""
              }`}
              onClick={() => setSelectedStatus(tab.key)}
            >
              {tab.label}
              <div className="badge badge-primary badge-sm ml-2">
                {tab.count}
              </div>
            </button>
          ))}
        </div>

        {/* Collaborations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {paginatedCollaborations.map((collaboration) => (
            <div
              key={collaboration.id}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="card-body">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h2 className="card-title text-lg mb-2">
                      {collaboration.title}
                    </h2>
                    <div className="flex items-center gap-2">
                      <div
                        className={`badge ${getStatusColor(
                          collaboration.status
                        )}`}
                      >
                        {formatStatus(collaboration.status)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Leader Info */}
                <div className="flex items-center mb-4">
                  <div className="avatar placeholder mr-3">
                    <div className="bg-neutral text-neutral-content rounded-full w-10">
                      <span className="text-sm">
                        {collaboration.leader.firstName[0]}
                        {collaboration.leader.lastName[0]}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-sm">
                      {collaboration.leader.firstName}{" "}
                      {collaboration.leader.lastName}
                    </p>
                    <p className="text-xs text-base-content/70">
                      Project Leader • {collaboration.leader.institution}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-4">
                  <p className="text-sm text-base-content/80 line-clamp-3">
                    {collaboration.description}
                  </p>
                </div>

                {/* Participants */}
                <div className="mb-4">
                  <h3 className="font-semibold text-sm mb-2">
                    Team ({collaboration.participants.length} members)
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {collaboration.participants
                      .slice(0, 4)
                      .map((participant) => (
                        <div key={participant.id} className="flex items-center">
                          <div className="avatar placeholder mr-1">
                            <div className="bg-base-300 text-base-content rounded-full w-6">
                              <span className="text-xs">
                                {participant.user.firstName[0]}
                              </span>
                            </div>
                          </div>
                          <span className="text-xs">
                            {participant.user.firstName}
                          </span>
                        </div>
                      ))}
                    {collaboration.participants.length > 4 && (
                      <div className="badge badge-outline badge-sm">
                        +{collaboration.participants.length - 4} more
                      </div>
                    )}
                  </div>
                </div>

                {/* Timeline */}
                <div className="flex justify-between text-sm mb-4">
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-1 text-base-content/60" />
                    <span>Started: {formatDate(collaboration.startDate)}</span>
                  </div>
                  {collaboration.endDate && (
                    <div className="flex items-center">
                      <Calendar
                        size={16}
                        className="mr-1 text-base-content/60"
                      />
                      <span>Ends: {formatDate(collaboration.endDate)}</span>
                    </div>
                  )}
                </div>

                {/* Participant Roles (if available) */}
                {collaboration.participants.some((p) => p.role) && (
                  <div className="mb-4">
                    <h3 className="font-semibold text-sm mb-2">Roles:</h3>
                    <div className="flex flex-wrap gap-1">
                      {collaboration.participants
                        .filter((p) => p.role)
                        .slice(0, 3)
                        .map((participant, index) => (
                          <div
                            key={index}
                            className="badge badge-outline badge-sm"
                          >
                            {participant.role}
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="card-actions justify-end">
                  <button className="btn btn-ghost btn-sm">
                    <MessageCircle size={16} />
                    Contact Leader
                  </button>
                  {collaboration.status === "RECRUITING" ? (
                    <button className="btn btn-primary btn-sm">
                      <User size={16} />
                      Join Project
                    </button>
                  ) : collaboration.status === "ACTIVE" ? (
                    <button className="btn btn-outline btn-sm">
                      <Briefcase size={16} />
                      View Details
                    </button>
                  ) : (
                    <button className="btn btn-ghost btn-sm">
                      <Briefcase size={16} />
                      View Results
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Results Summary */}
        {filteredCollaborations.length > 0 && (
          <div className="text-center text-sm text-base-content/70 mb-4">
            Showing {(currentPage - 1) * 6 + 1}-
            {Math.min(currentPage * 6, filteredCollaborations.length)} of{" "}
            {filteredCollaborations.length} collaborations
          </div>
        )}

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
        />

        {/* Empty State */}
        {filteredCollaborations.length === 0 && (
          <div className="text-center py-12">
            <Users size={64} className="mx-auto text-base-content/30 mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              No collaborations found
            </h3>
            <p className="text-base-content/60">
              No collaborations match the selected status filter.
            </p>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="card bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
            <div className="card-body">
              <h2 className="card-title justify-center text-2xl mb-4">
                Start a Collaboration
              </h2>
              <p className="text-center text-base-content/80 mb-6">
                Launch your own research project and invite scientists from
                around the world to contribute their expertise and advance our
                understanding of quantum science.
              </p>
              <div className="card-actions justify-center">
                <button className="btn btn-primary btn-lg">
                  Create Project
                </button>
                <button className="btn btn-outline btn-lg">
                  Browse Opportunities
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CollaboratorsPage;
