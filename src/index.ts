import app from "./infrastructure/app";

const PORT = process.env.PORT || 3434;

app.listen(PORT, async () => {
  console.log("Running on port " + PORT);
});
