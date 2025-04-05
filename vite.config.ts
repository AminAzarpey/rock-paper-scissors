import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from "@tailwindcss/vite";
import path from "path";


// https://vite.dev/config/
export default defineConfig({
    plugins: [tailwindcss(), react()],
    resolve: {
        alias: {
            "@rockPaperScissors/types": path.resolve(__dirname, "./src/types/index"),
            "@rockPaperScissors/store": path.resolve(__dirname, "./src/store/index"),
            "@rockPaperScissors/utils": path.resolve(__dirname, "./src/utils/index"),
        },
    },
})
