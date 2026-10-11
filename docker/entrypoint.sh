#!/bin/sh
set -eu

# JSON-encode a value so it can sit inside a double-quoted JS string.
json_string() {
  printf '%s' "$1" | awk 'BEGIN { ORS = "" }
  {
    gsub(/\\/, "\\\\")
    gsub(/"/, "\\\"")
    gsub(/\r/, "\\r")
    if (NR > 1) printf "\\n"
    printf "%s", $0
  }'
}

url=$(json_string "${VITE_SUPABASE_URL:-}")
key=$(json_string "${VITE_SUPABASE_PUBLISHABLE_KEY:-}")

printf 'window.__ENV__={"VITE_SUPABASE_URL":"%s","VITE_SUPABASE_PUBLISHABLE_KEY":"%s"};\n' \
  "$url" "$key" > /usr/share/nginx/html/config.js

exec nginx -g 'daemon off;'
