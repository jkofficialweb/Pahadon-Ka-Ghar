#!/usr/bin/env bash
# Pahadon Ka Ghar - 1-Click Offline Launcher (macOS / Linux)

echo "============================================================"
echo "  PAHADON KA GHAR - LUXURY RESORT & RETREAT (OFFLINE MODE)"
echo "============================================================"
echo ""

# Find offline html path
TARGET_FILE=""
if [ -f "dist/offline.html" ]; then
  TARGET_FILE="dist/offline.html"
elif [ -f "public/offline.html" ]; then
  TARGET_FILE="public/offline.html"
elif [ -f "offline.html" ]; then
  TARGET_FILE="offline.html"
else
  TARGET_FILE="index.html"
fi

# Check if Python is available to launch a local server
if command -v python3 >/dev/null 2>&1; then
  echo "Python 3 detected. Starting local offline server at http://localhost:8080..."
  if command -v open >/dev/null 2>&1; then
    (sleep 1 && open "http://localhost:8080/${TARGET_FILE}") &
  elif command -v xdg-open >/dev/null 2>&1; then
    (sleep 1 && xdg-open "http://localhost:8080/${TARGET_FILE}") &
  fi
  python3 -m http.server 8080
  exit 0
fi

if command -v python >/dev/null 2>&1; then
  echo "Python detected. Starting local offline server at http://localhost:8080..."
  if command -v open >/dev/null 2>&1; then
    (sleep 1 && open "http://localhost:8080/${TARGET_FILE}") &
  elif command -v xdg-open >/dev/null 2>&1; then
    (sleep 1 && xdg-open "http://localhost:8080/${TARGET_FILE}") &
  fi
  python -m http.server 8080
  exit 0
fi

# Fallback: Open file directly via default browser
echo "Opening standalone offline edition directly in browser: ${TARGET_FILE}"
if command -v open >/dev/null 2>&1; then
  open "${TARGET_FILE}"
elif command -v xdg-open >/dev/null 2>&1; then
  xdg-open "${TARGET_FILE}"
else
  echo "Please open ${TARGET_FILE} in your web browser."
fi
