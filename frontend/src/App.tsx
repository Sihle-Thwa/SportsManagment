import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import { routes } from "./routes";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<MainLayout />}>
					{routes.map((route) => (
						<Route key={route.id} path={route.path} element={route.element} />
					))}
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
