const config = {
  appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
  appwriteProjectID: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteProjectDatabaseID: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appwriteProjectCollectionID: String(
    import.meta.env.VITE_APPWRITE_COLLECTION_ID
  ),
  appwriteProjectBucketID: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
  tinyMiceEditorApiKey: String(import.meta.env.VITE_TINYMICE_EDITOR_URL),
}

export default config
