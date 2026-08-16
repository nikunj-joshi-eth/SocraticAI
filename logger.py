import sys
import json
import time
import logging
from typing import Dict, Any, Optional

class StructuredJSONFormatter(logging.Formatter):
    """
    Formats Python log records as single-line JSON objects to stdout.
    GCP Cloud Logging automatically parses stdout JSON logs into structured BigQuery logs.
    """
    def format(self, record: logging.LogRecord) -> str:
        log_entry: Dict[str, Any] = {
            "timestamp": self.formatTime(record, self.datefmt),
            "severity": record.levelname,
            "message": record.getMessage(),
            "logger": record.name,
        }

        # Include custom metric fields if passed via extra={}
        if hasattr(record, "job_id"):
            log_entry["job_id"] = record.job_id
        if hasattr(record, "latency_ms"):
            log_entry["latency_ms"] = record.latency_ms
        if hasattr(record, "input_tokens"):
            log_entry["input_tokens"] = record.input_tokens
        if hasattr(record, "output_tokens"):
            log_entry["output_tokens"] = record.output_tokens
        if hasattr(record, "total_tokens"):
            log_entry["total_tokens"] = record.total_tokens
        if hasattr(record, "subject"):
            log_entry["subject"] = record.subject
        if hasattr(record, "status"):
            log_entry["status"] = record.status

        return json.dumps(log_entry)

def setup_logger(name: str = "jee_doubt_ai") -> logging.Logger:
    logger = logging.getLogger(name)
    logger.setLevel(logging.INFO)

    if not logger.handlers:
        handler = logging.StreamHandler(sys.stdout)
        handler.setFormatter(StructuredJSONFormatter())
        logger.addHandler(handler)

    return logger

logger = setup_logger()

def log_ai_execution(
    job_id: str,
    latency_ms: float,
    input_tokens: int,
    output_tokens: int,
    subject: str,
    status: str = "SUCCESS"
):
    """Helper to emit structured log for GCP Cloud Logging -> BigQuery export."""
    total_tokens = input_tokens + output_tokens
    logger.info(
        f"AI Inference completed for job {job_id} in {latency_ms:.2f}ms",
        extra={
            "job_id": job_id,
            "latency_ms": round(latency_ms, 2),
            "input_tokens": input_tokens,
            "output_tokens": output_tokens,
            "total_tokens": total_tokens,
            "subject": subject,
            "status": status,
        }
    )

if __name__ == "__main__":
    print("=== Testing Structured JSON Logger ===")
    log_ai_execution(
        job_id="JOB_TEST_12345",
        latency_ms=1240.5,
        input_tokens=450,
        output_tokens=320,
        subject="Physics",
        status="SUCCESS"
    )
