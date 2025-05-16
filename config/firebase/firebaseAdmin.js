import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

const appAdmin = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert({
        type: "service_account",
        project_id: "distrilink-a5872",
        private_key_id: "22c5d02d5b41ed6a83c2b102e05367adce58042e",
        private_key: process.env.FIREBASE_PRIVATE_KEY,
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        client_id: "106190270989836133695",
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url:
          "https://www.googleapis.com/oauth2/v1/certs",
        client_x509_cert_url:
          "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-yo4ob%40distrilink-a5872.iam.gserviceaccount.com",
        universe_domain: "googleapis.com",
      }),
    })
  : admin.app();

const dbAdmin = getFirestore();
const AuthAdmin = getAuth(appAdmin);
const timeAdmin = admin.firestore.FieldValue.serverTimestamp();

export { dbAdmin, AuthAdmin, timeAdmin };
