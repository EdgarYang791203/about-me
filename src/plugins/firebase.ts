import type { App, Plugin } from "vue";
import { getApps, initializeApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  databaseURL?: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string;
}

export const firebasePlugin: Plugin = {
  install: (app: App) => {
    console.log("Initializing Firebase...");

    const firebaseConfig = {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
      measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
    };

    let auth: Auth | null = null;
    let db = null;

    if (!getApps().length) {
      try {
        const firebaseApp = initializeApp(firebaseConfig);
        auth = getAuth();
        db = getFirestore(firebaseApp);
      } catch (error) {
        console.error(`Firebase init error: ${JSON.stringify(error, null, 2)}`);
      }
    }

    if (auth) {
      app.provide("$auth", auth);
      app.config.globalProperties.$auth = auth;
    }

    if (db) {
      app.provide("$firestore", db);
      app.config.globalProperties.$firestore = db;
    }
  },
};
