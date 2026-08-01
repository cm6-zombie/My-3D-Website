# Production update

This version applies the requested project catalogue changes:

- Added detailed Overview, Scope of work, and Technologies used for Google Form Automation, XFlix, Wikipedia Automation, Amazon Store Automation, XQuiz, and QCalc.
- Featured: QTrip QA, QCalc, Amazon Store Automation, Flipkart Automation, LeetCode Automation, and YouTube Automation.
- Removed CI/CD Pipeline with Jenkins, Test Automation with Apache POI, and WhatsApp Automation from live and fallback project data.
- Added server-side filtering for those removed records and retained CSS/Chakra-content filtering.
- Featured projects are sorted before regular projects.
- Added production UI for Featured Project, Scope of work, and Technologies used.
## Crio skills synchronization
- Preserves the existing Skills card design and existing category order.
- Extracts technology skills from synchronized Crio project records in the browser.
- Normalizes common aliases such as Selenium/Selenium WebDriver, POM/Page Object Model, and OOP/Object-Oriented Programming.
- Merges skills without duplicates.
- Adds **Web Automation** and **Software Engineering** cards only when matching Crio skills exist.
- Rejects CSS/Chakra fragments and ignores unknown non-technology labels.
- Continues refreshing through the existing background Crio synchronization interval.
