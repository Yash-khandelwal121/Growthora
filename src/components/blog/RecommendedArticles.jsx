import { useEffect, useState } from "react";
import { ChevronRight, X } from "lucide-react";
import "./RecommendedArticles.css";

const articles = [
  {
    image: "/images/ai-startup-india.webp",
    category: "GOVERNMENT SCHEME",
    title: "AI Startup in India 2026: A Practical Guide for Founders",
    date: "23 September 2026",
    author: "GrowthOra",
    link: "/blog/ai-startup-india-2026",
  },
  {
    image: "/images/tide-2-scheme.webp",
    category: "GOVERNMENT SCHEME",
    title: "TIDE 2.0 Scheme: Funding, Eligibility and How to Apply",
    date: "14 September 2026",
    author: "GrowthOra",
    link: "/blog/tide-2-0-scheme",
  },
  {
    image: "/images/startup-loan.webp",
    category: "GOVERNMENT SCHEMES",
    title: "Government Loan for Startup: Schemes & How to Apply",
    date: "3 September 2026",
    author: "GrowthOra",
    link: "/blog/government-loan-for-startup",
  },
  {
    image: "/images/make-in-india.webp",
    category: "GOVERNMENT SCHEME",
    title: "Make in India 2.0: The 27 Priority Sectors for MSMEs",
    date: "1 October 2026",
    author: "GrowthOra",
    link: "/blog/make-in-india-2-0",
  },
  {
    image: "/images/msme-innovative.webp",
    category: "GOVERNMENT SCHEME",
    title: "MSME Innovative Scheme: Incubation, IPR and Design Support",
    date: "2 October 2026",
    author: "GrowthOra",
    link: "/blog/msme-innovative-scheme-incubation-ipr-design",
  },
];

export default function RecommendedArticles() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % articles.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const visibleArticles = Array.from({ length: 3 }, (_, i) => {
    return articles[(index + i) % articles.length];
  });

  return (
    <div className="recommended-panel">
      <div className="recommended-header">
        <h3>RECOMMENDED ARTICLES</h3>

        <button className="close-btn">
          <X size={18} />
        </button>
      </div>

      <div className="recommended-carousel" key={index}>
        {visibleArticles.map((article, i) => (
          <a
            href={article.link}
            className="recommended-card"
            key={`${article.title}-${i}`}
          >
            <div className="recommended-image">
              <img src={article.image} alt={article.title} />
            </div>

            <div className="recommended-content">
              <span className="recommended-category">
                {article.category}
              </span>

              <h4>{article.title}</h4>

              <div className="recommended-meta">
                <span>
                  {article.date} • {article.author}
                </span>

                <span className="recommended-arrow">
                  <ChevronRight size={19} />
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
