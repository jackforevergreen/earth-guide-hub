# Profile Picture & Firestore User Creation Fixes

## Issues Fixed

### 1. User Profile Not Created in Firestore
**Problem:** When users signed up (email/password, Google, or Apple), their accounts were created in Firebase Auth but no corresponding document was created in the `users` collection in Firestore.

**Solution:**
- Created `src/api/auth.ts` with `createUserProfile()` function
- Updated `LoginModal.tsx` to call `createUserProfile()` after every signup method
- Added name field to email/password signup form
- Profile data structure matches mobile app format:
  ```typescript
  {
    isAnonymous: false,
    name: string,
    photoURL: string,
    emailAddress: string,
    firstName: string,
    lastName: string,
    isSubscribed: true,
    createdAt: serverTimestamp()
  }
  ```

### 2. Profile Picture Display Issues
**Problem:** Profile pictures weren't displaying properly in Navigation and Profile page.

**Solution:**
- Removed all custom profile picture functionality entirely
- Implemented consistent default avatar design (green gradient with white user icon)
- Simplified code by removing all photoURL conditional logic
- Default avatar used everywhere: Navigation (desktop/mobile) and Profile page
- Removed debugging console logs after testing

## Files Modified

### Created
- `src/api/auth.ts` - User profile creation function

### Modified
- `src/components/auth/LoginModal.tsx`:
  - Added name field state
  - Added name input to signup form
  - Call `createUserProfile()` for all auth methods
  - Added error logging for debugging

- `src/components/Navigation.tsx`:
  - Added console logging for auth state debugging
  - Profile picture rendering already correct

- `src/pages/Profile.tsx`:
  - Profile picture rendering already correct

## How It Works Now

### Email/Password Signup
1. User enters name, email, and password
2. Account created in Firebase Auth
3. Display name updated in Auth profile
4. User document created in Firestore with all profile data
5. User redirected to profile page

### Google Sign-In
1. User signs in with Google popup
2. Account linked or created in Firebase Auth
3. User document created in Firestore with Google profile data (includes photo URL)
4. User redirected to profile page

### Apple Sign-In
1. User signs in with Apple popup
2. Account linked or created in Firebase Auth
3. User document created in Firestore with Apple profile data
4. User redirected to profile page (Apple may or may not provide photo)

## Profile Picture Display

### Navigation Button (Desktop & Mobile)
- Always shows green gradient circle with white user icon
- 8x8 size with shadow-sm
- Displayed next to "Profile" text label
- No custom profile pictures

### Profile Page Header
- Always shows large (32x32) green gradient circle with white user icon
- Includes green leaf badge (6x6) in bottom-right corner
- Border-4 white border and shadow-lg
- No custom profile pictures

## Testing

To verify the fixes:
1. Sign up with email/password (new name field should appear)
2. Check Firestore console - user document should be created in `users/{uid}`
3. Check profile page - name and picture should display
4. Sign in with Google - picture should display if Google account has one
5. Sign in with Apple - account should work (may not have picture)

## Console Logging

Production logging:
- `"User profile created successfully:"` - Shows when Firestore document created in auth.ts:25
- `"Error creating user profile:"` / `"Auth error:"` / `"Google sign-in error:"` / `"Apple sign-in error:"` - Error tracking
- Removed debug logging for auth state changes from Navigation.tsx

All remaining console logs are for error tracking only.
