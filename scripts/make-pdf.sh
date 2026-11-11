#!/bin/zsh
# 웹 /deck 페이지를 Chrome headless로 인쇄해 PDF 생성
# 사용: scripts/make-pdf.sh <출력경로.pdf> [phone]   (phone 지정 시 전화번호 포함 빌드)
set -e
cd "$(dirname "$0")/.."
OUT=${1:-deliverables/portfolio.pdf}
pkill -f "next start -p 3124" 2>/dev/null || true
if [[ "$2" == "phone" ]]; then SHOW_PHONE=1 npx next build >/dev/null; else npx next build >/dev/null; fi
(npx next start -p 3124 >/dev/null 2>&1 &)
for i in {1..30}; do curl -s localhost:3124/deck >/dev/null && break; sleep 0.5; done
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --no-pdf-header-footer \
  --run-all-compositor-stages-before-draw --virtual-time-budget=10000 --print-to-pdf="$OUT" http://localhost:3124/deck 2>/dev/null
echo "PDF -> $OUT"
