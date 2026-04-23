import { useState, useEffect } from "react";
import { Link } from "react-router";

export default function BlogList() {
    const [articles, setArticles] = useState<any[]>([]);
    const API_KEY = "b469404654524963aebd33a4ea2e81ca";
    const URL = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${API_KEY}`;

    useEffect(() => {
        fetch(URL)
            .then((res) => res.json())
            .then((data) => {
                console.log("Full API Response:", data);
                setArticles(data.articles.slice(0, 10));
            })
            .catch((err) => console.error("Error fetching data:", err));
    }, []);

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8 text-gray-800 border-l-4 border-blue-500 pl-4">Latest Tech News</h1>
            <div className="grid gap-6 md:grid-cols-2">
                {articles.map((item, index) => (
                    <div key={index} className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                        <h2 className="text-xl font-semibold text-gray-900 mb-2 leading-tight">{item.title}</h2>
                        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{item.description}</p>
                        <Link
                            to={`/blog/${index}`}
                            state={{ article: item }}
                            className="text-blue-500 font-semibold hover:underline inline-flex items-center"
                        >
                            Read Full Content →
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}