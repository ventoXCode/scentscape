#!/bin/bash

# ScentScape Ralph Loop — UI/UX Research & Build
# Usage:
#   ./loop.sh plan          — Run planning mode (gap analysis, no implementation)
#   ./loop.sh [N]           — Run build mode for N iterations (default: 10)
#   ./loop.sh plan [N]      — Run planning mode for N iterations (default: 3)

MODE="build"
MAX_ITERATIONS=10
ITERATION=0

# Parse arguments
if [[ "${1:-}" == "plan" ]]; then
    MODE="plan"
    MAX_ITERATIONS="${2:-3}"
elif [[ "${1:-}" =~ ^[0-9]+$ ]]; then
    MAX_ITERATIONS="$1"
fi

PROMPT_FILE="PROMPT_${MODE}.md"

if [[ ! -f "$PROMPT_FILE" ]]; then
    echo "Error: $PROMPT_FILE not found in $(pwd)"
    exit 1
fi

echo "============================================"
echo "  ScentScape Ralph Loop"
echo "  Mode: $MODE"
echo "  Max iterations: $MAX_ITERATIONS"
echo "  Prompt: $PROMPT_FILE"
echo "============================================"
echo ""

while [[ $ITERATION -lt $MAX_ITERATIONS ]]; do
    ITERATION=$((ITERATION + 1))
    LOG_FILE="loop_${MODE}_${ITERATION}.log"

    echo ""
    echo "--------------------------------------------"
    echo "  Iteration $ITERATION / $MAX_ITERATIONS"
    echo "  $(date '+%Y-%m-%d %H:%M:%S')"
    echo "--------------------------------------------"
    echo ""

    # Feed the prompt to Claude in headless mode
    # Use --output-format text and redirect to log file
    claude -p \
        --dangerously-skip-permissions \
        --model opus \
        --output-format text \
        < "$PROMPT_FILE" \
        > "$LOG_FILE" 2>&1

    EXIT_CODE=$?

    # Show tail of what was produced
    echo "[Ralph] Log written to $LOG_FILE ($(wc -l < "$LOG_FILE" | tr -d ' ') lines)"
    echo "[Ralph] Last 5 lines:"
    tail -5 "$LOG_FILE"

    if [[ $EXIT_CODE -ne 0 ]]; then
        echo ""
        echo "[Ralph] WARNING: Iteration $ITERATION exited with code $EXIT_CODE"
        echo "[Ralph] Pausing 5 seconds before next iteration..."
        sleep 5
    fi

    # Push after each iteration if in build mode
    if [[ "$MODE" == "build" ]]; then
        git push 2>/dev/null || true
    fi

    echo ""
    echo "[Ralph] Iteration $ITERATION complete."
    echo ""
done

echo "============================================"
echo "  Ralph Loop complete"
echo "  Mode: $MODE"
echo "  Iterations: $ITERATION / $MAX_ITERATIONS"
echo "  $(date '+%Y-%m-%d %H:%M:%S')"
echo "============================================"
