# Dhairya Gogri — Personal Website v2

A static, multi-page personal portfolio redesign for GitHub Pages.

## Design direction
- Sophisticated dark/light visual system
- Responsive layout
- Accessible semantic HTML
- Vanilla CSS/JS; no build step
- Interactive theme toggle
- Command palette (Ctrl/Cmd + K)
- Project filtering
- Expandable experience timeline
- Contact form that prepares a mailto draft
- SEO basics: descriptions, robots.txt and sitemap.xml

## Pages
- index.html
- about.html
- experience.html
- projects.html
- company.html
- contact.html
- privacy.html
- 404.html

## Before publishing
1. Verify the resume link on the Home page points to your current CV PDF.
2. Verify the public LinkedIn/GitHub destinations.
3. Replace any placeholder content with newly confirmed information.
4. Review the company description against the services you actually intend to offer.
5. Optional: add a profile photo at `assets/profile.jpg` and update the hero markup.

## Local run
Because the site is static, you can open index.html directly, but a local HTTP server is better:

Python:
`python -m http.server 8000`

Then visit:
`http://localhost:8000`

## GitHub Pages
1. Create/update the repository used for your GitHub Pages site.
2. Copy the website files into the repository root.
3. Commit and push to the branch configured for Pages.
4. In GitHub: Settings → Pages → choose the deployment source.
5. Wait for the Pages deployment, then open the published URL.

No npm install/build is required.

## Design notes
The company is presented as a founder/venture layer within a personal portfolio rather than as a separate corporate website. The company number and registered office are shown on the company page for credibility, while legal SIC descriptions are intentionally translated into plain-English capability areas.
