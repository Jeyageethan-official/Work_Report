const fs = require("fs");
const path = require("path");
const admin = require("firebase-admin");
const env = require("./env");

let initialized = false;

function loadServiceAccount() {
  if (env.firebase.serviceAccountJson) {
    return JSON.parse(env.firebase.serviceAccountJson);
  }

  if (env.firebase.serviceAccountPath) {
    const resolved = path.resolve(env.firebase.serviceAccountPath);
    return JSON.parse(fs.readFileSync(resolved, "utf8"));
  }

  return null;
}

function initFirebaseAdmin() {
  if (initialized) return admin;

  const serviceAccount = loadServiceAccount();
  if (!serviceAccount) {
    throw new Error("Firebase Admin credentials are not configured.");
  }

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: env.firebase.projectId || serviceAccount.project_id
  });

  initialized = true;
  return admin;
}

function getFirebaseAdmin() {
  return initialized ? admin : initFirebaseAdmin();
}

async function createCustomToken(uid, claims = {}) {
  const sdk = getFirebaseAdmin();
  return sdk.auth().createCustomToken(uid, claims);
}

module.exports = {
  getFirebaseAdmin,
  createCustomToken
};
