import PasswordGate from "./PasswordGate";
import JobTracker from "./JobTracker";

const JobTrackerPage = () => {
  return (
    <PasswordGate>
      <JobTracker />
    </PasswordGate>
  );
};

export default JobTrackerPage;
