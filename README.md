## Caliber Frontend (StreamHub)

React + Vite frontend for a video platform with authentication, profile management, dashboard, video upload, video streaming and real-time updates via Socket.IO.

---

## 1. Getting Started

### Prerequisites

- Node.js 18+ (recommended)
- npm (comes with Node)
- Backend API running on `http://localhost:5000` with:
	- Auth endpoints under `/api/auth/...`
	- Video endpoints under `/api/videos` and `/api/videos/user/:userId`
	- Socket.IO server bound to the same origin.

### Install dependencies

```bash
npm install
```

### Run the app (development)

```bash
npm run dev
```

Then open the URL shown in the terminal (usually `http://localhost:5173`).

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

---

## 2. Project Structure

Only the most important frontend folders/files are listed here.

- `src/main.jsx` – Vite/React entry point.
- `src/App.jsx` – Top-level router and route guards.

### Core folders

- `src/api/`
	- `authApi.js` – Login, register, auth check, logout, profile, etc.
	- `videoApi.js` – Upload video, get video by id, get videos by user.
- `src/hooks/`
	- `useAuth.js` – Checks session via backend and exposes `isAuthenticated`.
	- `useDebounce.js` – Generic debounce hook for search and other inputs.
- `src/redux/`
	- `reducers.js` – Combines all slices.
	- `rootSaga.js` – All sagas (auth, profile, videos, logout).
- `src/components/`
	- `UserProfilePopover.jsx` – Reusable avatar hover menu (Profile / Logout).
	- `LogoutLoader.jsx` – Global full-screen loader during logout saga.
	- `AppSidebar.jsx` – Shared left sidebar for dashboard-like pages.

### Feature areas

- `src/authentication/login/` – Login page + Redux slice.
- `src/authentication/register/` – Register page + Redux slice.
- `src/authentication/logout/` – Logout slice used by sagas.
- `src/authentication/dashboard/`
	- `Dashboard.jsx` – Main home/dashboard page.
	- `components/DashboardHeader.jsx` – Top header (logo, search, profile).
	- `components/DashboardTrendingGrid.jsx` – Card grid of videos.
	- `Dashboard.css` – All dashboard and sidebar styles.
- `src/authentication/videoUpload/`
	- `VideoUpload.jsx` – Video upload UI (drag & drop + form).
	- `videoUploadSlice.js` – Upload Redux slice.
	- `VideoUpload.css` – Page styling.
- `src/authentication/videoStream/`
	- `VideoStream.jsx` – Video playback page with custom controls.
	- `VideoStream.css` – Player layout and controls styling.
- `src/authentication/profileDetails/`
	- `ProfileDetails.jsx` – User profile page (details + edit modal).
	- `profileDetailsSlice.js` – Profile + user videos state.
	- `ProfileDetails.css` – Profile layout and styling.

---

## 3. Routing & Auth Flow

Routing is defined in `src/App.jsx`.

- Public routes:
	- `/login` – Login screen.
	- `/register` – Registration screen.
- Private routes (guarded by `useAuth`):
	- `/dashboard` – Main dashboard.
	- `/videoUpload` – Upload page.
	- `/profile` – Profile details page.
	- `/videos/:id` – Single video stream page.

`useAuth` calls `checkAuth` on mount and returns:

- `isAuthenticated` – `true | false | null` (null while loading).
- `loading` – indicates auth check in progress.

`PrivateRoute` and `PublicRoute` in `App.jsx` use this hook to redirect unauthenticated users to `/login` and keep logged-in users away from `/login` / `/register`.

Local storage key:

- `loginUser` – stores user details returned from login for profile and user-video lookups.

---

## 4. Redux & Sagas Overview

Redux Toolkit + redux-saga are used for side effects.

### Slices (high level)

- `loginSlice` – Handles `loginRequest`, `loginSuccess`, `loginFailure`, `logout`.
- `RegisterSlice` – Register flow.
- `logoutSlice` – Tracks logout in-flight/loading state.
- `videoUploadSlice` – Tracks upload request/response and reset state.
- `profileDetailsSlice` – Profile and user videos:
	- `data` – Current profile data.
	- `userVideos` – Videos created by the logged-in user.
	- Loading and error flags for both.

