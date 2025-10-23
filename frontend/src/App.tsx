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

function App() {
	return (
		<AuthProvider>
			<Router>
				<Routes>
					<Route path="/" element={<Navigate to="/dashboard" />} />
					<Route path="/signIn" element={<LoginPage />} />
					<Route path="/signUp" element={<RegisterPage />} />
					<Route
						path="/"
						element={
							<ProtectedRoute>
								<MainLayout />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</Router>
		</AuthProvider>
	);
}

export default App;
