# Testing checklist

## Automated/local checks
Run from the website folder:

### Serve
`python -m http.server 8000`

### Check pages
Open:
- /
- /about.html
- /experience.html
- /projects.html
- /company.html
- /contact.html
- /privacy.html
- /404.html

### Broken-link check
A quick shell check for internal HTML references:
`grep -RhoE 'href="[^"#]+' . | cut -d'"' -f2 | grep -E '\.html$' | sort -u`

Verify every returned local `.html` file exists.

## Browser checks
Test in:
- Chrome desktop
- Edge desktop
- Safari/iPhone or Chrome mobile
- 320px, 768px, 1024px and 1440px widths

Check:
- mobile menu opens/closes
- theme toggle persists after refresh
- Ctrl/Cmd + K opens command palette
- project filters work
- experience cards expand/collapse
- contact form opens an email draft
- keyboard can reach all interactive controls
- visible focus states appear
- reduced-motion setting does not produce excessive animation

## Accessibility
Use Lighthouse or WAVE and review:
- page titles
- colour contrast
- heading hierarchy
- keyboard navigation
- form labels
- alt text if images are added later
- skip link
