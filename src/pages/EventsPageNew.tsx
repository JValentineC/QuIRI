import { useState } from "react";
import { useEvents } from "../hooks/useApi";
import { usePagination } from "../hooks/usePagination";
import { Pagination } from "../components/Pagination";
import { Loader2, Calendar, MapPin, Clock, Users } from "lucide-react";

function EventsPage() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const { data: events, loading, error } = useEvents();

  // Calculate filtered events for pagination
  const now = new Date();
  const upcomingEvents =
    events?.filter((event) => new Date(event.startDate) >= now) || [];
  const pastEvents =
    events?.filter((event) => new Date(event.startDate) < now) || [];

  const filteredEvents = (() => {
    switch (selectedFilter) {
      case "upcoming":
        return upcomingEvents;
      case "past":
        return pastEvents;
      default:
        return events || [];
    }
  })();

  // Initialize pagination hook unconditionally
  const {
    currentPage,
    totalPages,
    paginatedData: paginatedEvents,
    goToPage,
  } = usePagination({
    data: filteredEvents,
    itemsPerPage: 6, // Show 6 events per page
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-lg">Loading events...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error max-w-md mx-auto mt-8">
        <span>Failed to load events. Please try again later.</span>
      </div>
    );
  }

  const filterCounts = {
    all: events?.length || 0,
    upcoming: upcomingEvents.length,
    past: pastEvents.length,
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const isUpcoming = (dateString: string) => {
    return new Date(dateString) >= now;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200">
      <div className="container mx-auto px-4 py-8">
        {/* Filter Tabs */}
        <div className="flex justify-center mb-8">
          <div className="tabs tabs-boxed">
            {[
              { key: "all", label: "All Events", count: filterCounts.all },
              {
                key: "upcoming",
                label: "Upcoming",
                count: filterCounts.upcoming,
              },
              { key: "past", label: "Past Events", count: filterCounts.past },
            ].map((tab) => (
              <button
                key={tab.key}
                className={`tab tab-lg ${
                  selectedFilter === tab.key ? "tab-active" : ""
                }`}
                onClick={() => setSelectedFilter(tab.key)}
              >
                {tab.label}
                <div className="badge badge-primary badge-sm ml-2">
                  {tab.count}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {paginatedEvents.map((event) => (
            <div
              key={event.id}
              className={`card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 ${
                isUpcoming(event.startDate)
                  ? "border-l-4 border-l-primary"
                  : "opacity-75"
              }`}
            >
              <div className="card-body">
                {/* Event Status */}
                <div className="flex justify-between items-start mb-4">
                  <div
                    className={`badge ${
                      isUpcoming(event.startDate)
                        ? "badge-success"
                        : "badge-neutral"
                    }`}
                  >
                    {isUpcoming(event.startDate) ? "Upcoming" : "Past Event"}
                  </div>
                  <div className="badge badge-outline">{event.type}</div>
                </div>

                {/* Event Title */}
                <h2 className="card-title text-lg mb-3">{event.title}</h2>

                {/* Date and Time */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm">
                    <Calendar size={16} className="mr-2 text-base-content/60" />
                    <span>{formatDate(event.startDate)}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock size={16} className="mr-2 text-base-content/60" />
                    <span>
                      {formatTime(event.startDate)}
                      {event.endDate && ` - ${formatTime(event.endDate)}`}
                    </span>
                  </div>
                  {event.location && (
                    <div className="flex items-center text-sm">
                      <MapPin size={16} className="mr-2 text-base-content/60" />
                      <span>{event.location}</span>
                    </div>
                  )}
                </div>

                {/* Description */}
                {event.description && (
                  <div className="mb-4">
                    <p className="text-sm text-base-content/80 line-clamp-3">
                      {event.description}
                    </p>
                  </div>
                )}

                {/* Registration Info */}
                <div className="flex justify-between items-center text-sm mb-4">
                  {event.maxAttendees && (
                    <div className="flex items-center">
                      <Users size={16} className="mr-1 text-base-content/60" />
                      <span>Max: {event.maxAttendees}</span>
                    </div>
                  )}
                  <div
                    className={`badge ${
                      event.registrationOpen ? "badge-success" : "badge-error"
                    }`}
                  >
                    {event.registrationOpen
                      ? "Registration Open"
                      : "Registration Closed"}
                  </div>
                </div>

                {/* Virtual/Location Info */}
                <div className="mb-4">
                  <div className="stat bg-base-200 rounded p-3">
                    <div className="stat-title text-xs">Event Format</div>
                    <div className="stat-value text-lg">
                      {event.isVirtual ? "Virtual" : "In-Person"}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="card-actions justify-end">
                  {isUpcoming(event.startDate) && event.registrationOpen ? (
                    <button className="btn btn-primary btn-sm">Register</button>
                  ) : isUpcoming(event.startDate) ? (
                    <button className="btn btn-outline btn-sm" disabled>
                      Registration Closed
                    </button>
                  ) : (
                    <button className="btn btn-outline btn-sm" disabled>
                      Event Ended
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Results Summary */}
        {filteredEvents.length > 0 && (
          <div className="text-center text-sm text-base-content/70 mb-4">
            Showing {(currentPage - 1) * 6 + 1}-
            {Math.min(currentPage * 6, filteredEvents.length)} of{" "}
            {filteredEvents.length} events
          </div>
        )}

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
        />

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <Calendar size={64} className="mx-auto text-base-content/30 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No events found</h3>
            <p className="text-base-content/60">
              {selectedFilter === "upcoming" &&
                "No upcoming events at this time."}
              {selectedFilter === "past" && "No past events to display."}
              {selectedFilter === "all" && "No events available."}
            </p>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="card bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
            <div className="card-body">
              <h2 className="card-title justify-center text-2xl mb-4">
                Host Your Own Event
              </h2>
              <p className="text-center text-base-content/80 mb-6">
                Organize workshops, seminars, or conferences to bring together
                the quantum science community and share knowledge.
              </p>
              <div className="card-actions justify-center">
                <button className="btn btn-primary btn-lg">Create Event</button>
                <button className="btn btn-outline btn-lg">
                  Event Guidelines
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventsPage;
