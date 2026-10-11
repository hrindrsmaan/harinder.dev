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
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";

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

// Shape of a row in the Supabase `jobs` table (snake_case columns)
interface JobRow {
  id: string;
  company: string;
  status: string;
  notes: string;
  date_applied: string;
}

const JOB_COLUMNS = "id, company, status, notes, date_applied";

const toJob = (row: JobRow): Job => ({
  id: row.id,
  company: row.company,
  status: row.status as JobStatus,
  notes: row.notes,
  dateApplied: row.date_applied,
});

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const JobTracker = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
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
    const loadJobs = async () => {
      const { data, error } = await supabase
        .from("jobs")
        .select(JOB_COLUMNS)
        .order("date_applied", { ascending: false });

      if (error) {
        setError(error.message);
      } else {
        setJobs(data.map(toJob));
      }
      setLoading(false);
    };

    loadJobs();
  }, []);

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

  // Each write waits for Supabase, then updates the list from the row it
  // returns, so the screen only ever shows what was actually saved.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.company || !form.dateApplied) return;

    const values = {
      company: form.company,
      status: form.status || "applied",
      notes: form.notes || "",
      date_applied: form.dateApplied,
    };

    setSaving(true);
    const { data, error } = editingId
      ? await supabase
          .from("jobs")
          .update(values)
          .eq("id", editingId)
          .select(JOB_COLUMNS)
          .single()
      : await supabase.from("jobs").insert(values).select(JOB_COLUMNS).single();
    setSaving(false);

    if (error) {
      setActionError(`Couldn't save job: ${error.message}`);
      return;
    }

    const saved = toJob(data);
    setJobs((prev) =>
      editingId
        ? prev.map((job) => (job.id === saved.id ? saved : job))
        : [saved, ...prev]
    );
    setActionError(null);
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

  const handleDelete = async (id: string) => {
    // .select() returns the deleted rows; RLS blocks deletes silently,
    // so an empty result means nothing was removed
    const { data, error } = await supabase
      .from("jobs")
      .delete()
      .eq("id", id)
      .select("id");

    if (error || data.length === 0) {
      setActionError(
        `Couldn't delete job: ${error?.message ?? "no row was deleted"}`
      );
      return;
    }

    setJobs((prev) => prev.filter((job) => job.id !== id));
    setActionError(null);
  };

  const handleStatusChange = async (id: string, newStatus: JobStatus) => {
    const { data, error } = await supabase
      .from("jobs")
      .update({ status: newStatus })
      .eq("id", id)
      .select(JOB_COLUMNS)
      .single();

    if (error) {
      setActionError(`Couldn't update status: ${error.message}`);
      return;
    }

    const saved = toJob(data);
    setJobs((prev) => prev.map((job) => (job.id === id ? saved : job)));
    setActionError(null);
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

  const statCards = [
    { label: "Total Applied", value: stats.total, Icon: Briefcase },
    { label: "Interviews", value: stats.interview.length, Icon: Users },
    { label: "Offers", value: stats.offer, Icon: Gift },
    { label: "Rejected", value: stats.rejected, Icon: X },
  ];

  return (
    <section className="min-h-screen bg-background px-4 pt-20 pb-8">
      <div className="mx-auto max-w-(--max-width)">
        <div className="mb-8 text-center">
          <h1 className="mb-2 inline-block border-b pb-2 text-[1.8rem] text-foreground max-[701px]:text-[1.4rem]">
            Job Tracker
          </h1>
          <p className="text-[1rem] text-muted-foreground">
            Track your job search progress and applications
          </p>
        </div>

        <div className="mb-6 grid grid-cols-4 gap-4 max-[701px]:grid-cols-2 max-[401px]:grid-cols-1">
          {statCards.map(({ label, value, Icon }) => (
            <Card key={label} size="sm" className="bg-secondary">
              <CardContent className="flex flex-row items-center gap-3">
                <div className="flex size-9 items-center justify-center border text-foreground">
                  <Icon size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[1.3rem] leading-[1.2] font-bold text-foreground">
                    {value}
                  </span>
                  <span className="text-[0.75rem] text-muted-foreground">
                    {label}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {stats.interview.length > 0 && (
          <Card size="sm" className="mb-6 bg-secondary">
            <CardContent>
              <div className="mb-2 text-[0.8rem] tracking-[0.5px] text-muted-foreground uppercase">Interviewing With</div>
              <div className="flex flex-wrap gap-2">
                {stats.interview.map((job) => (
                  <Badge key={job.id} variant="outline">
                    {job.company}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 max-[401px]:flex-col max-[401px]:items-stretch">
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

          <div className="flex items-center gap-2 text-muted-foreground max-[401px]:justify-center">
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
          <Card className="mb-6 bg-secondary">
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="mb-4 grid grid-cols-3 gap-4 max-[701px]:grid-cols-1">
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
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    variant="outline"
                    className="border-border-strong"
                    disabled={saving}
                  >
                    <Check />
                    {editingId ? "Update" : "Add Job"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {actionError && (
          <p className="mb-4 text-center text-destructive">{actionError}</p>
        )}

        <div className="flex flex-col gap-4">
          {loading ? (
            <p className="text-center text-muted-foreground">Loading jobs…</p>
          ) : error ? (
            <p className="text-center text-destructive">
              Couldn't load jobs: {error}
            </p>
          ) : filteredJobs.length === 0 ? (
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
                  <div className="flex items-center gap-2 text-[0.85rem] text-muted-foreground">
                    <Calendar size={13} />
                    <span>{formatDate(job.dateApplied)}</span>
                  </div>
                  {job.notes && <p className="m-0 text-[0.9rem] leading-[1.5] text-foreground">{job.notes}</p>}
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
