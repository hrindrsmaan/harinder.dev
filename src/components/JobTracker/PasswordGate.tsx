import { useState, useEffect } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FieldError } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Card } from "@/components/ui/card";

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
    <section className="flex min-h-screen items-center justify-center bg-background pt-20 max-[421px]:px-4 max-[421px]:pt-16">
      <Card className="w-full max-w-[380px] gap-0 bg-secondary p-8 text-center text-(length:--fs-base) max-[421px]:p-6">
        <div className="mx-auto mb-6 flex size-[72px] items-center justify-center border text-foreground max-[421px]:size-14">
          <Lock size={48} />
        </div>
        <h1 className="mb-2 text-[1.5rem] break-words text-foreground max-[421px]:text-[1.25rem]">
          Job Tracker
        </h1>
        <p className="mb-6 text-muted-foreground">Enter password to access</p>

        <form
          onSubmit={storedHash ? handleLogin : handleSetup}
          className="flex flex-col gap-4"
        >
          <InputGroup className="h-11 bg-card">
            <InputGroupInput
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={storedHash ? "Enter password" : "Set a password"}
              aria-label="Password"
              aria-invalid={!!error}
              autoFocus
            />
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                size="icon-xs"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
          {error && <FieldError>{error}</FieldError>}
          <Button
            type="submit"
            variant="outline"
            size="lg"
            className="w-full border-border-strong"
          >
            {storedHash ? "Unlock" : "Set Password"}
          </Button>
        </form>
      </Card>
    </section>
  );
};

export default PasswordGate;
