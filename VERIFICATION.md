# Verification Notes

- Desktop full-page screenshot: hero, pinned story scene, menu cards, final CTA, and footer all render in the expected visual order.
- Mobile viewport (390 × 844): logo, WhatsApp CTA, hero copy, stamp, and scroll cue remain visible and usable.
- Sticky scrollytelling implementation: `story-section` spans multiple viewport heights and `story-sticky` pins the visual while copy/image state follows scroll progress.
- CTA target: `https://wa.me/628993071991?text=Halo%20Haiki%20Bakso%20Bakar%2C%20saya%20mau%20pesan%20bakso%20bakar.`
- Assets are served from WebDev storage paths and the frontend TypeScript check reports no errors.
