import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import { routes } from "./routes";
import { ThemeProvider } from "./components/theme-provider";

function App() {
	return (
		<Router>
			<ThemeProvider>
				<div className="min-h-screen bg-[linear-gradient(135deg,_var(--color-neutral-50)_25%,_var(--color-primary-200)_50%,_var(--color-accent-400)_100%)]"> {/* shadcn/tailwind v4 best practices */}
					<Routes>
						<Route path="/" element={<MainLayout />}>
							{routes.map((route) => (
								<Route key={route.id} path={route.path} element={route.element} />
							))}
						</Route>
					</Routes>
				</div>
			</ThemeProvider>
		</Router>
	);
}

export default App;
