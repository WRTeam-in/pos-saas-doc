#!/bin/bash
# Record tutorials against a site you own (for example your demo site), with your own logins.
# Passwords are typed here, never stored. Usage: ./scripts/tutorials/record-live.sh [slug ...|all]
set -e
cd "$(dirname "$0")/../.."

read -r -p "Site address [https://pos-saas.thewrteam.in]: " site
export TUTORIAL_BASE_URL="${site:-https://pos-saas.thewrteam.in}"

read -r -p "Business owner email: " TUTORIAL_SHOP_EMAIL
read -r -s -p "Business owner password: " TUTORIAL_SHOP_PASSWORD; echo
read -r -p "Platform admin email (blank to skip the Super Admin videos): " TUTORIAL_ADMIN_EMAIL
if [ -n "$TUTORIAL_ADMIN_EMAIL" ]; then read -r -s -p "Platform admin password: " TUTORIAL_ADMIN_PASSWORD; echo; fi
export TUTORIAL_SHOP_EMAIL TUTORIAL_SHOP_PASSWORD TUTORIAL_ADMIN_EMAIL TUTORIAL_ADMIN_PASSWORD
export TUTORIAL_SKIP_SQL=1   # the local-database reset steps do not apply to a live site

echo "Recording on $TUTORIAL_BASE_URL. Videos that create data (sales, products, ...) add it to this site."
node scripts/tutorials/run.js "${@:-product-overview}"
