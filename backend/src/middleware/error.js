export default function errorHandler(err, req, res, next) {
  console.error(err); // Log error for debugging
  res.status(500).json({ error: "Something went wrong", details: err.message });
}
