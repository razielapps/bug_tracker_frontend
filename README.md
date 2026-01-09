

# OBT🚀 OurBugTracker - Fullstack Issue & Project Management System

A secure, modern **fullstack issue and project management system** designed for real-world team collaboration, clarity, and control.
Built with a **security-first mindset**, clean architecture, and scalable patterns suitable for production environments.

---

## 🧠 Overview

This system enables teams to:

* Organize work into **projects**
* Track **issues/bugs** per project
* Collaborate through **comments**
* Enforce **strict access control**
* Scale features incrementally without architectural rewrites

The stack is intentionally split into **independent frontend and backend repositories**, allowing each side to evolve independently.

---

## 🔐 Security-First Design

Security is not an afterthought — it is enforced at **multiple layers**:

### Backend

* JWT-based authentication (access + refresh tokens)
* Role-based and object-level permissions
* Project-level access control (only members can act)
* Creator/admin-only project editing
* Centralized permission enforcement (not frontend-trusted)
* Token refresh with replay-safe retry queue
* Explicit denial responses (no silent failures)

### Frontend

* Auth-aware API layer
* Automatic token refresh handling
* Protected routes
* Permission-aware UI (actions hidden when unauthorized)
* Centralized error handling (toast-ready)
* Global request loading indicator (UX + transparency)

---

## ⚙️ Tech Stack

### Backend

* **Django**
* **Django REST Framework**
* JWT Authentication
* PostgreSQL
* Permission-driven ViewSets
* Clean serializer boundaries

### Frontend

* **Next.js (App Router)**
* **TypeScript**
* **Tailwind CSS**
* Axios with interceptors
* Global loading state
* Component-driven architecture

---

## ✅ Current Features

### 🔹 Authentication & Authorization

* Secure login/logout
* Token refresh without user interruption
* Permission-aware endpoints

### 🔹 Projects

* Create projects (staff-only)
* Creator automatically added as member
* Multiple project members supported
* Edit project (creator or admin only)
* View projects you are a member of

### 🔹 Issues / Bugs

* Create issues within a project
* Only project members can create issues
* Filter issues by project, status, priority
* Assign issues to members
* Update issue status

### 🔹 Comments

* Comment on issues
* Real-time UI updates after comment creation
* Comments scoped strictly to issue + project

### 🔹 UX & System Feedback

* Global top-loading progress bar
* Automatic loader on:

  * Route navigation
  * API requests
  * Button-triggered actions
* Centralized API error normalization
* Redirects on permission failures

---

## 🧩 Architecture Highlights

* Backend enforces **truth**, frontend reflects **state**
* No critical logic trusted to the client
* Serializer context used for controlled object creation
* ViewSets scoped by authenticated user
* API layer prepared for toast-based feedback
* Clear separation of concerns across layers

---

## 🛣️ Upcoming Features (Roadmap)

### 🔜 Project Management

* Project member management UI
* Invite/remove members
* Member roles per project

### 🔜 User Dashboard

* User profile page
* List of projects per user
* Assigned issues view

### 🔜 Collaboration & UX

* Toast notifications (success/error/info)
* Optimistic UI updates
* Activity timeline per project

### 🔜 Security & Ops

* Audit logs
* Rate limiting
* Admin moderation panel
* Deployment hardening

### 🔜 Quality & Scale

* Pagination everywhere
* Search improvements
* Test coverage expansion
* CI/CD pipelines

---

## 🧪 Status

🟢 **Actively developed**
🟢 **Production-oriented architecture**
🟡 **Feature-complete MVP, expanding iteratively**

---

## 📬 Contact

* **X / Medium / LinkedIn**: `cyborg0720`
* **Email**: `avtxconscience@gmail.com`

---

## 🧠 Philosophy

This system is built with the belief that:

> *Clarity beats cleverness, security beats shortcuts, and architecture should scale with understanding.*

Contributions, discussions, and reviews are welcome.

