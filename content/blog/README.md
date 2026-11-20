# Blog posts

Each post is one markdown file in this folder. The file name is the post's address:
`content/blog/working-from-gardens.md` becomes `coworkcapetown.com/blog/working-from-gardens`.
Keep old WordPress addresses by using the same slug.

## Add a post

1. Copy `_template.md` (files starting with `_`, and this README, are never published).
2. Fill in the frontmatter between the `---` lines, then write the post in markdown below it.
3. Put photos in `public/images/blog/` (WebP, under 200 KB) and use `/images/blog/name.webp`.
4. Commit and push: the site rebuilds and the post is live as a static page.

Rules: British English, no em dashes, never invent prices, sizes, terms or hours (`[brackets]` for anything
unconfirmed). No author name: the site has no named authors.

## Frontmatter

| Field | Required | Notes |
|---|---|---|
| `title` | yes | The H1, with the post's keyword in it |
| `description` | yes | Meta description, about 150 characters |
| `date` | yes | Published, `YYYY-MM-DD` |
| `updated` | no | Last updated, `YYYY-MM-DD` |
| `category` | yes | Drives the category chips and "More in" links |
| `image` | no | Featured image, 16:9 |
| `imageAlt` | if image | Describe the photo |
| `excerpt` | no | One line for cards; defaults to the first paragraph |
| `faqs` | no | A list of `q` / `a` pairs: shown as "Questions about this" with FAQPage schema |

`## Headings` in the body become the contents list. An image's title becomes its caption:
`![Alt text](/images/blog/photo.webp "Caption")`.

A web upload screen (a git-based editor writing these same files) can be added later.
