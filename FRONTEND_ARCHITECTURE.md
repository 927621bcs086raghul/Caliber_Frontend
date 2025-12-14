# 🎨 Caliber Frontend Architecture

## 📁 Organized Folder Structure

```
Caliber_Frontend/src/
├── 📁 config/                      # Configuration
│   └── env.js                      # Environment variables ✅
│
├── 📁 features/                    # Feature modules (NEW)
│   ├── 📁 auth/
│   │   ├── 📁 pages/
│   │   │   ├── LoginPage.jsx
│   │   │   └── RegisterPage.jsx
│   │   ├── 📁 services/
│   │   │   └── authService.js
│   │   └── 📁 store/
│   │       └── authSlice.js
│   │
│   ├── 📁 videos/
│   │   ├── 📁 pages/
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── VideoPlayerPage.jsx
│   │   │   └── VideoUploadPage.jsx
│   │   ├── 📁 components/
│   │   │   ├── VideoCard.jsx
│   │   │   ├── VideoGrid.jsx
│   │   │   └── UploadForm.jsx
│   │   ├── 📁 services/
│   │   │   └── videoService.js
│   │   └── 📁 store/
│   │       └── videoSlice.js
│   │
│   └── 📁 profile/
│       ├── 📁 pages/
│       │   └── ProfilePage.jsx
│       ├── 📁 services/
│       │   └── profileService.js
│       └── 📁 store/
│           └── profileSlice.js
│
├── 📁 shared/                      # Shared/common code
│   ├── 📁 components/
│   │   ├── 📁 Layout/
│   │   │   ├── AppSidebar.jsx
│   │   │   └── Header.jsx
│   │   └── 📁 UI/
│   │       ├── Button.jsx
│   │       ├── Input.jsx
│   │       └── Loader.jsx
│   │
│   ├── 📁 hooks/
│   │   ├── useAuth.js
│   │   └── useDebounce.js
│   │
│   └── 📁 utils/
│       ├── formatters.js
│       └── validators.js
│
├── 📁 services/                    # API layer (RENAMED from api/)
│   ├── apiClient.js               # Axios instance ✅
│   ├── authApi.js                 # Auth endpoints
│   └── videoApi.js                # Video endpoints
│
├── 📁 store/                       # Redux store ✅
│   ├── store.js                   # Store config
│   ├── rootReducer.js            # Root reducer
│   └── rootSaga.js               # Root saga
│
├── App.jsx                         # Root component ✅
├── App.css                         # App styles ✅
├── main.jsx                        # Entry point ✅
└── index.css                       # Global styles ✅
```

## 🔄 Current vs New Structure

### Before (Current - Disorganized)
```
❌ authentication/
   ├── dashboard/          # Not auth-related!
   ├── login/              # Login page + slice mixed
   ├── register/           # Register page + slice mixed  
   ├── profileDetails/     # Should be separate feature
   ├── videoStream/        # Not auth-related!
   └── videoUpload/        # Not auth-related!
```

### After (New - Organized)
```
✅ features/
   ├── auth/               # Only authentication
   │   ├── pages/          # Login, Register
   │   ├── services/       # Auth API calls
   │   └── store/          # Auth state
   │
   ├── videos/             # All video features
   │   ├── pages/          # Dashboard, Player, Upload
   │   ├── components/     # Video-specific components
   │   ├── services/       # Video API calls
   │   └── store/          # Video state
   │
   └── profile/            # User profile
       ├── pages/          # Profile page
       ├── services/       # Profile API calls
       └── store/          # Profile state
```

## 📝 File Renaming & Organization

### Authentication Feature
| Old Path | New Path | Reason |
|----------|----------|--------|
| `authentication/login/Login.jsx` | `features/auth/pages/LoginPage.jsx` | Clear naming |
| `authentication/register/Register.jsx` | `features/auth/pages/RegisterPage.jsx` | Clear naming |
| `authentication/login/loginSlice.js` | `features/auth/store/authSlice.js` | Consolidated |
| `api/authApi.js` | `features/auth/services/authService.js` | Feature-based |

### Videos Feature
| Old Path | New Path | Reason |
|----------|----------|--------|
| `authentication/dashboard/Dashboard.jsx` | `features/videos/pages/DashboardPage.jsx` | Better naming |
| `authentication/videoStream/videoPlayer.jsx` | `features/videos/pages/VideoPlayerPage.jsx` | Better naming |
| `authentication/videoUpload/VideoUpload.jsx` | `features/videos/pages/VideoUploadPage.jsx` | Better naming |
| `api/videoApi.js` | `features/videos/services/videoService.js` | Feature-based |

### Profile Feature
| Old Path | New Path | Reason |
|----------|----------|--------|
| `authentication/profileDetails/ProfileDetails.jsx` | `features/profile/pages/ProfilePage.jsx` | Better naming |
| `authentication/profileDetails/profileDetailsSlice.js` | `features/profile/store/profileSlice.js` | Feature-based |

### Shared Components
| Old Path | New Path | Reason |
|----------|----------|--------|
| `components/LogoutLoader.jsx` | `shared/components/UI/LogoutLoader.jsx` | Organized |
| `components/UserProfilePopover.jsx` | `shared/components/Layout/UserProfilePopover.jsx` | Organized |
| `hooks/useAuth.js` | `shared/hooks/useAuth.js` | Shared hook |
| `hooks/useDebounce.js` | `shared/hooks/useDebounce.js` | Shared hook |

