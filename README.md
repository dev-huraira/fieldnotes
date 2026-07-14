# Fieldnotes 📓

A clean, modern note management system inspired by physical field notebooks (the kind carried by researchers, explorers, and journalists), built as an elegant web application. 

Instead of a generic AI-notes UI with drop-shadow grids and corporate purple sidebars, **Fieldnotes** features a warm, editorial, and minimalist writing environment. It provides a quiet space for your thoughts, logs, and research notes.

---

## 🎨 Visual & Design Identity

- **Harmonious Palette:** 
  - Soft warm paper background (`#FAF8F4`)
  - Deep charcoal text (`#242423`)
  - Muted forest-green accent for primary actions and active selections (`#4A6C5A`)
  - Dusty coral highlight for categorizations and tag markers (`#D98E73`)
- **Editorial Typography:**
  - Clean humanist sans-serif font (**Inter** / **Manrope**) for functional UI chrome, search bar, and controls.
  - Warm literary serif font (**Lora** / **Source Serif 4**) for note titles and body editing to make typing feel like writing on physical stationery.
- **Minimal Layout Signature:**
  - A responsive two-pane dashboard. A slim left sidebar displaying search, note entries, and profile actions, and a large right-hand writing pane.
  - Note list items use a quiet left-border accent rather than harsh gridlines or boxes.
  - Subtle hover lift effects on cards and a micro-fade-in transition for the note list.

---

## ✨ Features

- **JWT-Based Authentication:** Protected user accounts (registration & login) to ensure notes are private and securely scoped to the logged-in user.
- **Robust Autosave:** Zero manual saving required. The editor automatically debounces your changes (1 second delay) and updates MongoDB in the background. A quiet state indicator displays `Saving...` or `Saved` at the top of the page.
- **Real-Time Search:** Filter notes by title, body content, or tags instantly as you type in the search bar.
- **Categorization Tags:** Add tags in the editor by typing tag names and pressing `Enter`. Tags display in dusty coral and are fully searchable.
- **Responsive Layout:** Sidebar collapses into a slide-over drawer on tablets and mobile screens, accessible via a top navigation menu icon.

---

## 📁 Repository Structure

