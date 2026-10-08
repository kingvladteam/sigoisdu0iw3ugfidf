<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Book ordering availability is stored separately from price in the books table and shared across catalog, details, cart and order validation, so upcoming titles cannot be purchased accidentally.
- New-book announcements use the live catalog and session-scoped dismissal, so they stop appearing when the book becomes orderable or hidden.
