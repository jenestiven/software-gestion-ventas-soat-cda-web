# Next + Firebase starter

![zen and the art of coding logo](https://res.cloudinary.com/dwvlpyo5f/image/upload/v1718811910/next-firebase-starter_v6dold.jpg)

## ℹ️ About

This is a full-stack web-app boilerplate starter.

This is a [Next.js](https://nextjs.org/) web-app using the `app directory`, [Tailwind CSS](https://tailwindcss.com/), TypeScript, Google's [Firebase](https://firebase.google.com/) SDK and [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction) for state management.

## 🔔 Features

### 🔐 Auth

- Fully functional **Sign Up** _(email, password, and username)_, **Login** and **Forgot Password** pages

### 👤 Profile

- A protected user **Profile Page** where profile details and created posts are displayed, has links to other pages and a _Log Out_ button
- A **Profile Settings Page** where details _(email, password, username and profile image)_ can be managed

### 📝 Posts

- A **Create Post Page** for authenticated users that includes fields for _Title, Description, Images, Location, Tags,_ and _Price_
- A dynamic **Edit Post Page** (based on post ID) where all post attributes can be managed by the author
- A public **Posts Page** where all user generated posts are fetched and displayed
- A dynamic **Post Page** for individual posts

### 🐻 State Management

- The Zustand store syncs the frontend to the backend databases and provides a cookie 🍪 to maintain auth state

## 🏃‍➡️ Getting Started

- Create & Register a Firebase App
  - From Firebase Console, "Add project" and follow setup steps
  - From "Project Settings", register the web-app to get credentials
- Rename `.env.example` to `.env.local`
- Add project environment variables
- Create Firestore Database:

  - Create Firestore Collection `posts`

    - Define data structure:
      ```
      title: string
      description: string
      tags: array of strings
      images: array of strings (URLs to the uploaded images)
      userId: string (reference to the user who created the post)
      createdAt: timestamp
      location: string
      geoPoint: geopoint
      price: string
      ```
    - Update Firestore Database Rules:

      ```
        rules_version = '2';
        service cloud.firestore {
        match /databases/{database}/documents {
            match /users/{userId} {
            allow read: if true;
            allow write: if request.auth != null && request.auth.uid == userId;
            }
            match /posts/{postId} {
            allow read: if true;
            allow write: if request.auth != null && request.auth.uid == request.resource.data.userId;
            allow delete: if request.auth != null && request.auth.uid == resource.data.userId;
            }
        }
        }
      ```

- Create Firebase Storage (Images)

  - Update Storage Rules:

  ```
    service firebase.storage {
        match /b/{bucket}/o {
            match /{allPaths=**} {
            allow read: if true;
            allow write: if request.auth != null;
            }
        }
    }
  ```

### 💻 Local Development

- Install dependencies

```bash
npm i
```

- Start Node.js local development server

```bash
npm run dev
```
