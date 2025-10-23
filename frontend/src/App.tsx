import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import "./index.css";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import { AuthProvider } from "./AuthProvider";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Profile from "./pages/Profile/Profile";

// import theme initializer
import { initTheme } from "./lib/theme";

// Initialize theme preference before the app mounts
initTheme();

function App() {
	return (
		<AuthProvider>
			<Router>
				<Routes>
					{/* Make login the HOME route */}
					<Route path="/" element={<Navigate to="/signIn" replace />} />
					<Route path="/signIn" element={<LoginPage />} />
					<Route path="/signUp" element={<RegisterPage />} />
					{/* Protected app routes */}
					<Route
						path="/"
						element={
							<ProtectedRoute>
								<MainLayout />
							</ProtectedRoute>
						}
					/>
					{/* Profile route example */}
					<Route
						path="/profile"
						element={
							<ProtectedRoute>
								<Profile />
							</ProtectedRoute>
						}
					>
						<Route index element={<Profile />} />
					</Route>
				</Routes>
			</Router>
		</AuthProvider>
	);
}
export default App;
