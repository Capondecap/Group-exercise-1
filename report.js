const express = require("express");
const multiparty = require("multiparty");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

let reports = [];

// Ensure upload directory exists
const uploadDir = path.join(__dirname, "public/uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ==========================
// GET Report Form
// ==========================
router.get("/report", (req, res) => {
  res.render("report");
});

// ==========================
// POST Upload
// ==========================
router.post("/report", (req, res) => {

  const form = new multiparty.Form({
    uploadDir: uploadDir,
    maxFilesSize: 5 * 1024 * 1024
  });

  form.parse(req, (err, fields, files) => {

    if (err) {
      return res.redirect("/report");
    }

    const name = fields.name?.[0]?.trim();
    const description = fields.description?.[0]?.trim();
    const location = fields.location?.[0]?.trim();
    const date = fields.date?.[0]?.trim();
    const contact = fields.contact?.[0]?.trim();
    const imageFile = files.image?.[0];

    // 🔐 Strict backend validation
    if (!name || !description || !location || !date || !contact || !imageFile) {

      // remove uploaded temp file if exists
      if (imageFile?.path && fs.existsSync(imageFile.path)) {
        fs.unlinkSync(imageFile.path);
      }

      return res.redirect("/report");
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(imageFile.headers["content-type"])) {

      fs.unlinkSync(imageFile.path);
      return res.redirect("/report");
    }

    const extension = path.extname(imageFile.originalFilename);
    const newFileName = uuidv4() + extension;
    const newPath = path.join(uploadDir, newFileName);

    fs.renameSync(imageFile.path, newPath);

    const newReport = {
      id: uuidv4(),
      name,
      description,
      location,
      date,
      contact,
      imagePath: "/uploads/" + newFileName,
      status: "Lost"
    };

    reports.push(newReport);

    res.redirect("/dashboard");
  });
});

// ==========================
// Dashboard
// ==========================
router.get("/dashboard", (req, res) => {
  res.render("dashboard", { reports });
});

// ==========================
// Detail Page
// ==========================
router.get("/items/:id", (req, res) => {
  const item = reports.find(r => r.id === req.params.id);
  if (!item) return res.redirect("/dashboard");

  res.render("detail", { item });
});

// ==========================
// Update Status
// ==========================
router.post("/items/:id/status", (req, res) => {
  const item = reports.find(r => r.id === req.params.id);
  if (!item) return res.redirect("/dashboard");

  const { status } = req.body;

  if (["Lost", "Found", "Closed"].includes(status)) {
    item.status = status;
  }

  res.redirect("/items/" + item.id);
});

// ==========================
// Delete Report
// ==========================
router.post("/items/:id/delete", (req, res) => {
  reports = reports.filter(r => r.id !== req.params.id);
  res.redirect("/dashboard");
});

module.exports = router;