## WHY I USED STYLED -COMPONENTS-CSS-IN JS

I used styled-components (CSS-in-JS) to keep styles scoped to individual components, preventing global CSS conflicts.
It allows dynamic styling via props, which is useful for variants like primary/secondary buttons and conditional states.
Styled-components integrates well with TypeScript, enabling typed style props and better developer experience.
Co-locating styles with components improves readability and maintainability for complex UI (tables, modals, forms).
This approach scales well for future needs like theming and dark mode without restructuring CSS.

## For Mocking I used MSW

I chose MSW because it lets me mock APIs at the network layer (same as real backend calls), without changing frontend code.
It keeps my React + Redux code production-like: thunks still call real fetch("/api/...").
MSW makes it easy to simulate query params (pagination/sort/filter) and error/loading cases for better UX testing.
Compared to json-server, MSW is lightweight, needs no separate server process, and works well inside a frontend repo.
