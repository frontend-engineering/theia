#!/bin/bash


cat << EOF

This script first run these scripts in parallel:
1. browser-app watch:compile
2. browser-app watch:bundle
3. browser-app watch:serve

EOF

RESET='\033[0m'
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BOLD='\033[1m'

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

echo -e "${YELLOW}${BOLD}Check concurrently...${RESET}"
if command -v "concurrently" >/dev/null 2>&1; then
  concurrently --version
  echo -e "${GREEN}found concurrently.${RESET}\n"
else
    echo -e "${RED}not found concurrently${RESET}"
    echo -e "${YELLOW}install concurrently -g${RESET}"
    npm install concurrently -g
    echo -e "${GREEN}concurrently installed${RESET}"
fi

echo -e "${YELLOW}${BOLD}Check iterm2-tab-set...${RESET}"
if command -v "tabset" >/dev/null 2>&1; then
    tabset --badge '\(session.path)'
else
    echo -e "${RED}not found iterm2-tab-set${RESET}"
fi

cd $SCRIPT_DIR
cd ..

concurrently --restart-tries -1 --restart-after 10000 -c "auto" \
  -n compile,bundle,serve \
  "yarn -s --cwd examples/browser-app watch:compile" \
  "yarn -s --cwd examples/browser-app watch:bundle" \
  "yarn -s --cwd examples/browser-app watch:serve"
