import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
}

export default function SEO({ 
  title,
  description = 'Find your dream job with XKroot.ai - The AI-powered job matching platform',
  keywords = ['jobs', 'career', 'recruitment', 'hiring'],
  image = '/og-image.jpg',
  url = typeof window !== 'undefined' ? window.location.href : ''
}: SEOProps) {
  const siteTitle = `${title} | XKroot.ai`;
  
  return (
    <Helmet>
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />

      {/* Open Graph */}
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* PWA */}
      <meta name="theme-color" content="#4f46e5" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    </Helmet>
  );
}