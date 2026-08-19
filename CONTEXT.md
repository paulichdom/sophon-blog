# Sophon Blog

Frontend for Sophon, a RealWorld-style social blogging platform. Renders and edits the same domain the `sophon-api` backend owns: Users write and follow each other's Articles, favorite them, comment on them, and can draft new Articles with AI assistance. This app is a consumer of that domain, not its owner — canonical definitions live in `sophon-api`'s `CONTEXT.md`; terms below are restated here for local readability plus a couple of frontend-only concepts.

## Language

**Current User**:
The signed-in visitor, as cached client-side in `useAuthStore` and confirmed by the `/users/whoami` query. Distinct from a **Profile**, which is how any user (including the current one) is displayed to others.
_Avoid_: Auth user, logged-in user

**Profile**:
The public-facing identity of a User — username, bio, image, follower state — as rendered on bylines, the profile page, and the header menu.
_Avoid_: Account

**Article**:
A piece of content authored by one User, addressed by its slug, editable in the `ArticleEditor` (TipTap-based rich text).
_Avoid_: Post, Blog post

**Draft**:
An in-progress Article in the editor that has not yet been saved via `createArticle`/`updateArticle`. Includes both a manually-written draft and a **Generated Article** the AI has produced but the user hasn't accepted yet.
_Avoid_: Unsaved article

**Generated Article**:
An AI-produced Article draft (title, description, body, tags) returned by `generateArticle` from a free-text prompt, surfaced through `ArticleGenerator` for the user to review/edit before saving.
_Avoid_: AI article

**Favorite**:
A Current User's bookmark on an Article, toggled via `use-favorite-article`.
_Avoid_: Like, Bookmark

**Follow**:
A directed relationship from the Current User to another User's Profile, toggled via `use-follow-user-profile`. Distinct from Favorite, which targets Articles.
_Avoid_: Subscribe

**Comment**:
A User's reply on an Article, authored inline via `CommentEditor` and listed in `CommentsSection`.

**Tag**:
A label attached to an Article for categorization; shown on `ArticleCard`/`ArticleItem` and set in the editor.
