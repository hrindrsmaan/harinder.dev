import { useState, useEffect, useId, useMemo } from "react";
import { Plus, X, Search, Pencil, Trash2 } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

const statusConfig: Record<
  JobStatus,
  {
    label: string;
    pillClass: string;
    barClass: string;
    dotClass: string;
    filterLabel: string;
  }
> = {
  applied: {
    label: "Applied",
    pillClass: "bg-status-applied/10 text-status-applied",
    barClass: "bg-status-applied",
    dotClass: "bg-status-applied",
    filterLabel: "Applied",
  },
  interview: {
    label: "Interview",
    pillClass: "bg-status-interview/10 text-status-interview",
    barClass: "bg-status-interview",
    dotClass: "bg-status-interview",
    filterLabel: "Interview",
  },
  offer: {
    label: "Offer",
    pillClass: "bg-status-offer/10 text-status-offer",
    barClass: "bg-status-offer",
    dotClass: "bg-status-offer",
    filterLabel: "Offer",
  },
  rejected: {
    label: "Rejected",
    pillClass: "bg-status-rejected/10 text-status-rejected",
    barClass: "bg-status-rejected",
    dotClass: "bg-status-rejected",
    filterLabel: "Rejected",
  },
};

type StatusFilter = JobStatus | "all";

