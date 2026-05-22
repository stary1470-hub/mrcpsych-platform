#!/bin/bash
# Add env vars to Vercel - run from project root
set -e

add_env() {
  local name="$1"
  local value="$2"
  local sensitive="$3"  # "sensitive" or "plain"
  local env="$4"        # "production", "preview", "development"

  echo "Adding $name ($env)..."

  if [ "$sensitive" = "plain" ]; then
    npx vercel env add "$name" "$env" --no-sensitive --value "$value" --yes 2>&1 || true
  else
    npx vercel env add "$name" "$env" --value "$value" --yes 2>&1 || true
  fi
}

# Source .env.local
set -a
source ../.env.local
set +a

# NEXT_PUBLIC vars (plain/readable)
for env in production preview development; do
  add_env "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY" "$NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY" "plain" "$env"
done

# Secret keys
for env in production preview development; do
  add_env "STRIPE_SECRET_KEY" "$STRIPE_SECRET_KEY" "sensitive" "$env"
  add_env "STRIPE_WEBHOOK_SECRET" "$STRIPE_WEBHOOK_SECRET" "sensitive" "$env"
  add_env "STRIPE_PRICE_PAPER_A_MONTHLY" "$STRIPE_PRICE_PAPER_A_MONTHLY" "sensitive" "$env"
  add_env "STRIPE_PRICE_PAPER_A_CYCLE" "$STRIPE_PRICE_PAPER_A_CYCLE" "sensitive" "$env"
  add_env "STRIPE_PRICE_PAPER_B_MONTHLY" "$STRIPE_PRICE_PAPER_B_MONTHLY" "sensitive" "$env"
  add_env "STRIPE_PRICE_PAPER_B_CYCLE" "$STRIPE_PRICE_PAPER_B_CYCLE" "sensitive" "$env"
  add_env "STRIPE_PRICE_BUNDLE_MONTHLY" "$STRIPE_PRICE_BUNDLE_MONTHLY" "sensitive" "$env"
  add_env "STRIPE_PRICE_BUNDLE_CYCLE" "$STRIPE_PRICE_BUNDLE_CYCLE" "sensitive" "$env"
done

echo "Done!"
