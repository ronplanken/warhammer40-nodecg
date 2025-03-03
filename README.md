# Warhammer 40k NodeCG Bundle

A [NodeCG](http://github.com/nodecg/nodecg) bundle designed for streaming Warhammer 40k tabletop games. This bundle provides graphical overlays for player information, scores, round tracking, and more.

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
2. Clone this repository to `nodecg/bundles/warhammer-40k`
3. Install dependencies: `cd nodecg/bundles/warhammer-40k && npm install`
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

MIT License

Copyright (c) 2023-2024

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
