import app from "./src/app";

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log();
  console.log(`Escutando na porta ${PORT}`);
  console.log(`Use a URL: http://localhost:${PORT}`);
});
