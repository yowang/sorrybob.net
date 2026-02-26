#!/bin/bash

# Sentry Quick Setup Script for Sorry Bob
# This script helps you quickly configure Sentry for your project

set -e

echo "🚀 Sentry Setup for Sorry Bob"
echo "================================"
echo ""

# Check if .env.local exists
if [ -f ".env.local" ]; then
    echo "✅ .env.local already exists"
    echo ""
    cat .env.local
    echo ""
    read -p "Do you want to update the DSN? (y/N) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Skipping DSN update"
        exit 0
    fi
fi

# Ask for DSN
echo "📝 Please provide your Sentry DSN"
echo "   (You can find it in your Sentry project settings)"
echo ""
read -p "Enter Sentry DSN: " DSN

if [ -z "$DSN" ]; then
    echo "❌ DSN cannot be empty"
    exit 1
fi

# Create .env.local
echo "Creating .env.local..."
cat > .env.local <<EOF
# Sentry Configuration
# Created at: $(date)

NEXT_PUBLIC_SENTRY_DSN=$DSSN
EOF

echo ""
echo "✅ .env.local created successfully!"
echo ""

# Install dependencies
echo "📦 Installing @sentry/nextjs..."
npm install @sentry/nextjs

echo ""
echo "✅ Sentry setup complete!"
echo ""
echo "📋 Next steps:"
echo "   1. Run: npm run dev"
echo "   2. Visit: http://localhost:3000/scripts/test-sentry.html"
echo "   3. Click the test buttons to verify Sentry is working"
echo "   4. Check your Sentry Dashboard to see captured errors"
echo ""
echo "📚 For more information, see SENTRY_SETUP.md"
