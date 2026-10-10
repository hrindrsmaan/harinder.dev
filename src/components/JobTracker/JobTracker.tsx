import { useState, useEffect } from "react";
import {
  Briefcase,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Users,
  Gift,
  Filter,
  Calendar,
} from "lucide-react";
import "./JobTracker.css";

type JobStatus = "applied" | "interview" | "offer" | "rejected";

interface Job {
  id: string;
  company: string;
  status: JobStatus;
  notes: string;
  dateApplied: string;
}

const statusConfig: Record<JobStatus, { label: string; color: string }> = {
  applied: { label: "Applied", color: "#1d4ed8" },
  interview: { label: "Interview", color: "#b45309" },
  offer: { label: "Offer", color: "#047857" },
  rejected: { label: "Rejected", color: "#dc2626" },
};

const STORAGE_KEY = "job-tracker-jobs";

const generateId = () =>
  `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const JobTracker = () => {
  const [jobs, setJobs] = useState<Job[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<JobStatus | "all">("all");
  const [form, setForm] = useState<Partial<Job>>({
    company: "",
    status: "applied",
    notes: "",
    dateApplied: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    document.title = "Job Tracker - Harinder.dev";
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
  }, [jobs]);

  const resetForm = () => {
    setForm({
      company: "",
      status: "applied",
      notes: "",
      dateApplied: new Date().toISOString().split("T")[0],
    });
    setShowForm(false);
    setEditingId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.company || !form.dateApplied) return;

    const dateApplied = new Date(form.dateApplied).toISOString();

    if (editingId) {
      setJobs((prev) =>
        prev.map((job) =>
          job.id === editingId ? { ...job, ...form, dateApplied } : job
        )
      );
    } else {
      const newJob: Job = {
        id: generateId(),
        company: form.company!,
        status: form.status || "applied",
        notes: form.notes || "",
        dateApplied,
      };
      setJobs((prev) => [newJob, ...prev]);
    }
    resetForm();
  };

  const handleEdit = (job: Job) => {
    setForm({
      company: job.company,
      status: job.status,
      notes: job.notes,
      dateApplied: job.dateApplied.split("T")[0],
    });
    setEditingId(job.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this job?")) {
      setJobs((prev) => prev.filter((job) => job.id !== id));
    }
  };

  const handleStatusChange = (id: string, newStatus: JobStatus) => {
    setJobs((prev) =>
      prev.map((job) =>
        job.id === id ? { ...job, status: newStatus } : job
      )
    );
  };

  const filteredJobs =
    filterStatus === "all"
      ? jobs
      : jobs.filter((job) => job.status === filterStatus);

  const stats = {
    total: jobs.length,
    interview: jobs.filter((j) => j.status === "interview"),
    offer: jobs.filter((j) => j.status === "offer").length,
    rejected: jobs.filter((j) => j.status === "rejected").length,
  };

  return (
    <section className="job-tracker-section">
      <div className="job-tracker-container">
        <div className="tracker-header">
          <h1>Job Tracker</h1>
          <p>Track your job search progress and applications</p>
        </div>

        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-icon">
              <Briefcase size={20} />
            </div>
            <div className="stat-info">
              <span className="stat-value">{stats.total}</span>
              <span className="stat-label">Total Applied</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <Users size={20} />
            </div>
            <div className="stat-info">
              <span className="stat-value">{stats.interview.length}</span>
              <span className="stat-label">Interviews</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <Gift size={20} />
            </div>
            <div className="stat-info">
              <span className="stat-value">{stats.offer}</span>
              <span className="stat-label">Offers</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <X size={20} />
            </div>
            <div className="stat-info">
              <span className="stat-value">{stats.rejected}</span>
              <span className="stat-label">Rejected</span>
            </div>
          </div>
        </div>

        {stats.interview.length > 0 && (
          <div className="interview-banner">
            <div className="interview-label">Interviewing With</div>
            <div className="interview-companies">
              {stats.interview.map((job) => (
                <span key={job.id} className="company-chip">
                  {job.company}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="toolbar">
          <button
            className="add-btn"
            onClick={() => {
              resetForm();
              setShowForm(!showForm);
            }}
          >
            {showForm ? <X size={18} /> : <Plus size={18} />}
            {showForm ? "Cancel" : "Add Job"}
          </button>

          <div className="filter-group">
            <Filter size={16} />
            <select
              value={filterStatus}
              onChange={(e) =>
                setFilterStatus(e.target.value as JobStatus | "all")
              }
            >
              <option value="all">All Jobs</option>
              {Object.entries(statusConfig).map(([key, config]) => (
                <option key={key} value={key}>
                  {config.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="job-form">
            <div className="form-row">
              <div className="form-group">
                <label>Company</label>
                <input
                  type="text"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  placeholder="Company name"
                  required
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  value={form.status}
                  onChange={(e) =>
                    setForm({ ...form, status: e.target.value as JobStatus })
                  }
                >
                  {Object.entries(statusConfig).map(([key, config]) => (
                    <option key={key} value={key}>
                      {config.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Date Applied</label>
                <input
                  type="date"
                  value={form.dateApplied}
                  onChange={(e) => {
                    const value = e.target.value;
                    const date = new Date(value);
                    if (!isNaN(date.getTime())) {
                      setForm({ ...form, dateApplied: value });
                    }
                  }}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>Notes</label>
              <textarea
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                placeholder="Notes..."
                rows={3}
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="submit-btn">
                <Check size={16} />
                {editingId ? "Update" : "Add Job"}
              </button>
            </div>
          </form>
        )}

        <div className="jobs-list">
          {filteredJobs.length === 0 ? (
            <div className="empty-state">
              <Briefcase size={40} />
              <p>
                {filterStatus === "all"
                  ? "No jobs yet. Click 'Add Job' to start tracking!"
                  : `No "${statusConfig[filterStatus as JobStatus]?.label}" jobs`}
              </p>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <div key={job.id} className="job-card">
                <div className="job-top">
                  <div className="job-info">
                    <h3>{job.company}</h3>
                    <span
                      className="status-badge"
                      style={{
                        background: `${statusConfig[job.status].color}15`,
                        color: statusConfig[job.status].color,
                      }}
                    >
                      {statusConfig[job.status].label}
                    </span>
                  </div>
                  <div className="job-actions">
                    <button onClick={() => handleEdit(job)} className="icon-btn">
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(job.id)}
                      className="icon-btn delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                <div className="job-meta">
                  <Calendar size={13} />
                  <span>{formatDate(job.dateApplied)}</span>
                </div>

                {job.notes && <p className="job-notes">{job.notes}</p>}

                <div className="job-footer">
                  <select
                    value={job.status}
                    onChange={(e) =>
                      handleStatusChange(job.id, e.target.value as JobStatus)
                    }
                    className="status-select"
                  >
                    {Object.entries(statusConfig).map(([key, config]) => (
                      <option key={key} value={key}>
                        {config.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default JobTracker;
