/**
 * AIBlockMeta - Meta tags to block AI scrapers
 * Add this component to any page with protected content
 */
export default function AIBlockMeta() {
  return (
    <>
      {/* Block AI training and scraping */}
      <meta name="robots" content="noai, noimageai" />
      <meta name="googlebot" content="noai, noimageai" />

      {/* OpenAI GPTBot */}
      <meta name="gptbot" content="noindex, nofollow" />

      {/* Anthropic Claude */}
      <meta name="anthropic-ai" content="noindex, nofollow" />

      {/* Google Bard/Gemini Extended */}
      <meta name="google-extended" content="noindex, nofollow" />

      {/* Common Crawl (used by many AI trainers) */}
      <meta name="ccbot" content="noindex, nofollow" />

      {/* Prevent content from being used in AI training */}
      <meta name="ai-content-declaration" content="not-for-training" />

      {/* Copyright and licensing */}
      <meta name="copyright" content="© Elevate for Humanity. All rights reserved." />
      <meta name="license" content="Proprietary - Unauthorized use prohibited" />

      {/* Prevent caching by scrapers */}
      <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
      <meta httpEquiv="Pragma" content="no-cache" />
      <meta httpEquiv="Expires" content="0" />
    </>
  );
}
