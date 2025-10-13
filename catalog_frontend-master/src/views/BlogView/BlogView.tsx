import React, { useState } from 'react';
import ArticleListItem from "./components/ArticleListItem";
import { Link } from "react-router-dom";
import "./blog.css";

const dummyTags = [
  { id: 1, name: 'Species' },
  { id: 2, name: 'Conservation' },
  { id: 3, name: 'Ecology' },
  { id: 4, name: 'Health' },
];

const dummyArticles = [
  {
    id: 1,
    title: 'Guardians of the Pride: The Urgency of Lion Conservation Efforts',
    image_url: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80',
    tags: ['Species'],
    excerpt: 'The urgency of lion conservation and the efforts to protect these majestic animals.',
    content: 'Full article content here...',
    text: 'Full article content here...'
  },
  {
    id: 2,
    title: 'Unveiling the Enigmatic World of Giant Pandas',
    image_url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    tags: ['Species'],
    excerpt: 'Unveiling the enigmatic world of giant pandas and conservation challenges',
    content: 'Full article content here...',
    text: 'Full article content here...'
  },
  {
    id: 3,
    title: 'Protecting the unique and threatened seas',
    image_url: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    tags: ['Conservation'],
    excerpt: 'Fauna & Flora has been using the collective knowledge and experience to protect nature.',
    content: 'Full article content here...',
    text: 'Full article content here...'
  },
  {
    id: 4,
    title: 'Exploring the Fascinating Realm of Birds',
    image_url: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80',
    tags: ['Species', 'Ecology'],
    excerpt: 'Exploring the Fascinating Realm of Birds and Their Ecological Significance',
    content: 'Full article content here...',
    text: 'Full article content here...'
  },
  {
    id: 5,
    title: 'The Secret Life of Forests',
    image_url: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80',
    tags: ['Ecology'],
    excerpt: 'Discover the hidden wonders of forests and their vital role in our ecosystem.',
    content: 'Full article content here...',
    text: 'Full article content here...'
  },
];

const BlogView = () => {
  const [selectedTag, setSelectedTag] = useState('All');
  const filteredArticles = selectedTag === 'All'
    ? dummyArticles
    : dummyArticles.filter(article => article.tags.includes(selectedTag));

  return (
    <>
      <section className="section-box blog-section">
        <div className="container">
          <div className="blog-header">
            <h1 className="blog-title">Popular Articles</h1>
            <div className="blog-tags">
              <button
                className={`blog-tag${selectedTag === 'All' ? ' active' : ''}`}
                onClick={() => setSelectedTag('All')}
              >
                All
              </button>
              {dummyTags.map(tag => (
                <button
                  key={tag.id}
                  className={`blog-tag${selectedTag === tag.name ? ' active' : ''}`}
                  onClick={() => setSelectedTag(tag.name)}
                >
                  {tag.name}
                </button>
              ))}
            </div>
          </div>
          <div className="blog-articles-layout">
            {filteredArticles.length > 0 && (
              <div className="featured-article">
                <ArticleListItem post={filteredArticles[0]} featured />
              </div>
            )}
            <div className="articles-grid">
              {filteredArticles.slice(1).map(article => (
                <ArticleListItem key={article.id} post={article} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogView;