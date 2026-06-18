# PokeMMO Team Builder

## Introduction
Welcome to the official repository for the PokeMMO Team Builder! This web-based tool is specifically designed to assist PokeMMO players in building and managing their teams efficiently. It incorporates features that cater directly to the unique elements of PokeMMO, providing a tailored experience that ensures compatibility with the game's current mechanics.

## Features
- **Save/Load Teams**: Save and load your teams to a server-side SQLite database, allowing teams to persist across browsers and be shared within a self-hosted instance.
- **Import/Export Compatibility**: Supports importing and exporting teams in the popular Showdown/Pokepaste format, making it easy to share and modify teams.
- **PokeMMO-Specific Filters**: Ensures that only Pokémon, moves, and items available in PokeMMO are selectable, maintaining game-specific accuracy.
- **Hidden Power Type Selection**: Allows for easy selection and modification of a Pokémon's Hidden Power type.
- **Alpha Toggle**: Provides the option to mark Pokémon as Alpha, reflecting PokeMMO's unique gameplay elements.

## Self-Hosted Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)

### Install & Run
```bash
npm install
npm run build    # Build the frontend
npm start        # Start the server on port 3000
```

Then open `http://localhost:3000` in your browser.

### Development
```bash
npm run dev      # Runs both Vite dev server (with HMR) and the API server concurrently
```

### How It Works
- **Frontend**: Served by Vite in dev mode, or as static files from `dist/` in production.
- **Backend**: Express server with a SQLite database (`data/teams.db`) for team storage. No external database services required.
- **API**: REST endpoints at `/api/teams` for CRUD operations on saved teams.

## Contributing
Contributions to the PokeMMO Team Builder are welcome! Whether it's fixing bugs, adding new features, or improving documentation, we appreciate your help. To contribute:
1. Fork the repository.
2. Create a new branch for your feature (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a new Pull Request.

## Future Plans
The PokeMMO Team Builder will eventually be replaced by a more advanced tool. In preparation for this transition, this project will be open-sourced as a learning resource and will not receive major updates. We encourage the community to learn from and utilize this codebase for educational purposes.

## Feedback
If you have suggestions or encounter issues, please file them as issues on this GitHub repository or discuss them on our [Discord server](https://discord.pokemmo.zone).

Thank you for supporting the PokeMMO Team Builder!
