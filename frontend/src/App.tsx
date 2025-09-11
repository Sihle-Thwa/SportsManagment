import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import { routes } from "./routes";
import { ThemeProvider } from "./components/theme-provider";
import "./index.css";

function App() {
	return (
		<ThemeProvider defaultTheme="system" storageKey="ui-theme">
			<Router>
				<div className="app-root">
					<Routes>
						{/* Main layout wraps all routes */}
						<Route path="/" element={<MainLayout />}>
							{/* Dynamic routes from your routes configuration */}
							{routes.map((route) => (
								<Route
									key={route.id}
									path={route.path}
									element={route.element}
								/>
							))}
							{/* Fallback route */}
							<Route
								path="*"
								element={
									<div className="flex items-center justify-center h-full">
										<div className="text-center">
											<h2 className="text-2xl font-semibold text-gray-900 mb-2">
												Page Not Found
											</h2>
											<p className="text-gray-600">
												The page you're looking for doesn't exist.
											</p>
										</div>
									</div>
								}
							/>
						</Route>
					</Routes>
				</div>
			</Router>
		</ThemeProvider>
	);
}

export default App;