### Backend Service ([fieldnotes-backend](file:///c:/work/Fieldnotes/fieldnotes-backend))
- [`server.js`](file:///c:/work/Fieldnotes/fieldnotes-backend/server.js) — Main Express app entrypoint
- [`config/db.js`](file:///c:/work/Fieldnotes/fieldnotes-backend/config/db.js) — Mongoose database connector
- [`models/User.js`](file:///c:/work/Fieldnotes/fieldnotes-backend/models/User.js) — Mongoose schema for User auth
- [`models/Note.js`](file:///c:/work/Fieldnotes/fieldnotes-backend/models/Note.js) — Mongoose schema for Notes
- [`middleware/auth.js`](file:///c:/work/Fieldnotes/fieldnotes-backend/middleware/auth.js) — JWT protecting middleware
- [`routes/auth.js`](file:///c:/work/Fieldnotes/fieldnotes-backend/routes/auth.js) — Auth router endpoints
- [`routes/notes.js`](file:///c:/work/Fieldnotes/fieldnotes-backend/routes/notes.js) — Notes CRUD routes
- [`.env.example`](file:///c:/work/Fieldnotes/fieldnotes-backend/.env.example) — Config file template

### Frontend Client ([fieldnotes-frontend](file:///c:/work/Fieldnotes/fieldnotes-frontend))
- [`index.html`](file:///c:/work/Fieldnotes/fieldnotes-frontend/index.html) — Vite entry HTML file
- [`tailwind.config.js`](file:///c:/work/Fieldnotes/fieldnotes-frontend/tailwind.config.js) — Custom theme & layouts config
- [`postcss.config.js`](file:///c:/work/Fieldnotes/fieldnotes-frontend/postcss.config.js) — PostCSS build configs
- [`src/main.jsx`](file:///c:/work/Fieldnotes/fieldnotes-frontend/src/main.jsx) — React application entrypoint
- [`src/index.css`](file:///c:/work/Fieldnotes/fieldnotes-frontend/src/index.css) — Custom global stylesheet
- [`src/utils/api.js`](file:///c:/work/Fieldnotes/fieldnotes-frontend/src/utils/api.js) — Global Axios client helper
- [`src/context/AuthContext.jsx`](file:///c:/work/Fieldnotes/fieldnotes-frontend/src/context/AuthContext.jsx) — Session authorization provider
- [`src/components/ConfirmModal.jsx`](file:///c:/work/Fieldnotes/fieldnotes-frontend/src/components/ConfirmModal.jsx) — Delete confirmation modal
- [`src/components/AuthPage.jsx`](file:///c:/work/Fieldnotes/fieldnotes-frontend/src/components/AuthPage.jsx) — Minimal auth interface
- [`src/components/Sidebar.jsx`](file:///c:/work/Fieldnotes/fieldnotes-frontend/src/components/Sidebar.jsx) — Real-time searchable sidebar
- [`src/components/NoteEditor.jsx`](file:///c:/work/Fieldnotes/fieldnotes-frontend/src/components/NoteEditor.jsx) — Rich writing pad component
- [`src/App.jsx`](file:///c:/work/Fieldnotes/fieldnotes-frontend/src/App.jsx) — Core UI coordinator
- [`.env.example`](file:///c:/work/Fieldnotes/fieldnotes-frontend/.env.example) — Config file template

---

## 🚀 Setup & Execution Guide

Follow these steps to run the application on a new machine.

### Prerequisites
Make sure you have the following installed on your machine:
- **Node.js** (v16.0.0 or higher recommended)
- **npm** (comes packaged with Node.js)
- **MongoDB** (Ensure you have a MongoDB instance running locally on your default port `27017` or use a MongoDB Atlas cloud URI)

---

### Step 1: Backend API Setup

1. Open your terminal (e.g. Windows Command Prompt `cmd`, PowerShell, or Bash) and navigate to the backend directory:
   ```bash
   cd fieldnotes-backend
   ```

2. Install backend package dependencies:
   ```bash
   npm install
   ```

3. Create your `.env` configuration file from the template:
   * **Windows Command Prompt (cmd):**
     ```cmd
     copy .env.example .env
     ```
   * **Windows PowerShell:**
     ```powershell
     Copy-Item .env.example .env
     ```
   * **Mac / Linux / Git Bash:**
     ```bash
     cp .env.example .env
     ```

4. *(Optional)* Open the newly created `.env` file to customize settings if your database URI is different:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/fieldnotes
   JWT_SECRET=your_fallback_super_secret_key_12345
   NODE_ENV=development
   ```

5. Run the backend development server:
   ```bash
   npm run dev
   ```
   *You should see a message indicating the server is running on port `5000` and `MongoDB Connected: ...`.*

---

### Step 2: Frontend Setup

1. Open a **second terminal window** or tab, and navigate to the frontend directory:
   ```bash
   cd fieldnotes-frontend
   ```

2. Install the client packages:
   ```bash
   npm install
   ```

3. Create your client `.env` configuration file:
   * **Windows Command Prompt (cmd):**
     ```cmd
     copy .env.example .env
     ```
   * **Windows PowerShell:**
     ```powershell
     Copy-Item .env.example .env
     ```
   * **Mac / Linux / Git Bash:**
     ```bash
     cp .env.example .env
     ```

4. *(Optional)* If your backend is running on a different port, update the `VITE_API_URL` variable in `.env`:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

5. Start the frontend developer server:
   ```bash
   npm run dev
   ```
   *By default, the Vite dev server runs at `http://localhost:5173`.*

---

### Step 3: Verification & Walkthrough

1. Open your web browser and go to `http://localhost:5173`.
2. Register a new test user account by toggling to the sign up form.
3. Once logged in, click **Write your first note** or the **New note** button in the left sidebar to create an empty page.
4. Start typing your note title and content. Look for the status indicator at the top:
   - It will display **Saving...** while you type.
   - It will update to **Saved** about 1 second after you stop typing.
5. Create categorizations by adding tags:
   - Type a keyword into the **Add tag...** field next to the tag icon and press `Enter` or `,`.
   - Tags will immediately register as dusty coral badges in the note. Click the tiny `x` inside a tag to delete it.
6. Type in the **Search notes...** input to filter your notebook list in real-time.
7. Click the **Delete** button to remove a note. A confirmation modal will prompt you to verify the deletion.
8. Log out or refresh your browser to verify that your notes list is successfully fetched and persisted in MongoDB.
