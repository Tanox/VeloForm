# OpenSpec Documentation

## Architecture
Veloform Configurator is built strictly using modular Angular standards and Firebase NoSQL structures.
- **Frontend**: Angular v21 (Zoneless, Signals), Tailwind CSS.
- **State**: Reactive signals passing top-down.
- **Styles**: Unified `src/app/style.css` with dark/light themes. Global selectors omitted in favor of atomic utility classes.

## Data Schema (Firebase Blueprint)
```json
{
  "Configuration": {
    "userId": "string",
    "bikeType": "Road | MTB | Fold",
    "name": "string",
    "components": "Array<ConfigComponent>",
    "totalCost": "number",
    "estimatedWeight": "number"
  }
}
```

## Security & Rules
Role-based access is applied per configuration. Users can only fetch and mutate their own configurations, asserted via `existing().userId == request.auth.uid`.

## Deployment
Simulated deployment to Vercel and EdgeOne Edge nodes.
