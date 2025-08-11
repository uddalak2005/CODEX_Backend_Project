# CODEX_Backend_Peroject


---

### 📘 API Routes

> **Base URL**: `https://codex-website-backend.onrender.com/api/v1`

---

#### 👤 User Routes

| Method | Endpoint        | Description         | Auth Required | Admin Only |
| ------ | --------------- | ------------------- | ------------- | ---------- |
| POST   | `/users/signUp` | Register a new user | ❌             | ❌          |
| POST   | `/users/login`  | Login a user        | ❌             | ❌          |
| POST   | `/users/logout` | Logout user         | ✅             | ❌          |

---

#### 📅 Event Routes

| Method | Endpoint      | Description        | Auth Required | Admin Only |
| ------ | ------------- | ------------------ | ------------- | ---------- |
| GET    | `/events`     | Get all events     | ❌             | ❌          |
| GET    | `/events/:id` | Get a single event | ❌             | ❌          |
| POST   | `/events`     | Create new event   | ✅             | ✅          |
| PATCH  | `/events/:id` | Edit event details | ✅             | ✅          |
| DELETE | `/events/:id` | Delete event       | ✅             | ✅          |

---

#### 📝 Registration Routes

| Method | Endpoint                            | Description                       | Auth Required | Admin Only |
| ------ | ----------------------------------- | --------------------------------- | ------------- | ---------- |
| POST   | `/registers/registerUser/:id`       | Register user for event           | ✅             | ❌          |
| PATCH  | `/registers/cancelRegistration/:id` | Cancel registration               | ✅             | ❌          |
| GET    | `/registers/getRegistrations/:id`   | Get registrations for event       | ✅             | ✅          |
| PATCH  | `/registers/updateStatus`           | Bulk update registration statuses | ✅             | ✅          |
| DELETE | `/registers/deleteRegistrations`    | Bulk delete registrations         | ✅             | ✅          |

---

#### 📢 Announcement Routes

| Method | Endpoint             | Description               | Auth Required | Admin Only |
| ------ | -------------------- | ------------------------- | ------------- | ---------- |
| POST   | `/announcements`     | Create a new announcement | ✅             | ✅          |
| PATCH  | `/announcements/:id` | Edit an announcement      | ✅             | ✅          |
| GET    | `/announcements`     | Get all announcements     | ✅             | ✅          |
| GET    | `/announcements/:id` | Get a single announcement | ✅             | ✅          |
| DELETE | `/announcements/:id` | Delete an announcement    | ✅             | ✅          |

---

#### 👥 Managed User Routes

| Method | Endpoint            | Description            | Auth Required | Admin Only |
| ------ | ------------------- | ---------------------- | ------------- | ---------- |
| POST   | `/managedUsers`     | Create managed user    | ✅             | ✅          |
| GET    | `/managedUsers/:id` | Get managed user by ID | ✅             | ✅          |
| GET    | `/managedUsers`     | Get all managed users  | ✅             | ✅          |
| DELETE | `/managedUsers/:id` | Delete managed user    | ✅             | ✅          |

---

#### 🖥️ Project Showcase Routes
| Method | Endpoint            | Description            | Auth Required | Admin Only |
| ------ | ------------------- | ---------------------- | ------------- | ---------- |
| POST   | `/projects/`     | Create a project    | ✅             | ✅          |
| GET    | `/projects/:id` | Get a project by ID | ✅             | ✅          |
| GET    | `/projects`     | Get all projects  | ✅             | ✅          |
| DELETE | `/projects/:id` | Delete a project by ID   | ✅             | ✅          |
