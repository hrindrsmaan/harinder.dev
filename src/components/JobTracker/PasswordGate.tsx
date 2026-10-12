import { useState, useEffect, useId } from "react";
import { Button } from "@/components/ui/button";
import { FieldError } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";

const HASH_KEY = "job-tracker-password-hash";

const hashPassword = (password: string): string => {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return hash.toString(36);
};

interface PasswordGateProps {
  children: React.ReactNode;
}

const PasswordGate = ({ children }: PasswordGateProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [storedHash, setStoredHash] = useState<string | null>(null);
  const [error, setError] = useState("");
  const passwordId = useId();

  useEffect(() => {
    const hash = localStorage.getItem(HASH_KEY);
    setStoredHash(hash);
  }, []);

  const handleSetup = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 4) {
      setError("Password must be at least 4 characters");
      return;
    }
    const hash = hashPassword(password);
    localStorage.setItem(HASH_KEY, hash);
    setStoredHash(hash);
    setIsAuthenticated(true);
    setError("");
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const hash = hashPassword(password);
    if (hash === storedHash) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect password");
    }
    setPassword("");
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <section className="flex min-h-[calc(100vh-5rem)] items-center justify-center border-b-0 px-8 py-20 max-md:px-4">
      <div className="w-full max-w-[450px]">
        <p className="mb-4 flex items-center gap-2.5 font-mono text-(length:--fs-xs) tracking-[0.12em] text-muted-foreground uppercase">
          <span
            aria-hidden="true"
            className="size-2 shrink-0 rounded-full bg-muted-foreground/60"
          />
          Restricted
        </p>

        <h1 className="mb-3 text-[clamp(1.625rem,6vw,2.125rem)]">Job Tracker</h1>

        <p className="mb-8 font-sans text-(length:--fs-base) text-muted-foreground max-md:mb-7">
          {storedHash
            ? "This area is private. Enter the password to continue."
            : "This area is private. Set a password to lock it."}
        </p>

        <form
          onSubmit={storedHash ? handleLogin : handleSetup}
          className="flex flex-col gap-2"
        >
          <Label htmlFor={passwordId} className="mb-2 text-[0.875rem]">
            Password
          </Label>

          <InputGroup className="h-14 rounded-[var(--control-radius)] bg-background">
            <InputGroupInput
              id={passwordId}
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={storedHash ? "" : "Choose a password"}
              aria-invalid={!!error}
              autoFocus
              className="h-full px-4 text-[0.875rem] md:text-[0.875rem]"
            />
            <InputGroupAddon align="inline-end" className="pr-2">
              <InputGroupButton
                className="h-8 px-2 text-[0.875rem] font-normal text-muted-foreground hover:text-foreground"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>

          {error && <FieldError>{error}</FieldError>}

          <Button
            type="submit"
            className="mt-3 h-14 w-full rounded-[var(--control-radius)] text-[0.875rem]"
          >
            {storedHash ? "Continue" : "Set password"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default PasswordGate;
