# Silent fallback behaviour

The public portfolio never displays API errors, token instructions, scraper warnings, or synchronization failures.

- GitHub, LeetCode, Crio and configuration data refresh in the background.
- The browser stores the last successful response in localStorage and reuses it indefinitely when a third-party service is unavailable.
- Server routes return safe HTTP 200 fallback payloads instead of public error messages.
- Crio always falls back to the verified project catalogue in `lib/profile.ts`.
- GitHub contribution data renders a neutral grid when live GraphQL data is unavailable.
- Technical failures are intentionally invisible to visitors.
