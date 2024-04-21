import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    create_property_url: "/create-property",
    session:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTM3NzM1OTUsImlhdCI6MTcxMzY4NzE5NSwic2Vzc2lvbiI6eyJ1c2VyX2lkIjoiY2Y4YmNjY2QtOTZlYi00NzhiLTljYjQtNWNmYTI2YTU4ZmQwIiwiZW1haWwiOiJrYW5hd2F0Z3JpbGwyMDAyQGdtYWlsLmNvbSIsImlzX293bmVyIjp0cnVlfX0.OEzVrzVsJnCKf3Y62yGjTVY1F56xFzvkHYl9IT2H3s8",
  },
});

// import { defineConfig } from "cypress";

// export default defineConfig({
//   projectId: "128076ed-9868-4e98-9cef-98dd8b705d75",
//   env: {
//     frontend_host: "http://localhost:3000",
//     create_property_url: "/create-property",
//   },
// });
