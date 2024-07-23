import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	// base: "https://hrm.elaraby-erp.net/",
	base: "https://hrm-elaraby-front.vercel.app/",
});
