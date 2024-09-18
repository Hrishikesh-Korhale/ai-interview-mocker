/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./utils/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://neondb_owner:gQIf1zbjUw0Y@ep-rapid-heart-a1aiqve2.ap-southeast-1.aws.neon.tech/ai-interview-mocker?sslmode=require",
  },
};