### Sagas

Defined in `src/redux/rootSaga.js`.

- Auth:
	- `handleLogin` – Calls `loginUser`, stores result in Redux and `localStorage`, shows AntD messages.
	- `handleRegister` – Calls `registerUser` and handles common server errors.
	- `handleLogout` – Calls `logoutUser`, clears Redux + `localStorage`, and redirects to `/login`.
- Profile:
	- `handleProfileFetch` – `GET /api/auth/me/{id}` via `getProfileById`.
	- `handleProfileUpdate` – `PATCH /api/auth/profile` via `updateProfile`.
	- `handleProfileUserVideosFetch` – `GET /api/videos/user/{userId}` via `getVideosByUser`.
- Videos:
	- `handleVideoUpload` – `POST /api/videos` via `uploadVideo`.

All sagas show appropriate `message.success` / `message.error` notifications on completion.

---

## 5. Page-by-Page Behavior

### 5.1 Dashboard (`Dashboard.jsx`)

Responsibilities:

- Load initial list of videos via REST:
	- `GET http://localhost:5000/api/videos` on mount.
	- Reverse the list so newest videos appear first.
- Subscribe to real-time updates via Socket.IO:
	- `io('http://localhost:5000')` created once (module-level).
	- On mount:
		- `socket.emit('joinRoom', 'dashboard')` joins a "dashboard" room.
		- Listens for `videoUploaded` events and prepends new videos.
	- On unmount: cleans up listeners.
- Own full video list (`liveVideos`) and search state.

Search behavior:

- `searchTerm` is local state in `Dashboard`.
- `useDebounce(searchTerm, 400)` produces `debouncedSearchTerm`.
- `filteredVideos` is computed with `useMemo` using `debouncedSearchTerm`:
	- Matches against `title`, `description`, and `User.name` (case-insensitive).
- `DashboardHeader` receives:
	- `searchTerm`
	- `onSearchChange` callback
- `DashboardTrendingGrid` receives `filteredVideos` (not the raw list).

Layout:

- Fixed header: `DashboardHeader`.
- Fixed left sidebar: `AppSidebar` (`.dashboard-sider-left` styles).
- Main content area: `dashboard-main` and `dashboard-main-inner`.

### 5.2 DashboardHeader (`components/DashboardHeader.jsx`)

Responsibilities:

- Renders brand (icon + "StreamHub").
- Renders search input, fully controlled:
	- `value={searchTerm}`
	- `onChange={(e) => onSearchChange(e.target.value)}`
- Renders user avatar using `UserProfilePopover`.
	- Profile → navigates to `/profile`.
	- Logout → dispatches `logoutRequest`.

### 5.3 DashboardTrendingGrid (`components/DashboardTrendingGrid.jsx`)

Responsibilities:

- Displays cards for each video in `videos` prop.
- For each video:
	- Thumbnail uses `video.thumbnailPath`:
		- Background image: `url(http://localhost:5000${video.thumbnailPath})`.
	- Shows title and creator name (`video.User.name`) with createdAt formatted via `toLocaleString()`.
	- Clicking a card navigates to `/videos/:id` (video stream page).

---

## 6. Video Upload Page (`VideoUpload.jsx`)

Responsibilities:

- Header:
	- Logo and "StreamHub" title.
	- "Dashboard" button → navigate back to `/dashboard`.
	- Notifications icon.
	- `UserProfilePopover` (same behavior as dashboard).
- Layout:
	- Reuses `AppSidebar` on the left.
	- Content area uses classes `upload-main dashboard-main` so it aligns next to the fixed sidebar.
- Upload UI:
	- Left column:
		- AntD `Upload.Dragger` for selecting a video file.
		- Shows selected video name, size, and progress card.
	- Right column:
		- AntD `Form` for title, description, and thumbnail image.
		- Thumbnail upload with `Upload` and `beforeUpload={() => false}` (client-side only).

Upload behavior:

- `handleUploadChange`:
	- Always keeps only the last selected video.
	- Stores basic info in `uploadInfo` for status display.
- `handlePublish`:
	- If there is a selected video, dispatches `videoUploadRequest` with:
		- `title`, `description`, `videoFile`, `thumbnailFile`.
