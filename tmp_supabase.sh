#!/bin/bash
SK=$(cat /tmp/supabase_key.txt)
# Try GET on each endpoint using only apikey header (no Authorization)
ENDPOINTS=("admin/config" "admin/settings" "config" "settings")
for ep in "${ENDPOINTS[@]}"; do
  echo "=== GET /auth/v1/$ep ==="
  http_code=$(curl -s -o /tmp/supabase_resp.txt -w "%{http_code}" \
    "https://arqpibdwiwqjevkjmejo.supabase.co/auth/v1/$ep" \
    -H "apikey: $SK")
  echo "HTTP $http_code"
  head -c 300 /tmp/supabase_resp.txt
  echo ""
  echo ""
done