const JobTracker = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<StatusFilter>("all");
  const [search, setSearch] = useState("");
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

  const stats = useMemo(
    () => ({
      total: jobs.length,
      applied: jobs.filter((j) => j.status === "applied"),
      interview: jobs.filter((j) => j.status === "interview"),
      offer: jobs.filter((j) => j.status === "offer"),
      rejected: jobs.filter((j) => j.status === "rejected"),
    }),
    [jobs]
  );

  const filteredJobs = useMemo(() => {
    const q = search.trim().toLowerCase();
    return jobs.filter((job) => {
      if (filterStatus !== "all" && job.status !== filterStatus) return false;
      if (
        q &&
        !job.company.toLowerCase().includes(q) &&
        !job.notes.toLowerCase().includes(q)
      ) {
        return false;
      }
      return true;
    });
  }, [jobs, filterStatus, search]);

  const statCards = [
    {
      label: "Total applied",
      value: stats.total,
      sub:
        stats.total > 0
          ? `${stats.applied.length} awaiting response`
          : "No applications yet",
      dotClass: "bg-foreground",
    },
    {
      label: "Interviewing",
      value: stats.interview.length,
      sub:
        stats.interview.length > 0
          ? stats.interview.map((j) => j.company).join(", ")
          : "—",
      dotClass: "bg-status-interview",
    },
    {
      label: "Offers",
      value: stats.offer.length,
      sub:
        stats.offer.length > 0
          ? stats.offer.map((j) => j.company).join(", ")
          : "—",
      dotClass: "bg-status-offer",
    },
    {
      label: "Rejected",
      value: stats.rejected.length,
      sub:
        stats.total > 0
          ? `${Math.round((stats.rejected.length / stats.total) * 100)}% of total`
          : "—",
      dotClass: "bg-status-rejected",
    },
  ];

  const filterTabs: { key: StatusFilter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "applied", label: statusConfig.applied.filterLabel },
    { key: "interview", label: statusConfig.interview.filterLabel },
    { key: "offer", label: statusConfig.offer.filterLabel },
    { key: "rejected", label: statusConfig.rejected.filterLabel },
  ];

  const tabCount = (key: StatusFilter) =>
    key === "all" ? jobs.length : jobs.filter((j) => j.status === key).length;

  return (
    <section className="min-h-screen bg-background">
      <div className="mx-auto max-w-(--max-width) px-8 pt-10 pb-12 max-md:px-4 max-md:pt-6 max-md:pb-8">
        {/* Title row */}
        <div className="mb-8 flex items-end justify-between gap-6 max-[701px]:flex-col max-[701px]:items-start max-[701px]:gap-4">
          <div>
            <h1 className="mb-2 text-[2.5rem] leading-none max-[701px]:text-[2rem]">
              Applications
            </h1>
            <p className="text-[0.95rem] text-muted-foreground">
              Track every role from first application to final decision.
            </p>
          </div>
          <Button
            onClick={() => {
              resetForm();
              setShowForm(!showForm);
            }}
            className="h-10 px-4 font-medium"
          >
            {showForm ? <X /> : <Plus />}
            {showForm ? "Cancel" : "Add application"}
          </Button>
        </div>

        {/* Stats card */}
        <div className="mb-8 border border-border">
          <div className="grid grid-cols-4 divide-x divide-border max-[701px]:grid-cols-2 max-[701px]:divide-x-0">
            {statCards.map((card, i) => (
              <div
                key={card.label}
                className={cn(
                  "p-5 max-[701px]:p-4",
                  // Mobile: vertical divider on odd-positioned cells of the
                  // first column (and 3rd of 4) so the 2x2 grid has hairlines
                  // between cells.
                  i % 2 === 0 &&
                    i !== statCards.length - 1 &&
                    "max-[701px]:border-r max-[701px]:border-border",
                  // Mobile: horizontal divider under the first row.
                  i < 2 && "max-[701px]:border-b max-[701px]:border-border"
                )}
              >
                <div className="mb-3 flex items-center gap-2 text-[0.7rem] tracking-[0.5px] text-muted-foreground uppercase">
                  <span
                    aria-hidden="true"
                    className={cn("size-2 rounded-full", card.dotClass)}
                  />
                  {card.label}
                </div>
                <div className="mb-1 text-[2rem] leading-none font-bold tracking-tight text-foreground">
                  {card.value}
                </div>
                <div className="text-[0.8rem] text-muted-foreground">
                  {card.sub}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 border-t border-border px-5 py-4">
            <span className="shrink-0 text-[0.7rem] tracking-[0.5px] text-muted-foreground uppercase">
              Pipeline
            </span>
            <div className="flex h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
              {stats.total > 0 &&
                (Object.keys(statusConfig) as JobStatus[]).map((s) => {
                  const count = stats[s].length;
                  if (count === 0) return null;
                  return (
                    <div
                      key={s}
                      className={statusConfig[s].barClass}
                      style={{ width: `${(count / stats.total) * 100}%` }}
                      aria-label={`${count} ${statusConfig[s].label}`}
                    />
                  );
                })}
            </div>
          </div>
        </div>

        {/* Filter + search row */}
        <div className="mb-4 flex items-center justify-between gap-4 max-[701px]:flex-col max-[701px]:items-stretch">
          <div className="flex border border-border divide-x divide-border max-[701px]:overflow-x-auto">
            {filterTabs.map(({ key, label }) => {
              const active = filterStatus === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setFilterStatus(key)}
                  className={cn(
                    "shrink-0 px-4 py-2 text-[0.85rem] transition-colors",
                    active
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                  )}
                >
                  {label} <span className="opacity-60">{tabCount(key)}</span>
                </button>
              );
            })}
          </div>
          <InputGroup className="max-w-xs max-[701px]:max-w-none">
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Search company or notes"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
        </div>

        {actionError && (
          <p className="mb-4 text-center text-destructive">{actionError}</p>
        )}

        {/* Form */}
        {showForm && (
          <div className="mb-6 border border-border bg-secondary">
            <form onSubmit={handleSubmit} className="p-5">
              <div className="mb-4 grid grid-cols-3 gap-4 max-[701px]:grid-cols-1">
                <Field className="gap-1.5">
                  <FieldLabel htmlFor={`${fieldId}-company`}>
                    Company
                  </FieldLabel>
                  <Input
                    id={`${fieldId}-company`}
                    type="text"
                    value={form.company}
                    onChange={(e) =>
                      setForm({ ...form, company: e.target.value })
                    }
                    placeholder="Company name"
                    required
                  />
                </Field>
                <Field className="gap-1.5">
                  <FieldLabel htmlFor={`${fieldId}-status`}>
                    Status
                  </FieldLabel>
                  <Select
                    value={form.status}
                    onValueChange={(value) =>
                      setForm({ ...form, status: value as JobStatus })
                    }
                  >
                    <SelectTrigger
                      id={`${fieldId}-status`}
                      className="w-full"
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
                </Field>
                <Field className="gap-1.5">
                  <FieldLabel htmlFor={`${fieldId}-date`}>
                    Date Applied
                  </FieldLabel>
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
              <Field className="mb-4 gap-1.5">
                <FieldLabel htmlFor={`${fieldId}-notes`}>Notes</FieldLabel>
                <Textarea
                  id={`${fieldId}-notes`}
                  value={form.notes}
                  onChange={(e) =>
                    setForm({ ...form, notes: e.target.value })
                  }
                  placeholder="Notes..."
                  rows={3}
                />
              </Field>
              <div className="flex justify-end">
                <Button type="submit" disabled={saving}>
                  {editingId ? "Update" : "Add application"}
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Table */}
        <div className="border border-border">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border bg-secondary/40 text-[0.7rem] tracking-[0.5px] text-muted-foreground uppercase">
                  <th className="px-4 py-3 font-medium">Company</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Applied</th>
                  <th className="px-4 py-3 font-medium">Notes</th>
                  <th className="px-4 py-3 text-right font-medium">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-8 text-center text-muted-foreground"
                    >
                      Loading jobs…
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-8 text-center text-destructive"
                    >
                      Couldn't load jobs: {error}
                    </td>
                  </tr>
                ) : filteredJobs.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-12 text-center text-muted-foreground"
                    >
                      {search.trim()
                        ? "No jobs match your search."
                        : filterStatus === "all"
                          ? "No jobs yet. Click 'Add application' to start tracking!"
                          : `No "${statusConfig[filterStatus as JobStatus].label}" jobs`}
                    </td>
                  </tr>
                ) : (
                  filteredJobs.map((job) => (
                    <tr
                      key={job.id}
                      className="border-b border-border transition-colors last:border-b-0 hover:bg-secondary/40"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div
                            aria-hidden="true"
                            className="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary font-sans text-[0.85rem] font-medium text-foreground"
                          >
                            {job.company.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-medium text-foreground">
                            {job.company}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Select
                          value={job.status}
                          onValueChange={(value) =>
                            handleStatusChange(job.id, value as JobStatus)
                          }
                        >
                          <SelectTrigger
                            aria-label={`Status for ${job.company}`}
                            size="sm"
                            className={cn(
                              "h-auto w-auto gap-1.5 rounded-full border px-2.5 py-1 text-[0.78rem] font-medium shadow-none",
                              statusConfig[job.status].pillClass
                            )}
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(statusConfig).map(
                              ([key, config]) => (
                                <SelectItem key={key} value={key}>
                                  {config.label}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="px-4 py-3 text-[0.875rem] whitespace-nowrap text-muted-foreground">
                        {formatDate(job.dateApplied)}
                      </td>
                      <td className="max-w-[300px] px-4 py-3 text-[0.875rem] text-foreground">
                        {job.notes || (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            aria-label={`Edit ${job.company}`}
                            onClick={() => handleEdit(job)}
                          >
                            <Pencil />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon-sm"
                                aria-label={`Delete ${job.company}`}
                                className="hover:text-destructive"
                              >
                                <Trash2 />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Delete this job?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  {job.company} will be removed from your
                                  tracker. This can't be undone.
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
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobTracker;