import { useLocation, useNavigate } from "react-router";

export default function BlogDetail() {
    const location = useLocation();
    const navigate = useNavigate();
    const { article } = (location.state as { article: any })

    if (!article) return <p className="text-center py-10">Article not found!</p>;

    console.log("Individual Article Detail:", article);

    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-3xl mx-auto border border-gray-100">
            {article.urlToImage && (
                <img src={article.urlToImage} alt="news" className="w-full h-64 object-cover" />
            )}
            <div className="p-8">
                <button
                    onClick={() => navigate(-1)}
                    className="text-sm text-blue-500 mb-4 hover:bg-blue-50 px-3 py-1 rounded"
                >
                    ← Back to Blogs
                </button>
                <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">{article.title}</h1>
                <div className="flex gap-4 text-sm text-gray-400 mb-6">
                    <span>Author: {article.author || "Unknown"}</span>
                    <span>Source: {article.source.name}</span>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg mb-6">
                    {article.content ? article.content.split('[')[0] : article.description}
                </p>
                <a
                    href={article.url}
                    target="_blank"
                    className="block text-center bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition"
                >
                    Read Original Source
                </a>
            </div>
        </div>
    );
}