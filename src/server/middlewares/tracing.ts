import { v4 } from 'uuid';

enum headers {
  REQUEST_ID = 'X-Request-ID',
  CORRELATION_ID = 'X-Correlation-ID',
}

const tracing = (req, res, next) => {
  const requestId = v4();
  const correlationId = req.get(headers.CORRELATION_ID) || v4();

  res.requestId = requestId;
  res.correlationId = correlationId;
  res.set(headers.REQUEST_ID, requestId);
  res.set(headers.CORRELATION_ID, correlationId);

  next();
};

export default tracing;

