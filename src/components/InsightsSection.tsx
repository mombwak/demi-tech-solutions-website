/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { INSIGHTS_ARTICLES } from '../data/content.ts';
import { InsightArticle } from '../types.ts';
import { Search, ArrowUpRight, BookOpen, Clock, Calendar, CheckCircle } from 'lucide-react';

interface InsightsSectionProps {
  onOpenConsultation: () => void;
}

export const InsightsSection: React.FC<InsightsSectionProps> = ({
  onOpenConsultation,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticle, setActiveArticle] = useState<InsightArticle | null>(null);

  const categories = [
    'All',
    'Security Technology',
    'Business Automation',
    'ERP & POS',
    'Networking',
    'Power Systems',
  ];

  const filteredArticles = INSIGHTS_ARTICLES.filter((article) => {
    const matchesCat = selectedCategory === 'All' || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section id="insights" className="py-20 sm:py-28 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-3xl">
            <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-3">
              Technical Authority & Practical Guides
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight mb-4">
              INSIGHTS & KNOWLEDGE BASE
            </h2>
            <p className="text-base text-neutral-600 leading-relaxed">
              Technical analysis, regulatory standards, and architectural blueprints authored by our systems engineers for Kenyan business operators and infrastructure managers.
            </p>
          </div>

          <div className="w-full md:w-72">
            <div className="relative">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search technical guides..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs border border-neutral-300 focus:border-black focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-100 border border-neutral-200 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold tracking-wider transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-black text-white shadow-sm'
                  : 'text-neutral-600 hover:text-black hover:bg-neutral-200/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              className="p-6 bg-neutral-50 border border-neutral-200 flex flex-col justify-between hover:border-black transition-colors"
            >
              <div>
                <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-500 mb-3">
                  <span>{article.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{article.readTime}</span>
                </div>

                <h3 className="text-base font-bold text-black mb-3 leading-snug">
                  {article.title}
                </h3>

                <p className="text-xs text-neutral-600 leading-relaxed mb-6">
                  {article.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-200 flex items-center justify-between">
                <span className="text-[11px] font-mono text-neutral-400">
                  {article.date}
                </span>

                <button
                  onClick={() => setActiveArticle(article)}
                  className="text-xs font-bold text-black hover:underline underline-offset-4 flex items-center gap-1 cursor-pointer"
                >
                  <span>READ TECHNICAL BRIEF</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Article Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white max-w-3xl w-full my-8 border border-neutral-300 shadow-2xl p-6 sm:p-10 max-h-[85vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-neutral-200 pb-4 mb-6">
              <div>
                <div className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-1">
                  {activeArticle.category} · {activeArticle.readTime} · {activeArticle.date}
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-black leading-tight">
                  {activeArticle.title}
                </h3>
                <div className="text-xs font-mono text-neutral-400 mt-1">
                  By {activeArticle.author}
                </div>
              </div>
              <button
                onClick={() => setActiveArticle(null)}
                className="p-1.5 text-neutral-500 hover:text-black font-bold text-xs"
              >
                ✕ CLOSE
              </button>
            </div>

            {/* Key Takeaways */}
            <div className="p-5 bg-neutral-50 border border-neutral-200 mb-8">
              <h4 className="text-xs font-mono uppercase tracking-wider text-black font-bold mb-3">
                Key Engineering Takeaways:
              </h4>
              <div className="space-y-2">
                {activeArticle.keyTakeaways.map((takeaway, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-800">
                    <CheckCircle className="w-4 h-4 text-black shrink-0 mt-0.5" />
                    <span>{takeaway}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Full Body Prose */}
            <div className="space-y-4 text-sm text-neutral-700 leading-relaxed font-sans mb-10">
              {activeArticle.content.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            {/* Action Bar */}
            <div className="pt-6 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-4">
              <button
                onClick={() => {
                  setActiveArticle(null);
                  onOpenConsultation();
                }}
                className="px-6 py-3 text-xs font-bold tracking-wider text-white bg-black hover:bg-neutral-800 transition-colors"
              >
                CONSULT OUR ENGINEERS ON THIS TOPIC
              </button>
              <button
                onClick={() => setActiveArticle(null)}
                className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:text-black"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
