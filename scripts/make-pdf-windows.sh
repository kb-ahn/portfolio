
#!/usr/bin/env bash
# Windows Git Bash용 PDF 생성 스크립트
# 사용: scripts/make-pdf-windows.sh <출력경로.pdf> [phone]
set -e
cd "$(dirname "$0")/.."

OUT=${1:-deliverables/portfolio.pdf}
mkdir -p "$(dirname "$OUT")"

# Chrome 경로 확인
CHROME="/c/Program Files/Google/Chrome/Application/chrome.exe"
if [[ ! -f "$CHROME" ]]; then CHROME="/c/Program Files (x86)/Google/Chrome/Application/chrome.exe"; fi
if [[ ! -f "$CHROME" ]]; then echo "ERROR: Chrome을 찾을 수 없습니다."; exit 1; fi

# 포트 3124를 사용하는 프로세스만 종료
kill_port() {
  PID=$(netstat -ano | grep ':3124' | grep 'LISTENING' | awk '{print $NF}' | sort -u || true)
  if [[ -n "$PID" ]]; then
    for p in $PID; do taskkill.exe //F //PID "$p" >/dev/null 2>&1 || true; done
  fi
}
kill_port

# Next.js 빌드
echo "Next.js 빌드 시작..."
if [[ "$1" == "phone" ]]; then SHOW_PHONE=1 npx next build; else npx next build; fi

# Next.js 서버 실행
echo "PDF 생성용 서버 시작..."
(npx next start -p 3124 >/dev/null 2>&1 &)

# 서버 실행 대기
READY=0
for i in $(seq 1 30); do
  if curl -fsS http://localhost:3124/deck >/dev/null 2>&1; then READY=1; break; fi
  sleep 1
done

if [[ "$READY" != "1" ]]; then
  echo "ERROR: Next.js 서버 실행 실패"
  kill_port
  exit 1
fi

# PDF 생성
echo "PDF 생성 시작..."

TEMP_OUT="$(pwd -W)/deliverables/portfolio_temp.pdf"

"$CHROME" --headless=new --disable-gpu --no-pdf-header-footer --run-all-compositor-stages-before-draw --virtual-time-budget=10000 --print-to-pdf="$TEMP_OUT" http://localhost:3124/deck

# PDF 생성 여부 확인
if [[ -f "deliverables/portfolio_temp.pdf" && -s "deliverables/portfolio_temp.pdf" ]]; then
  mv -f "deliverables/portfolio_temp.pdf" "$OUT"
  echo ""
  echo "PDF 생성 성공!"
  echo "파일 경로: $OUT"
  ls -lh "$OUT"
else
  echo "ERROR: PDF 파일 생성 실패"
  kill_port
  exit 1
fi

# PDF 생성용 서버 종료
kill_port
echo "PDF 생성용 서버 종료 완료"