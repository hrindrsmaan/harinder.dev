import { useState, useRef, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { Play, RotateCcw } from "lucide-react";
import "./JSCompiler.css";

const JSCompiler = () => {
  useEffect(() => {
    document.title = "JavaScript Online Compiler - Harinder.dev";
  }, []);

  const [code, setCode] = useState<string>(
    '// Write your JavaScript code here\nconsole.log("Hello, World!");'
  );
  const [output, setOutput] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const runCode = () => {
    setIsRunning(true);
    setOutput(output || "");
    setError("");

    try {
      // Clear previous content
      if (iframeRef.current) {
        iframeRef.current.srcdoc = `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body { font-family: monospace; padding: 10px; background: #ffffff; color: #0d0d0d; }
                .console-output { white-space: pre-wrap; }
              </style>
            </head>
            <body>
              <div class="console-output" id="console"></div>
            </body>
          </html>
        `;

        iframeRef.current.onload = () => {
          try {
            const iframeDoc =
              iframeRef.current?.contentDocument ||
              iframeRef.current?.contentWindow?.document;

            const userCode = `
              (function() {
                // Override console methods
                console.log = function(...args) {
                  const outputElement = document.getElementById('console');
                  if (outputElement) {
                    outputElement.innerHTML += args.map(arg => {
                      if (typeof arg === 'object') {
                        return JSON.stringify(arg, null, 2);
                      }
                      return String(arg);
                    }).join(' ') + '\\n';
                  }
                };

                console.error = function(...args) {
                  const outputElement = document.getElementById('console');
                  if (outputElement) {
                    outputElement.innerHTML += '<span style="color: #cc0000;">ERROR: </span>' + args.map(arg => {
                      if (typeof arg === 'object') {
                        return JSON.stringify(arg, null, 2);
                      }
                      return String(arg);
                    }).join(' ') + '\\n';
                  }
                };

                console.warn = function(...args) {
                  const outputElement = document.getElementById('console');
                  if (outputElement) {
                    outputElement.innerHTML += '<span style="color: #b45309;">WARN: </span>' + args.map(arg => {
                      if (typeof arg === 'object') {
                        return JSON.stringify(arg, null, 2);
                      }
                      return String(arg);
                    }).join(' ') + '\\n';
                  }
                };

                console.info = function(...args) {
                  const outputElement = document.getElementById('console');
                  if (outputElement) {
                    outputElement.innerHTML += '<span style="color: #0369a1;">INFO: </span>' + args.map(arg => {
                      if (typeof arg === 'object') {
                        return JSON.stringify(arg, null, 2);
                      }
                      return String(arg);
                    }).join(' ') + '\\n';
                  }
                };

                // User code starts here
                ${code}
                // User code ends here
              })();
            `;

            const script = iframeDoc?.createElement("script");
            if (script && iframeDoc?.body) {
              script.setAttribute("type", "text/javascript");
              script.textContent = userCode;
              iframeDoc.body.appendChild(script);
            }

            setIsRunning(false);
          } catch (iframeError) {
            setError(
              "Failed to execute code in sandbox: " +
                (iframeError as Error).message
            );
            setIsRunning(false);
          }
        };
      }
    } catch (err) {
      setError("Execution error: " + (err as Error).message);
      setIsRunning(false);
    }
  };

  const clearOutput = () => {
    setOutput("");
    setError("");
    if (iframeRef.current) {
      iframeRef.current.srcdoc = `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: monospace; padding: 10px; background: #ffffff; color: #0d0d0d; }
              .console-output { white-space: pre-wrap; }
            </style>
          </head>
          <body>
            <div class="console-output" id="console"></div>
          </body>
        </html>
      `;
    }
  };

  return (
    <section id="js-compiler" className="js-compiler-section">
      <div className="compiler-container">
        <h1 className="compiler-title">JavaScript Online Compiler</h1>
        <p className="compiler-description">
          Write and run JavaScript code directly in your browser. Perfect for
          testing snippets, learning, or quick prototyping.
        </p>

        <div className="compiler-controls">
          <button
            onClick={runCode}
            disabled={isRunning}
            className={`run-button ${isRunning ? "running" : ""}`}
          >
            <Play size={16} />
            {isRunning ? "Running..." : "Run Code"}
          </button>
          <button
            onClick={clearOutput}
            disabled={isRunning}
            className="clear-button"
          >
            <RotateCcw size={16} />
            Clear Output
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="compiler-layout">
          <div className="editor-container">
            <Editor
              height="100%"
              language="javascript"
              value={code}
              onChange={(value) => setCode(value || "")}
              theme="vs"
            />
          </div>

          <div className="output-container">
            <div className="output-header">Output</div>
            <iframe
              ref={iframeRef}
              className="output-iframe"
              title="JavaScript Output"
              sandbox="allow-scripts allow-same-origin"
              srcDoc={`
                <!DOCTYPE html>
                <html>
                  <head>
                    <style>
                      body { font-family: monospace; padding: 10px; background: #ffffff; color: #0d0d0d; margin: 0; }
                      .console-output { white-space: pre-wrap; font-size: 14px; line-height: 1.4; }
                    </style>
                  </head>
                  <body>
                    <div class="console-output" id="console">Output will appear here...</div>
                  </body>
                </html>
              `}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default JSCompiler;
