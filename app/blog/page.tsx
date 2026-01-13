'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Facebook, Twitter, Linkedin, Instagram, Calendar, User, ArrowRight, Clock, Tag, Search } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Social media share URLs
const SOCIAL_LINKS = {
  facebook: 'https://facebook.com/elevateforhumanity',
  twitter: 'https://twitter.com/elevate4humanity',
  linkedin: 'https://linkedin.com/company/elevate-for-humanity',
  instagram: 'https://instagram.com/elevateforhumanity',
};

// Mock blog data - fallback if database is empty
const mockBlogPosts = [
  {
    id: 1,
    title: "From Unemployed to HVAC Technician: Marcus's Journey",
    excerpt:
      "After losing his job during the pandemic, Marcus enrolled in our HVAC program. Six months later, he's earning $55,000/year with full benefits. His story shows how workforce training can transform lives and provide stable, well-paying careers in skilled trades.",
    preview: "Marcus Thompson was working in retail management when COVID-19 hit. After being laid off, he struggled to find work in his field. That's when he discovered Elevate for Humanity's HVAC program through Indiana Career Connect. 'I never thought about HVAC before, but the advisor showed me the job outlook and salary potential,' Marcus recalls. The 20-week program was fully funded through WIOA, covering tuition, books, tools, and even his EPA certification exam. Today, Marcus works for a leading Indianapolis HVAC company, earning $55,000 annually with full benefits and opportunities for advancement.",
    image: '/images/blog/hvac-success.jpg',
    category: 'Success Story',
    date: 'December 15, 2024',
    author: 'Elevate Team',
    slug: 'marcus-hvac-journey',
  },
  {
    id: 2,
    title: 'New Partnership with Indiana Career Connect',
    excerpt:
      "We're excited to announce our expanded partnership with Indiana Career Connect, bringing more funding opportunities to students across Indianapolis. This collaboration streamlines the enrollment process and increases access to WIOA funding for eligible residents seeking career training.",
    preview: "Elevate for Humanity has formalized an expanded partnership with Indiana Career Connect, the state's official workforce development portal. This partnership makes it easier for Hoosiers to access free career training through WIOA funding. Students can now complete their entire eligibility process online through the Indiana Career Connect portal, schedule appointments with WorkOne advisors, and receive training vouchers faster than ever. The partnership also includes co-location services at select WorkOne centers, allowing students to meet with both WorkOne advisors and Elevate staff in one visit.",
    image: '/images/blog/partnership.jpg',
    category: 'News',
    date: 'December 10, 2024',
    author: 'Elevate Team',
    slug: 'indiana-career-connect-partnership',
  },
  {
    id: 4,
    title: 'Understanding WIOA Funding: A Complete Guide',
    excerpt:
      'Learn how WIOA funding works, who qualifies, and how it can cover 100% of your training costs for in-demand careers. This comprehensive guide breaks down eligibility requirements, the application process, and what expenses are covered under WIOA.',
    preview: "The Workforce Innovation and Opportunity Act (WIOA) is the primary federal workforce development program, providing funding for job training and education. Most adults qualify based on income, public assistance receipt, veteran status, or displacement from previous employment. WIOA covers 100% of training costs including tuition, books, supplies, tools, and even support services like transportation and childcare. To apply, visit Indiana Career Connect, create your profile, and schedule an appointment with a WorkOne career advisor. The advisor will verify your eligibility and issue a training voucher if approved. The entire process typically takes 2-3 weeks from initial appointment to program start.",
    image: '/images/blog/wioa-guide.jpg',
    category: 'Resource',
    date: 'November 28, 2024',
    author: 'Elevate Team',
    slug: 'wioa-funding-guide',
  },
  {
    id: 5,
    title: 'Meet Sarah: CNA to Nursing School',
    excerpt:
      "Sarah started as a CNA through our program. Now she's enrolled in nursing school while working full-time, with her employer covering tuition. Her journey demonstrates how entry-level healthcare certifications can serve as stepping stones to advanced nursing careers.",
    preview: "Sarah Martinez completed our CNA program in just 4 weeks and immediately found employment at a local hospital. 'The CNA program gave me the foundation I needed to understand healthcare,' Sarah explains. 'But more importantly, it got my foot in the door.' After working as a CNA for 18 months, Sarah's employer offered tuition reimbursement for nursing school. She's now enrolled in an RN program while continuing to work full-time as a CNA. 'I'm earning money while going to school, and my employer is paying for it. I couldn't have done this without starting with the CNA certification,' she says. Sarah expects to graduate with her RN in two years, debt-free.",
    image: '/images/blog/sarah-cna.jpg',
    category: 'Success Story',
    date: 'November 20, 2024',
    author: 'Elevate Team',
    slug: 'sarah-cna-to-nursing',
  },
  {
    id: 6,
    title: 'Employer Spotlight: Local HVAC Company Hires 8 Graduates',
    excerpt:
      'Indianapolis-based HVAC company shares why they prefer hiring our graduates and how our training aligns with industry needs. Owner Mike Johnson explains how our curriculum prepares students for real-world HVAC work better than traditional programs.',
    preview: "Comfort Solutions HVAC has hired 8 graduates from Elevate for Humanity's HVAC program in the past year. Owner Mike Johnson says our graduates stand out because of their hands-on training and industry certifications. 'These students come in with EPA certification, OSHA 30, and real experience working on actual HVAC systems,' Johnson explains. 'They're not just book-smart—they can troubleshoot, they understand customer service, and they're ready to work from day one.' The company now partners with Elevate to provide on-the-job training opportunities for current students and has committed to interviewing every graduate who completes the program. Starting pay for new technicians is $18-22/hour with full benefits and opportunities for advancement.",
    image: '/images/blog/employer-spotlight.jpg',
    category: 'Employer Story',
    date: 'November 15, 2024',
    author: 'Elevate Team',
    slug: 'hvac-employer-spotlight',
  },
];

