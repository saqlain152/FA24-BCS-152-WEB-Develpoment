# CSC336 Lab Midterm — Kith NYC replica

Reference Website: KITH NYC
Live Reference URL: https://kith.com/?srsltid=AYCX9vKsa8LnmS0Q2Unyo11dGjrphukCcN7e7KtpJCJXXXjd2Uya0N5L

## Personal numbers

| | |
|---|---|
| Name | Saqlain Ali Sattar |
| Roll number | FA24-BCS-152 |
| N | 52 |
| BP = 600 + N | 652px |
| H = (N × 7) mod 360 | 364 mod 360 = 4° → accent `hsl(4, 70%, 45%)` (red) |
| K = (N mod 3) + 3 | 4 mega-menu columns |
| Cart limit = (N mod 4) + 2 | 2 per product |
| Delivery dates | exam date 2026-10-29 to N = 52 days later, 2026-12-20 |

Where these live, for the live check:
- **BP:** the `@media` rules in `style.css` that use `652px` / `651.98px` (sections 5, 11 and 13). CSS variables can't be used inside media queries, so change each one by hand.
- **K:** `--mega-cols` at the top of `style.css`. To change it you also need to add or remove a `.mega-col` in `index.html` and a matching `<details>` in the mobile menu.
- **H:** `--accent-hue` at the top of `style.css`.
- **Limit:** `MAX_PRODUCT_LIMIT` in `script.js`. Also update `max` on `#quantity-input` in `product.html`.
- **Dates:** `min` / `max` on `#delivery_date` in `checkout.html`.

## Files changed

`index.html`, `product.html`, `checkout.html`, `style.css`, `script.js`, `README.md` (renamed from `ReadME`)

## Task 1: Mega-menu (HTML + CSS only)

- The project was first built with N = 74 (the brief's example number). Every derived value is now switched to N = 52: the BP media queries, `--accent-hue`, `--mega-cols`, the cart limit and the delivery dates. For K = 4 the fifth group, "Accessories", was removed from the panel and from the phone menu.

- The hamburger used an inline `onclick` (JavaScript, which Task 1 doesn't allow) and didn't actually open anything. I replaced it with a hidden checkbox and a `<label>`. The rule `.nav-toggle:checked ~ .mobile-accordion-group` shows the menu. The collapsed menu is now a `<nav>`, holds the main links plus the K = 5 `<details>` groups (closed by default), and drops over the page instead of pushing it down.
- On the home page the header was `position: fixed`, so the announcement bar covered it. It is now `position: sticky` with `margin-bottom: -73px`, so it still sits over the first banner. The mega panel is positioned against `.site-header` (not `.header-inner`), so it really spans the full width.
- Between BP and 1024px the nav gaps and letter-spacing are smaller, so "Shop by Category" fits on one line at exactly BP.

## Task 2: Checkout (HTML5 validation only)

- Removed the inline `onsubmit="alert(...)"`, so the page has no JavaScript at all. A valid submit goes to `checkout.html#order-placed`, and `.order-placed-msg:target` shows a confirmation. The browser blocks the submit while any field is invalid.
- Legends are now exactly "Contact" and "Delivery", as the brief asks.
- The delivery-date error showed on page load, because `:not(:placeholder-shown)` matches a date input (it has no placeholder). The fallback rule is now limited to `input[placeholder]`, and `:user-invalid` covers the rest.
- Added `min-width: 0` to the fieldsets and a narrower label column between BP and 1024px, so inputs aren't squashed at exactly BP.

## Task 3: Cart badge and mini-cart (plain JavaScript)

- Clicks only `button.add-to-cart-btn` elements. Before this, the "View" links on the product page were hijacked: they said "Add to Cart" and added the item instead of opening it.
- Add to Cart now actually opens the mini-cart. Before, the same click bubbled up to the "click outside closes it" handler and closed it immediately. "Remove" also keeps the panel open now. Escape closes it, and the icon has `aria-expanded`.
- Cart rows are built with `textContent` instead of `innerHTML`. A `cartchange` event plus `CartAPI.getQty` / `CartAPI.limit` let the product page disable its big button at "Limit reached" and cap the quantity at the limit (2; it was a hard-coded 5 before).

## Other fixes

- The product page gallery thumbnails were always sneakers. They are now close-up crops of the product being shown, and clicking one loads a full-size image instead of the 400px thumbnail.
- The duffle's product-page title now matches its card ("Kith Suede Weekender Duffle"), so both count toward the same per-product limit.
- On phones, the product and checkout pages keep their "← Back to Store" link, because they have no hamburger menu.

## AI tools used

Claude Code (Anthropic Claude)
