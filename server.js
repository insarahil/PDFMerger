const express = require("express");
const multer = require("multer");
const { MergePDF } = require("./merage");
const upload = multer({ dest: "uploads/" });

const app = express();
const path = require("path");
const port = 3000;

app.use("/static", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "templetes/index.html"));
});

app.post("/merge", upload.array("pdfs", 2), async (req, res, next) => {
  await MergePDF(
    path.join(__dirname, req.files[0].path),
    path.join(__dirname, req.files[1].path)
  );
  res.redirect(`http://localhost:3000/static/merged.pdf`);
});

app.listen(port, () => {
  console.log(`Example app listening on port on http://localhost:${port}`);
});