### Services (API Layer)
| Old Path | New Path | Reason |
|----------|----------|--------|
| `api/axiosConfig.js` | `services/apiClient.js` | ✅ Better naming |
| `api/authApi.js` | `services/authApi.js` | Centralized |
| `api/videoApi.js` | `services/videoApi.js` | Centralized |

## 🎯 Architecture Principles

### 1. Feature-First Organization
Group code by feature, not by type:
```javascript
✅ features/auth/      // All auth code together
❌ pages/auth/         // Separated by type
   components/auth/
   slices/auth/
```

### 2. Clear Separation of Concerns
```
pages/       → UI Components (presentation)
services/    → API Calls (data fetching)
store/       → State Management (business logic)
components/  → Reusable UI pieces
```

### 3. Proper Naming Conventions
```javascript
✅ LoginPage.jsx          (Clear it's a page)
✅ VideoCard.jsx          (Clear it's a component)
✅ authService.js         (Clear it's a service)
✅ videoSlice.js          (Clear it's a Redux slice)

❌ Login.jsx              (Ambiguous)
❌ Video.jsx              (Too generic)
❌ api.js                 (Not descriptive)
```

### 4. Colocation
Keep related code together:
```
features/auth/
├── pages/LoginPage.jsx         # Auth UI
├── services/authService.js     # Auth API
├── store/authSlice.js          # Auth state
└── hooks/useLogin.js           # Auth hooks
```

## 🔌 Import Path Organization

### With Path Aliases (vite.config.js)
```javascript
// ✅ Clean imports with @ alias
import LoginPage from '@/features/auth/pages/LoginPage';
import { useAuth } from '@/shared/hooks/useAuth';
import config from '@/config/env';

// ❌ Messy relative imports
import LoginPage from '../../../features/auth/pages/LoginPage';
import { useAuth } from '../../../shared/hooks/useAuth';
```

### Configure in vite.config.js
```javascript
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@features': path.resolve(__dirname, './src/features'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@services': path.resolve(__dirname, './src/services'),
      '@store': path.resolve(__dirname, './src/store'),
      '@config': path.resolve(__dirname, './src/config'),
    },
  },
});
```

## 📊 State Management (Redux)

### Organized Slice Structure
```
store/
├── store.js              # Configure store
├── rootReducer.js        # Combine reducers
└── rootSaga.js           # Combine sagas

features/auth/store/
└── authSlice.js          # Auth state

features/videos/store/
└── videoSlice.js         # Video state

features/profile/store/
└── profileSlice.js       # Profile state
```

### Slice Organization
```javascript
// features/auth/store/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    // Auth reducers
  },
});

export const { /* actions */ } = authSlice.actions;
export default authSlice.reducer;
```

## 🛠️ Service Layer Pattern

### API Service Structure
```javascript
// features/auth/services/authService.js
import apiClient from '@/services/apiClient';

class AuthService {
  async login(credentials) {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  }

  async register(userData) {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  }

  async logout() {
    const response = await apiClient.post('/auth/logout');
    return response.data;
  }
}

export default new AuthService();
```

## 🎨 Component Organization

### Page Components
```javascript
// features/auth/pages/LoginPage.jsx
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '@/shared/components/UI/Button';
import authService from '../services/authService';

const LoginPage = () => {
  // Page logic
  return (
    <div className="login-page">
      {/* Login UI */}
    </div>
  );
};

export default LoginPage;
```

### Reusable Components
```javascript
// shared/components/UI/Button.jsx
const Button = ({ children, variant = 'primary', ...props }) => {
  return (
    <button className={`btn btn-${variant}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
```

## 🔐 Environment Configuration Usage

### Using Config
```javascript
// Any component or service
import config from '@/config/env';

// Access configuration
const apiUrl = config.api.baseURL;
const serverUrl = config.api.serverURL;
const socketUrl = config.socket.url;

// Environment checks
if (config.isDevelopment) {
  console.log('Running in development mode');
}
```

## 📈 Benefits of This Architecture

### 1. **Scalability**
- ✅ Easy to add new features
- ✅ Clear feature boundaries
- ✅ Reduced merge conflicts

### 2. **Maintainability**
- ✅ Easy to find code
- ✅ Clear file organization
- ✅ Self-documenting structure

### 3. **Reusability**
- ✅ Shared components clearly identified
- ✅ Easy to extract patterns
- ✅ DRY principle enforced

### 4. **Team Collaboration**
- ✅ Multiple developers can work on different features
- ✅ Clear code ownership
- ✅ Reduced coupling

### 5. **Testing**
- ✅ Easy to test features in isolation
- ✅ Clear test organization
- ✅ Better code coverage

## 🚀 Migration Checklist

- [x] ✅ Create config/env.js for environment variables
- [x] ✅ Update api/axiosConfig.js to use centralized config
- [x] ✅ Create .env.example with frontend variables
- [ ] ⏳ Create features/ folder structure
- [ ] ⏳ Move auth pages to features/auth/pages/
- [ ] ⏳ Move video pages to features/videos/pages/
- [ ] ⏳ Move profile pages to features/profile/pages/
- [ ] ⏳ Consolidate Redux slices
- [ ] ⏳ Update all imports
- [ ] ⏳ Configure path aliases in vite.config.js
- [ ] ⏳ Test all features
- [ ] ⏳ Remove old authentication/ folder

## 📚 Next Steps

1. **Review Architecture** - Approve the new structure
2. **Setup Path Aliases** - Configure vite.config.js
3. **Migrate Features** - Move files incrementally
4. **Update Imports** - Fix all import paths
5. **Test** - Ensure everything works
6. **Document** - Update team documentation

---

**This architecture follows React and Redux best practices for scalable frontend applications.**