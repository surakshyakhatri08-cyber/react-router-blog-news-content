import { Routes, Route, Link, Outlet } from "react-router";
import BlogList from "./components/BlogList";
import BlogDetail from "./components/BlogDetail";

const Layout = () => (
  <div className="min-h-screen bg-gray-50 font-sans">
    <nav className="bg-white shadow-sm p-4 mb-6">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">MyNewsBlog</Link>
        <Link to="/blog" className="text-gray-600 hover:text-blue-500 font-medium">Blogs</Link>
      </div>
    </nav>
    <main className="max-w-5xl mx-auto px-4">
      <Outlet />
    </main>
  </div>
);

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<div className="text-center py-20 text-xl text-gray-500">Welcome! Click on 'Blogs' to see news.</div>} />
        <Route path="blog">
          <Route index element={<BlogList />} />
          <Route path=":id" element={<BlogDetail />} />
        </Route>
      </Route>
    </Routes>
  );
}