const categories = [
  'All Posts',
  'Success Stories',
  'News',
  'Program Updates',
  'Resources',
  'Employer Stories',
];

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState(mockBlogPosts);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All Posts');
  const [searchQuery, setSearchQuery] = useState('');
  const [visiblePosts, setVisiblePosts] = useState(6);

  useEffect(() => {
    async function fetchPosts() {
      const supabase = createClient();
      const { data: posts, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false });

      if (!error && posts && posts.length > 0) {
        setBlogPosts(posts);
      }
      setLoading(false);
    }
    fetchPosts();
  }, []);

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === 'All Posts' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const displayedPosts = filteredPosts.slice(0, visiblePosts);

  return (
    <div className="bg-white">
      {/* Hero Section with Animation */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-20 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="max-w-3xl animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog & Success Stories</h1>
            <p className="text-xl text-blue-100 mb-6">
              Success stories, program updates, and career insights from our
              students and partners.
            </p>
            {/* Social Media Links */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-blue-200">Follow us:</span>
              <div className="flex gap-3">
                <a
                  href={SOCIAL_LINKS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href={SOCIAL_LINKS.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:flex-1 md:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full min-h-[44px] pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="w-full md:w-auto overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0">
              <div className="flex md:flex-wrap gap-2 min-w-max md:min-w-0">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap flex-shrink-0 min-h-[44px] ${
                      category === selectedCategory
                        ? 'bg-brand-orange-600 text-white'
                        : 'bg-white text-black border border-slate-300 hover:border-brand-orange-600 hover:text-brand-orange-600'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-black">Loading articles...</p>
            </div>
          )}
          
          {!loading && displayedPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-black">No articles found matching your criteria.</p>
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {displayedPosts.map((post, index) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image */}
                <div className="relative h-40 sm:h-48 md:h-52 bg-slate-200 overflow-hidden">
                  <Image
                    priority
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-black text-xs font-bold uppercase rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-black mb-3 group-hover:text-brand-orange-600 transition line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-black mb-3 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  {/* Preview snippet */}
                  {post.preview && (
                    <p className="text-sm text-black mb-4 line-clamp-2 leading-relaxed border-t border-gray-200 pt-3">
                      {post.preview}
                    </p>
                  )}

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Image src="/images/icons/clock.png" alt="Date" width={16} height={16} />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Image src="/images/icons/users.png" alt="Author" width={16} height={16} />
                      <span>{post.author}</span>
                    </div>
                  </div>

                  {/* Read More Button */}
                  <div className="inline-flex items-center gap-2 bg-brand-orange-600 text-white px-6 py-3 rounded-lg font-semibold group-hover:bg-brand-orange-700 transition-all">
                    Read Full Story
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Load More */}
          {visiblePosts < filteredPosts.length && (
            <div className="text-center mt-12">
              <button 
                onClick={() => setVisiblePosts(prev => prev + 6)}
                className="px-8 py-3 bg-slate-100 hover:bg-slate-200 text-black font-semibold rounded-lg transition"
              >
                Load More Articles ({filteredPosts.length - visiblePosts} remaining)
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Success Story?
          </h2>
          <p className="text-xl text-black mb-8">
            Join hundreds of students who have transformed their careers through
            our free training programs.
          </p>
          <Link
            href="/apply"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-brand-orange-600 hover:bg-slate-50 rounded-lg font-bold text-lg transition shadow-lg"
          >
            Apply Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
