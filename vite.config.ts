import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // 监听所有网络接口
    port: 8888, // 可选：指定端口（默认是5173）
    strictPort: true, // 可选：如果端口被占用则直接退出
  },
});
