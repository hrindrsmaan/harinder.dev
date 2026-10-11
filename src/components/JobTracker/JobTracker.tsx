import { useState, useEffect, useId } from "react";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
} from "@/components/ui/empty";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import "./JobTracker.css";

type JobStatus = "applied" | "interview" | "offer" | "rejected";

interface Job {
  id: string;
  company: string;
  status: JobStatus;
  notes: string;
  dateApplied: string;
}

// Full class strings so Tailwind can detect them; colors are --status-* tokens
const statusConfig: Record<JobStatus, { label: string; className: string }> = {
  applied: {
    label: "Applied",
    className: "bg-status-applied/10 text-status-applied",
  },
  interview: {
    label: "Interview",
    className: "bg-status-interview/10 text-status-interview",
  },
  offer: { label: "Offer", className: "bg-status-offer/10 text-status-offer" },
  rejected: {
    label: "Rejected",
    className: "bg-status-rejected/10 text-status-rejected",
  },
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
  const fieldId = useId();
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
    setJobs((prev) => prev.filter((job) => job.id !== id));
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
          <Card size="sm" className="bg-secondary">
            <CardContent className="flex flex-row items-center gap-3">
              <div className="stat-icon">
                <Briefcase size={20} />
              </div>
              <div className="stat-info">
                <span className="stat-value">{stats.total}</span>
                <span className="stat-label">Total Applied</span>
              </div>
            </CardContent>
          </Card>
          <Card size="sm" className="bg-secondary">
            <CardContent className="flex flex-row items-center gap-3">
              <div className="stat-icon">
                <Users size={20} />
              </div>
              <div className="stat-info">
                <span className="stat-value">{stats.interview.length}</span>
                <span className="stat-label">Interviews</span>
              </div>
            </CardContent>
          </Card>
          <Card size="sm" className="bg-secondary">
            <CardContent className="flex flex-row items-center gap-3">
              <div className="stat-icon">
                <Gift size={20} />
              </div>
              <div className="stat-info">
                <span className="stat-value">{stats.offer}</span>
                <span className="stat-label">Offers</span>
              </div>
            </CardContent>
          </Card>
          <Card size="sm" className="bg-secondary">
            <CardContent className="flex flex-row items-center gap-3">
              <div className="stat-icon">
                <X size={20} />
              </div>
              <div className="stat-info">
                <span className="stat-value">{stats.rejected}</span>
                <span className="stat-label">Rejected</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {stats.interview.length > 0 && (
          <Card size="sm" className="mb-6 bg-secondary">
            <CardContent>
              <div className="interview-label">Interviewing With</div>
              <div className="interview-companies">
                {stats.interview.map((job) => (
                  <Badge key={job.id} variant="outline">
                    {job.company}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="toolbar">
          <Button
            variant="outline"
            className="border-border-strong"
            onClick={() => {
              resetForm();
              setShowForm(!showForm);
            }}
          >
            {showForm ? <X /> : <Plus />}
            {showForm ? "Cancel" : "Add Job"}
          </Button>

          <div className="filter-group">
            <Filter size={16} />
            <Select
              value={filterStatus}
              onValueChange={(value) =>
                setFilterStatus(value as JobStatus | "all")
              }
            >
              <SelectTrigger
                aria-label="Filter by status"
                className="bg-secondary text-foreground"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Jobs</SelectItem>
                {Object.entries(statusConfig).map(([key, config]) => (
                  <SelectItem key={key} value={key}>
                    {config.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="job-form">
            <div className="form-row">
              <Field className="gap-1.5">
                <FieldLabel htmlFor={`${fieldId}-company`}>Company</FieldLabel>
                <Input
                  id={`${fieldId}-company`}
                  type="text"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  placeholder="Company name"
                  required
                />
              </Field>
              <Field className="gap-1.5">
                <FieldLabel htmlFor={`${fieldId}-status`}>Status</FieldLabel>
                <Select
                  value={form.status}
                  onValueChange={(value) =>
                    setForm({ ...form, status: value as JobStatus })
                  }
                >
                  <SelectTrigger id={`${fieldId}-status`} className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(statusConfig).map(([key, config]) => (
                      <SelectItem key={key} value={key}>
                        {config.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field className="gap-1.5">
                <FieldLabel htmlFor={`${fieldId}-date`}>Date Applied</FieldLabel>
                <Input
                  id={`${fieldId}-date`}
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
              </Field>
            </div>
            <Field className="gap-1.5">
              <FieldLabel htmlFor={`${fieldId}-notes`}>Notes</FieldLabel>
              <Textarea
                id={`${fieldId}-notes`}
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                placeholder="Notes..."
                rows={3}
              />
            </Field>
            <div className="form-actions">
              <Button
                type="submit"
                variant="outline"
                className="border-border-strong"
              >
                <Check />
                {editingId ? "Update" : "Add Job"}
              </Button>
            </div>
          </form>
        )}

        <div className="jobs-list">
          {filteredJobs.length === 0 ? (
            <Empty className="border border-solid bg-secondary p-8">
              <EmptyHeader>
                <EmptyMedia>
                  <Briefcase size={40} />
                </EmptyMedia>
                <EmptyDescription>
                  {filterStatus === "all"
                    ? "No jobs yet. Click 'Add Job' to start tracking!"
                    : `No "${statusConfig[filterStatus as JobStatus]?.label}" jobs`}
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          ) : (
            filteredJobs.map((job) => (
              <Card key={job.id} size="sm" className="gap-3 bg-secondary">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <h3 className="m-0 text-base font-bold">{job.company}</h3>
                    <Badge
                      variant="outline"
                      className={cn(
                        "uppercase",
                        statusConfig[job.status].className
                      )}
                    >
                      {statusConfig[job.status].label}
                    </Badge>
                  </CardTitle>
                  <CardAction className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon-sm"
                      aria-label={`Edit ${job.company}`}
                      onClick={() => handleEdit(job)}
                    >
                      <Edit2 />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon-sm"
                          aria-label={`Delete ${job.company}`}
                          className="hover:text-destructive"
                        >
                          <Trash2 />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete this job?</AlertDialogTitle>
                          <AlertDialogDescription>
                            {job.company} will be removed from your tracker.
                            This can't be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            variant="destructive"
                            onClick={() => handleDelete(job.id)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </CardAction>
                </CardHeader>

                <CardContent>
                  <div className="job-meta">
                    <Calendar size={13} />
                    <span>{formatDate(job.dateApplied)}</span>
                  </div>
                  {job.notes && <p className="job-notes">{job.notes}</p>}
                </CardContent>

                <CardFooter className="border-t pt-3">
                  <Select
                    value={job.status}
                    onValueChange={(value) =>
                      handleStatusChange(job.id, value as JobStatus)
                    }
                  >
                    <SelectTrigger
                      size="sm"
                      aria-label={`Status for ${job.company}`}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(statusConfig).map(([key, config]) => (
                        <SelectItem key={key} value={key}>
                          {config.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default JobTracker;
