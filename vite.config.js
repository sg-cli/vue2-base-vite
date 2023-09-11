import { createVuePlugin } from "vite-plugin-vue2";
import stylelitPlugin from "vite-plugin-stylelint";
// 配置@别名
import { resolve } from "path";

export default {
	plugins: [createVuePlugin(), stylelitPlugin()],
	// ↓解析配置
	resolve: {
		// ↓import引入忽略文件的后缀名
		extensions: [".js", ".jsx", ".json", ".vue"],
		// ↓路径别名
		alias: {
			// eslint-disable-next-line no-undef
			"@": resolve(__dirname, "./src"),
		},
	},
	server: {
		host: "0.0.0.0", // 如果将此设置为 0.0.0.0 或者 true 将监听所有地址，包括局域网和公网地址。
		port: 4000, // 设置服务启动端口号，如果端口已经被使用，Vite 会自动尝试下一个可用的端口
		https: false, // 是否开启https
		open: true, // boolean | string 设置服务启动时是否自动打开浏览器，当此值为字符串时，会被用作 URL 的路径名
		cors: true, // 为开发服务器配置 CORS，配置为允许跨域
		// 设置代理，根据我们项目实际情况配置
		proxy: {
			"/api": {
				target: "http://127.0.0.1:8000", // 后台服务地址
				changeOrigin: true, // 是否允许不同源
				secure: false, // 支持https
				rewrite: (path) => path.replace(/^\/api/, ""),
			},
		},
	},
};
