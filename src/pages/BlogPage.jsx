import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ConsultationModal } from '../components/ConsultationModal';
import { AskGrowthoraModal } from '../components/AskGrowthoraModal';
import { BlogHero } from '../components/blog/BlogHero';
import { BLOG_POSTS } from '../data/blogData';
import '../styles/index.css';
import '../components/blog/blog-page.css';

export function BlogPage() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isAskGrowthoraOpen, setIsAskGrowthoraOpen] = useState(false);

  return (
    <div className="blog-page-wrapper">
      {/* Website Header */}
      <Header
        onOpenConsultation={() => setIsConsultationOpen(true)}
        onOpenAskGrowthora={() => setIsAskGrowthoraOpen(true)}
      />

      {/* Blog Hero with Real Growthora Blog Content */}
      <BlogHero posts={BLOG_POSTS} />


      {/* Website Footer */}
      <Footer />

      {/* Modals */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
      <AskGrowthoraModal
        isOpen={isAskGrowthoraOpen}
        onClose={() => setIsAskGrowthoraOpen(false)}
      />
    </div>
  );
}

export default BlogPage;
