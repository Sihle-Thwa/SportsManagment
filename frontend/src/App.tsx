// src/App.tsx
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import { routes } from "./routes";
import { ThemeProvider } from "./components/theme-provider";
import "./index.css";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";

function App() {
	const isAuthenticated = false; 
	return (
		<ThemeProvider defaultTheme="system" storageKey="ui-theme">
			<Router>
				<div className="body">
					<Routes>
						<Route path="/login" element={<LoginPage />} />
						<Route path="/register" element={<RegisterPage />} />
						<Route
							path="/"
							element={
								isAuthenticated ? (
									<MainLayout />
								) : (
									<Navigate to="/login" replace />
								)
							}
						>
							{routes.map((route) => (
								<Route
									key={route.id}
									path={route.path}
									element={route.element}
								/>
							))}

							{/* Fallback (404) */}
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
