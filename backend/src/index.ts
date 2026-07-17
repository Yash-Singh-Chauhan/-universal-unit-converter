import app from "./app.js";

const PORT = Number.parseInt(process.env.PORT ?? "3001", 10);

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`💱 Currency API: http://localhost:${PORT}/api/currency/convert`);
});
