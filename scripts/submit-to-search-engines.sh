#!/bin/bash

SITEMAP_URL="https://sorrybob.net/sitemap.xml"

echo "🚀 Submitting sitemap to search engines..."

# Submit to Google
echo "📡 Submitting to Google..."
curl -s "https://www.google.com/ping?sitemap=$SITEMAP_URL"
echo ""

# Submit to Bing
echo "📡 Submitting to Bing..."
curl -s "https://www.bing.com/ping?sitemap=$SITEMAP_URL"
echo ""

echo "✅ Submission complete!"
