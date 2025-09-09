import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import { routes } from "./routes";
import { ThemeProvider } from "./components/theme-provider";

function App() {
	return (
		<Router>
			<ThemeProvider>
				<div className="min-h-screen bg-[linear-gradient(135deg,_var(--color-accent-100)_35%,_var(--color-accent-300)_70%,_var(--color-accent-500)_100%)]">
					<Routes>
						<Route path="/" element={<MainLayout />}>
							{routes.map((route) => (
								<Route
									key={route.id}
									path={route.path}
									element={route.element}
								/>
							))}
						</Route>
					</Routes>
				</div>
			</ThemeProvider>
		</Router>
	);
}

export default App;
