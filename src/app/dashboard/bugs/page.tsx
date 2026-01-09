"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import { getAllBugs, Bug } from "@/lib/api";
import { Bug as BugIcon, Filter, Search, Plus } from "lucide-react";

// Force dynamic rendering to avoid Suspense issues
export const dynamic = 'force-dynamic';

export default function BugListPage() {
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  useEffect(() => {
    const fetchBugs = async () => {
      try {
        const data = await getAllBugs();
        setBugs(data);
      } catch (err: unknown) {
        console.error(err);
        setError("Failed to load issues.");
      } finally {
        setLoading(false);
      }
    };

    fetchBugs();
  }, []);

  // Filter bugs based on search and filters
  const filteredBugs = bugs.filter(bug => {
    const matchesSearch = searchTerm === "" || 
      bug.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bug.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || bug.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || bug.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Get status counts for filters
  const statusCounts = {
    all: bugs.length,
    open: bugs.filter(b => b.status === 'open').length,
    in_progress: bugs.filter(b => b.status === 'in_progress').length,
    resolved: bugs.filter(b => b.status === 'resolved').length,
    closed: bugs.filter(b => b.status === 'closed').length,
  };

  // Get priority counts
  const priorityCounts = {
    all: bugs.length,
    high: bugs.filter(b => b.priority === 'high').length,
    medium: bugs.filter(b => b.priority === 'medium').length,
    low: bugs.filter(b => b.priority === 'low').length,
  };

  // Get priority color
  const getPriorityColor = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'medium':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'low':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'open':
        return 'github-status-open';
      case 'in_progress':
        return 'github-status-merged';
      case 'resolved':
      case 'closed':
        return 'github-status-closed';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Issues</h1>
            <p className="text-muted-foreground mt-1">Track and manage all reported issues</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Link 
              href="/dashboard/bugs/new" 
              className="github-btn-primary flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              New Issue
            </Link>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="github-card border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Issues</p>
                <p className="text-2xl font-bold text-foreground mt-1">{bugs.length}</p>
              </div>
              <BugIcon className="h-8 w-8 text-muted-foreground/30" />
            </div>
          </div>
          
          <div className="github-card border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Open</p>
                <p className="text-2xl font-bold text-open mt-1">{statusCounts.open}</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-open/10 flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-open" />
              </div>
            </div>
          </div>
          
          <div className="github-card border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold text-merged mt-1">{statusCounts.in_progress}</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-merged/10 flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-merged" />
              </div>
            </div>
          </div>
          
          <div className="github-card border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Resolved</p>
                <p className="text-2xl font-bold text-closed mt-1">
                  {statusCounts.resolved + statusCounts.closed}
                </p>
              </div>
              <div className="h-8 w-8 rounded-full bg-closed/10 flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-closed" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="github-card border-border">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search issues..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="github-form-input pl-10"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="github-form-input text-sm"
                >
                  <option value="all">All Status ({statusCounts.all})</option>
                  <option value="open">Open ({statusCounts.open})</option>
                  <option value="in_progress">In Progress ({statusCounts.in_progress})</option>
                  <option value="resolved">Resolved ({statusCounts.resolved})</option>
                  <option value="closed">Closed ({statusCounts.closed})</option>
                </select>
              </div>

              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="github-form-input text-sm"
              >
                <option value="all">All Priority ({priorityCounts.all})</option>
                <option value="high">High ({priorityCounts.high})</option>
                <option value="medium">Medium ({priorityCounts.medium})</option>
                <option value="low">Low ({priorityCounts.low})</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="github-card border-border flex items-center justify-center py-12">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
              <h3 className="text-foreground font-medium mb-2">Loading issues...</h3>
              <p className="text-muted-foreground">Fetching all reported issues</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="github-alert-error">
            <div className="flex items-center">
              <svg className="h-5 w-5 mr-3 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="font-medium">{error}</p>
                <p className="text-sm text-destructive/70 mt-1">Please try refreshing the page</p>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredBugs.length === 0 && (
          <div className="github-card border-border text-center py-12">
            <BugIcon className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-foreground mb-2">No issues found</h3>
            <p className="text-muted-foreground mb-4">
              {bugs.length === 0 
                ? "No issues have been reported yet. Create the first issue!"
                : "No issues match your current filters."}
            </p>
            {bugs.length === 0 && (
              <Link 
                href="/dashboard/bugs/new" 
                className="github-btn-primary inline-flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Create First Issue
              </Link>
            )}
          </div>
        )}

        {/* Bugs List */}
        {!loading && !error && filteredBugs.length > 0 && (
          <div className="space-y-3">
            {filteredBugs.map((bug) => (
              <Link
                key={bug.id}
                href={`/dashboard/bugs/${bug.id}`}
                className="github-card border-border hover:border-primary/30 hover:shadow-card-hover transition-all duration-200 block"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Left side: Bug info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`github-status-badge ${getStatusColor(bug.status)}`}>
                        {bug.status.replace('_', ' ')}
                      </span>
                      <span className="text-xs text-muted-foreground">#{bug.id}</span>
                    </div>
                    <h3 className="font-semibold text-foreground truncate">
                      {bug.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                      {bug.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-4 mt-3 text-sm">
                      <div className="flex items-center gap-1">
                        <span className="text-muted-foreground">Priority:</span>
                        <span className={`px-2 py-0.5 rounded text-xs ${getPriorityColor(bug.priority)}`}>
                          {bug.priority}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-muted-foreground">Assigned:</span>
                        <span className="font-medium text-foreground">
                          {bug.assigned_to || "Unassigned"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right side: Metadata */}
                  <div className="flex flex-col items-end gap-2 text-sm text-muted-foreground">
                    <div>
                      {bug.project && (
                        <span className="inline-flex items-center gap-1 bg-muted px-2 py-1 rounded text-xs">
                          {bug.project.name}
                        </span>
                      )}
                    </div>
                    <div>
                      {new Date(bug.createdAt || bug.created_at).toLocaleDateString()}
                    </div>
                    <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Results Count */}
        {!loading && !error && filteredBugs.length > 0 && (
          <div className="text-sm text-muted-foreground">
            Showing {filteredBugs.length} of {bugs.length} issues
          </div>
        )}
      </div>
    </Layout>
  );
}