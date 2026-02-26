# Group-exercise-1

# Task: Building the "Lost & Found" Central Registry

## 1. Technical Stack & Constraints (20pts)

- **Engine:** Node.js + Express.js.
- **View Engine:** Handlebars (`hbs` or `express-handlebars`).
    - *Requirement:* Must use a `main.hbs`layout with `header` and `footer` partials.
- **Security:** Middleware to disable `x-powered-by`.
- **Persistence:** In-memory storage (Global Array).
- **File Handling:** Implement `multiparty`to handle item image uploads to a `/public/uploads` directory.

## 2. Required Pages & Routing (15pts)

### 📄 Page 1: The Report Form (`GET /report`) (5pts)

- **Inputs:** Item Name, Description, Location Lost, Date, Contact Email.
- **File Upload:** A file input for the item image (Required).
- **Submission (`POST /report`):** Validate that all fields are present.
    - Save the image and push the new object to the array with an initial status of `Lost`.

### 📄 Page 2: The Dashboard (`GET /dashboard`) (5pts)

- **Table View:** Display a list of all reports (ID, Name, Date, Status).
- **Navigation:** Each row must have a "View Details" link leading to the specific item page.

### 📄 Page 3: Item Detail View (`GET /items/:id`) (5pts)

- **Full Display:** Show all data fields, including the full-sized uploaded image.
- **Status Management:** Buttons/Forms to trigger a status change (e.g., `POST /items/:id/status`).
    - Options: `Lost`, `Found`, `Closed`.
- **Deletion:** A "Delete Report" button (e.g., `POST /items/:id/delete`) to remove the item from the array and redirect to the dashboard.

---

## 3. Data Schema (The "Report" Object) (5pts)

Ensure your objects follow this structure:

```json
{
  id: "unique_string",      // Use Date.now() or a UUID
  name: "Blue Wallet",
  description: "Leather wallet with student ID",
  location: "Library Hall B",
  date: "2023-10-25",
  contact: "student@univ.edu",
  imagePath: "/uploads/filename.jpg",
  status: "Lost"           // Default: Lost. Others: Found, Closed.
}
```

## 4. Security & Best Practices (10pts)

- **Backend Validation:** If a form is submitted incomplete, do not save it. Redirect back to `/report`
- **Static Files:** Ensure your `/public` folder is correctly served so images render in the browser.
- **Git Strategy:** Work in branches! (e.g., `feature/upload`, `feature/dashboard`, `feature/details`).

---

## 🎯 Sprint Milestones (90-Minute Guide)

- **00:00 - 00:15:** Project Init & Handlebars Layout/Partials setup.
- **00:15 - 00:40:** **Sprint A:** Implement Form + Mutiparty Upload + In-memory Array storage.
- **00:40 - 01:05:** **Sprint B:** Build Dashboard Table and URL Parameter route (`/items/:id`).
- **01:05 - 01:20:** **Sprint C:** Add Status Update logic and Delete functionality.
- **01:20 - 01:30:** Final UI Polish & PR Merges.



src/
 ├── pages/
 │     ├── Dashboard.jsx
 │     ├── Detail.jsx
 ├── components/
 │     ├── UploadForm.jsx
 ├── services/
 │     ├── api.js
 ├── App.jsx
