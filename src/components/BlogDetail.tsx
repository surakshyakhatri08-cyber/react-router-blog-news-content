import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function BlogDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [article, setArticle] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const API_KEY = "b469404654524963aebd33a4ea2e81ca";
    const URL = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${API_KEY}`;

    useEffect(() => {
        const articleIndex = parseInt(id || "0");

        if (articleIndex >= 10) {
            setLoading(false);
            return;
        }

        fetch(URL)
            .then((res) => res.json())
            .then((data) => {
                const selectedArticle = data.articles[articleIndex];
                setArticle(selectedArticle);
                console.log("Individual Article Detail:", selectedArticle);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching data:", err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p className="text-center py-10">Loading...</p>;
    if (!article || parseInt(id || "0") >= 10) {
        return (
            <div className="text-center py-20">
                <h1 className="text-2xl font-bold text-red-500">Article Not Found!</h1>
                <p className="text-gray-500">Please provide an index between 0 and 9.</p>
                <button onClick={() => navigate("/blog")} className="text-blue-500 underline mt-4">Back to Blogs</button>
            </div>
        );
    }

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