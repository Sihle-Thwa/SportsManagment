import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import { routes } from "./routes";
import { ThemeProvider } from "./components/theme-provider";

function App() {
	return (
		<Router>
			<ThemeProvider>
				<Routes>
					<Route path="/" element={<MainLayout />}>
						{routes.map((route) => (
							<Route key={route.id} path={route.path} element={route.element} />
						))}
					</Route>
				</Routes>
			</ThemeProvider>
		</Router>
	);
}

export default App;
