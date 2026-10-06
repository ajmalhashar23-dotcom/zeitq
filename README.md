# ZEITQ AI Demo

Mobile-first patient access demo with branded login and sign-up, personal details and Emirates ID, hospital/clinic and doctor selection, consultation slots, insurance, documents, consent, registration QR, check-in, reception and live token dashboards.

## Run locally

Requires Python 3. From this folder run:

```sh
python3 -m http.server 8000
```

Open http://localhost:8000 in your browser. No build or npm installation is required.

## Demo login

Use the on-screen sample details and code 123456. Login and sign-up are simulated. All data stays in browser memory and is cleared on refresh. Use fictional patient information only. No hospital, insurer or official identity system is connected.

## Files

- index.html: application shell and login/sign-up screens
- styles.css: responsive mobile and desktop styling
- app.mjs: application views and event handlers
- model.mjs: demo registration state and actions
- visit.mjs: fictional providers, doctors, cabins and appointment slots
- tokens.mjs: per-doctor queue tracking
- confirmation.mjs: QR confirmation encoding and decoding
- assets/: supplied ZEITQ logo
- vendor/: QR generator and its third-party license

## QR confirmation origin

The demo currently generates QR links for the existing ZEITQ AI demo URL, defined as siteOrigin in app.mjs. If hosting elsewhere, update that value to your deployed origin (including any repository path). Adding source to GitHub alone does not change the existing hosted demo.