- `useEffect` on `success` (from Redux):
	- Resets form fields and clears upload state.

---

## 7. Video Stream Page (`VideoStream.jsx`)

Route: `/videos/:id`

Responsibilities:

- Load a single video by id:
	- Uses `useParams` to read `id`.
	- Calls `getVideoById(id)` from `videoApi` on mount.
- Show full-screen-like player shell with custom HTML5 `<video>` controls:
	- Play / Pause
	- Volume slider (0–1)
	- Mute / Unmute
	- Fullscreen toggle (`requestFullscreen` / `exitFullscreen`)
	- Seek / progress bar based on `currentTime / duration`.

UX:

- Loading state with AntD `Spin`.
- Error state with a "Back to Dashboard" button.

---

## 8. Profile Page (`ProfileDetails.jsx`)

Route: `/profile`

Responsibilities:

- On mount:
	- Determine `userId` from:
		- Redux `login.user.id`, or
		- `localStorage.getItem('loginUser')`.
	- If profile data not loaded, dispatch `profileFetchRequest(userId)`.
	- Always dispatch `profileUserVideosRequest(userId)` to load that user's videos.
- Show profile header:
	- Brand (icon + "StreamHub").
	- "Dashboard" button to go back.
	- `UserProfilePopover` avatar (Profile / Logout).
- Show profile hero and details:
	- Avatar, name, handle, bio text.
	- Contact info (email, phone, location) using profile data.
- Edit profile:
	- "Edit Profile" button opens AntD `Modal` with `Form`.
	- Fields:
		- Name (read-only from profile).
		- Email (read-only).
		- Phone (editable).
		- Location (editable).
	- On submit, dispatches:
		- `profileUpdateRequest({ name, email, phone, location })`.

State:

- `profileDetailsSlice` holds `data`, `userVideos`, and loading/error flags.

---

## 9. Shared Components & Hooks

### UserProfilePopover

- Reusable avatar popover used in:
	- Dashboard header
	- Upload header
	- Profile header
- Shows "Profile" and "Logout" menu items and triggers callbacks from props.

### AppSidebar

- Shared left sidebar for dashboard and upload pages.
- Highlights current route (Home vs Upload).
- Fixed on large screens; uses dashboard CSS for consistent styling.

### useDebounce

- Hook in `src/hooks/useDebounce.js`.
- Usage:

```js
const [query, setQuery] = useState('')
const debouncedQuery = useDebounce(query, 400)
```

Used in `Dashboard.jsx` to debounce search before filtering videos.

---

## 10. Running With Backend

Expected backend behavior (summary):

- Auth:
	- `POST /api/auth/login` – Returns user data (stored as `loginUser`).
	- `POST /api/auth/register`
	- `GET /api/auth/check` – Used by `useAuth`.
	- `POST /api/auth/logout`
	- `GET /api/auth/me/{id}` – Fetch profile for a given user id.
	- `PATCH /api/auth/profile` – Update profile.
- Videos:
	- `POST /api/videos` – Upload video + thumbnail.
	- `GET /api/videos` – List all videos.
	- `GET /api/videos/:id` – Get single video.
	- `GET /api/videos/user/:userId` – Videos by specific user.
	- Socket.IO: emit `videoUploaded` to `dashboard` room on successful upload.

Make sure CORS and `credentials: 'include'` are configured correctly on the backend for cookies/session.

---

## 11. Scripts Summary

- `npm install` – Install dependencies.
- `npm run dev` – Start Vite dev server.
- `npm run build` – Build production bundle.
- `npm run preview` – Preview production build.

---

## 12. Notes & Customization

- Update icons, colors and branding ("StreamHub") via:
	- `Dashboard.css`, `VideoUpload.css`, `ProfileDetails.css`, `VideoStream.css`.
- If your backend runs on a different host/port, adjust URLs in:
	- `videoApi.js`
	- `Dashboard.jsx` (initial `fetch('http://localhost:5000/api/videos')`).
	- Socket.IO `io('http://localhost:5000')` calls.

This README reflects the current frontend structure and main flows from login to real-time dashboard, upload, profile, and video streaming.

