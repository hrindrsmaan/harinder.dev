import PasswordGate from "./PasswordGate";
import JobTracker from "./JobTracker";

const SubHeader = () => (
  <div className="border-b border-border">
    <div className="mx-auto flex max-w-(--max-width) items-center justify-between px-8 py-3 max-md:px-4 max-md:py-2">
      <div className="flex items-center gap-3 text-[0.9rem]">
        <span
          aria-hidden="true"
          className="flex size-6 items-center justify-center rounded-sm bg-foreground"
        />
        <span className="font-sans font-bold tracking-tight text-foreground">
          harinder.dev
        </span>
        <span className="text-muted-foreground">/</span>
        <span className="text-muted-foreground">Job Tracker</span>
      </div>
      <div
        aria-hidden="true"
        className="flex size-8 items-center justify-center rounded-full bg-secondary font-sans text-[0.8rem] font-medium text-foreground"
      >
        H
      </div>
    </div>
  </div>
);

const JobTrackerPage = () => (
  <>
    <SubHeader />
    <PasswordGate>
      <JobTracker />
    </PasswordGate>
  </>
);

export default JobTrackerPage;