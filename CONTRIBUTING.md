# Contributing to Demi Tech Solutions

Thank you for your interest in contributing to the **Demi Tech Solutions** platform. We hold our codebase to the same rigorous engineering standards as our physical security installations, telematics, and structured cabling deployments.

---

## 1. Code of Conduct & Standards

- **Minimalist Aesthetic:** Adhere strictly to the black-and-white, high-contrast engineering visual identity. Do not introduce bright, arbitrary accent colors without design approval.
- **Strict Typing:** All components and utility functions must be fully typed in TypeScript. Avoid `any` types. Standard enums and exported interfaces only.
- **Real-World Integrity:** Never introduce fake customer testimonials, fabricated certification logos, or deceptive marketing copy. All metrics and engineering specifications must reflect verifiable technical reality.
- **Security First:** Never commit API secrets, private keys, or passwords. All Safaricom Daraja credentials must be ingested exclusively via server-side environment variables.

---

## 2. Development Workflow

1. **Fork or Branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Run Development Server:**
   ```bash
   npm run dev
   ```

3. **Verify Strict Compilation & Linting:**
   ```bash
   npm run lint
   ```
   *Note: All code must compile cleanly with `tsc --noEmit` before submitting a PR.*

4. **Verify Bundle Footprint:**
   ```bash
   npm run build
   ```
   Ensure no new heavy dependencies bloat the client bundle. Use dynamic imports (`React.lazy`) for any new modals, complex charts, or heavy utilities.

---

## 3. Pull Request Guidelines

- Provide a concise description of what the PR accomplishes and why.
- Ensure all automated checks pass.
- Maintain responsive behavior across mobile viewports (360px width upwards).
- Preserve existing cPanel and Apache `.htaccess` compatibility.

---

For technical queries, reach out to the Demi Tech Solutions engineering team at `solutions@demitechsolutions.com`.
