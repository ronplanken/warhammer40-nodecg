# Board Report Warhammer 40k NodeCG Bundle

A [NodeCG](http://github.com/nodecg/nodecg) bundle designed for streaming Warhammer 40k tabletop games. This bundle provides graphical overlays for player information, scores, round tracking, and more.

## Board Report Channel

Created & Mainted for usage on the Board Report:

https://www.youtube.com/@boardreportchannel

## Features

- Player information displays
- Command Point (CP) tracking
- Score tracking for primary and secondary missions
- Round tracking using server-side replicants
- Support for both fixed and tactical mission types
- Discard and complete mission tracking
- Deployment phase information

## Installation

1. Install [NodeCG](https://www.nodecg.dev/docs/installing)
2. Clone this repository to `nodecg/bundles/board-report-warhammer-40k`
3. Install dependencies: `cd nodecg/bundles/board-report-warhammer-40k && npm install`
4. Start NodeCG: `cd ../.. && npm start`

## Development

### Available Scripts

- `npm run dev` - Start development environment
- `npm run build` - Build for production
- `npm run schema-types` - Generate TypeScript types from schemas
- `npm run format` - Format code with Prettier

### Technical Details

- Built with React and TypeScript
- Uses Vite for fast bundling and development
- State management via NodeCG replicants
- LESS styling for graphics
- Ant Design UI components

## Graphics

The bundle includes several graphics:

- Player info displays (horizontal and vertical)
- Score displays (total, primary, secondary)
- Command Point (CP) trackers
- Round information overlay
- Deployment phase overlay
- Comprehensive score screen for tracking rounds and missions

## Credits

- [NodeCG](https://github.com/nodecg/nodecg): Main framework. Made by Lange and contributors.

## License

This project is licensed under the **Creative Commons Attribution-NonCommercial 4.0 International License (CC BY-NC 4.0)**.

Copyright (c) 2023-2024

**You are free to:**

- **Share** — copy and redistribute the material in any medium or format
- **Adapt** — remix, transform, and build upon the material

The licensor cannot revoke these freedoms as long as you follow the license terms.

**Under the following terms:**

- **Attribution** — You must give appropriate credit, provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use.
- **NonCommercial** — You may not use the material for commercial purposes.

**No additional restrictions** — You may not apply legal terms or technological measures that legally restrict others from doing anything the license permits.

**Notices:**

You do not have to comply with the license for elements of the material in the public domain or where your use is permitted by an applicable exception or limitation.
No warranties are given. The license may not give you all of the permissions necessary for your intended use. For example, other rights such as publicity, privacy, or moral rights may limit how you use the material.

For the full license text, please see:
[https://creativecommons.org/licenses/by-nc/4.0/](https://creativecommons.org/licenses/by-nc/4.0/)
