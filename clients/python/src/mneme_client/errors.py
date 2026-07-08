from __future__ import annotations


class MnemeError(Exception):
    """Raised when a Mneme gRPC call fails. Wraps grpc.RpcError without
    requiring callers to import grpc."""

    def __init__(self, code: str, details: str):
        super().__init__(f"{code}: {details}")
        self.code = code
        self.details = details

    @classmethod
    def from_rpc_error(cls, err) -> "MnemeError":
        code = getattr(err.code(), "name", "UNKNOWN") if hasattr(err, "code") else "UNKNOWN"
        details = err.details() if hasattr(err, "details") else str(err)
        return cls(code, details)
