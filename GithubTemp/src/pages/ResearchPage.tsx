import { useState } from "react";
import { useResearchPapers } from "../hooks/useApi";
import { Loader2, FileText, Calendar, Download, User, BookOpen, Search, Filter } from "lucide-react";

function ResearchPage() {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const { data: papers, loading, error } = useResearchPapers();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-lg">Loading research papers...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error max-w-md mx-auto mt-8">
        <span>Failed to load research papers. Please try again later.</span>
      </div>
    );
  }

  const filteredPapers = papers?.filter(paper => {
    const matchesStatus = selectedStatus === "all" || paper.status === selectedStatus.toUpperCase();
    const matchesSearch = searchTerm === "" || 
      paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paper.abstract.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paper.field.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesSearch;
  }) || [];

  const statusCounts = {
    all: papers?.length || 0,
    published: papers?.filter(p => p.status === 'PUBLISHED').length || 0,
    under_review: papers?.filter(p => p.status === 'UNDER_REVIEW').length || 0,
    draft: papers?.filter(p => p.status === 'DRAFT').length || 0,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PUBLISHED': return 'badge-success';
      case 'UNDER_REVIEW': return 'badge-warning';
      case 'SUBMITTED': return 'badge-info';
      case 'DRAFT': return 'badge-neutral';
      case 'REJECTED': return 'badge-error';
      default: return 'badge-neutral';
    }
  };

  const formatStatus = (status: string) => {
    return status.toLowerCase().replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200">
      {/* Hero Section */}
      <div className="hero bg-gradient-to-r from-primary to-secondary text-primary-content py-16">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <FileText size={64} className="mx-auto mb-4" />
            <h1 className="text-5xl font-bold">Research</h1>
            <p className="py-6 text-lg">
              Explore cutting-edge research in quantum science and technology
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="form-control">
                <div className="input-group">
                  <span>
                    <Search size={20} />
                  </span>
                  <input
                    type="text"
                    placeholder="Search papers by title, abstract, or field..."
                    className="input input-bordered flex-1"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Filter size={20} />
              <span className="text-sm font-medium">Status:</span>
            </div>
          </div>

          {/* Status Filter Tabs */}
          <div className="tabs tabs-boxed justify-center">
            {[
              { key: "all", label: "All Papers", count: statusCounts.all },
              { key: "published", label: "Published", count: statusCounts.published },
              { key: "under_review", label: "Under Review", count: statusCounts.under_review },
              { key: "draft", label: "Draft", count: statusCounts.draft },
            ].map((tab) => (
              <button
                key={tab.key}
                className={`tab tab-lg ${
                  selectedStatus === tab.key ? "tab-active" : ""
                }`}
                onClick={() => setSelectedStatus(tab.key)}
              >
                {tab.label}
                <div className="badge badge-primary badge-sm ml-2">{tab.count}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Research Papers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredPapers.map((paper) => (
            <div
              key={paper.id}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="card-body">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h2 className="card-title text-lg mb-2">{paper.title}</h2>
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`badge ${getStatusColor(paper.status)}`}>
                        {formatStatus(paper.status)}
                      </div>
                      <div className="badge badge-outline">
                        {paper.field}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Author Info */}
                <div className="flex items-center mb-4">
                  <div className="avatar placeholder mr-3">
                    <div className="bg-neutral text-neutral-content rounded-full w-10">
                      <span className="text-sm">
                        {paper.author.firstName[0]}{paper.author.lastName[0]}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-sm">
                      {paper.author.firstName} {paper.author.lastName}
                    </p>
                    <p className="text-xs text-base-content/70">
                      {paper.author.institution} • {paper.author.department}
                    </p>
                  </div>
                </div>

                {/* Abstract */}
                <div className="mb-4">
                  <h3 className="font-semibold text-sm mb-2">Abstract:</h3>
                  <p className="text-sm text-base-content/80 line-clamp-4">
                    {paper.abstract}
                  </p>
                </div>

                {/* Authors (if multiple) */}
                {paper.authors && JSON.parse(paper.authors).length > 1 && (
                  <div className="mb-4">
                    <h3 className="font-semibold text-sm mb-2">Co-authors:</h3>
                    <div className="flex flex-wrap gap-1">
                      {JSON.parse(paper.authors).slice(1, 4).map((author: string, index: number) => (
                        <div key={index} className="badge badge-outline badge-sm">
                          {author}
                        </div>
                      ))}
                      {JSON.parse(paper.authors).length > 4 && (
                        <div className="badge badge-outline badge-sm">
                          +{JSON.parse(paper.authors).length - 4} more
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Metadata */}
                <div className="flex justify-between text-sm mb-4">
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-1 text-base-content/60" />
                    <span>
                      {paper.publishedAt ? 
                        new Date(paper.publishedAt).toLocaleDateString() : 
                        new Date(paper.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Download size={16} className="mr-1 text-base-content/60" />
                    <span>{paper.downloads} downloads</span>
                  </div>
                </div>

                {/* DOI */}
                {paper.doi && (
                  <div className="mb-4">
                    <span className="text-xs text-base-content/60">DOI: </span>
                    <a 
                      href={`https://doi.org/${paper.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:underline"
                    >
                      {paper.doi}
                    </a>
                  </div>
                )}

                {/* Actions */}
                <div className="card-actions justify-end">
                  <button className="btn btn-ghost btn-sm">
                    <User size={16} />
                    Contact Author
                  </button>
                  <button className="btn btn-primary btn-sm">
                    <BookOpen size={16} />
                    Read Paper
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPapers.length === 0 && (
          <div className="text-center py-12">
            <FileText size={64} className="mx-auto text-base-content/30 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No papers found</h3>
            <p className="text-base-content/60">
              {searchTerm ? 
                "No papers match your search criteria." : 
                "No papers match the selected status filter."}
            </p>
            {searchTerm && (
              <button 
                className="btn btn-ghost btn-sm mt-2"
                onClick={() => setSearchTerm("")}
              >
                Clear search
              </button>
            )}
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="card bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
            <div className="card-body">
              <h2 className="card-title justify-center text-2xl mb-4">
                Share Your Research
              </h2>
              <p className="text-center text-base-content/80 mb-6">
                Contribute to the quantum science community by sharing your latest research,
                findings, and discoveries with peers around the world.
              </p>
              <div className="card-actions justify-center">
                <button className="btn btn-primary btn-lg">Submit Paper</button>
                <button className="btn btn-outline btn-lg">Browse Guidelines</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResearchPage;
