import { ConfigProvider } from "antd";
import {
	createBrowserRouter,
	Outlet,
	RouterProvider,
} from "react-router-dom";
import { Layout } from "./components/layout";
import { Companies } from "./components/companies";
import { Jobs } from "./components/jobs";

const routes = createBrowserRouter([
	{
		path: "/",
		element: (
			<Layout>
				<Outlet />
			</Layout>
		),
		children: [
			{
				path: "companies",
				element: <Companies />,
			},
			{
				path: "jobs",
				element: <Jobs />,
			},
		],
	},
]);

function App() {
	return (
		<ConfigProvider>
			<RouterProvider router={routes}></RouterProvider>
		</ConfigProvider>
	);
}

export default App;
