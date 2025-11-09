# Story IP Dashboard

> Visualize, Manage, and Monetize Your Creative Graph

A web-based dashboard built on Story Protocol that lets users register, visualize, and control their digital intellectual property (IP) — code, media, datasets, AI models, or creative assets.

![Story IP Dashboard](https://img.shields.io/badge/Story-Protocol-blue) ![Next.js](https://img.shields.io/badge/Next.js-14-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38bdf8)

## 🎯 Project Overview

The Story IP Dashboard is an MVP that demonstrates how creators can:

- **Prove ownership** of their creations
- **Define licensing** terms for their work
- **Track derivatives** in an interactive graph
- **Earn royalties** through programmable licenses

## ✨ Features

### Core MVP Features

- ✅ **Wallet Integration** - Connect Story-compatible wallet via MetaMask
- ✅ **IP Registration** - Upload & mint asset metadata to Story Protocol
- ✅ **Smart Licensing** - Select license type (CC0, CC-BY, Commercial, etc.)
- ✅ **Graph Visualization** - D3.js-based visual IP lineage map
- ✅ **Dashboard View** - Manage originals, derivatives, remixes, and track usage
- ✅ **Mock Royalties** - Display simulated royalty flows for demo

### User Journey

1. **Connect & Register**
   - Connect wallet (MetaMask)
   - Upload file (code, image, doc)
   - Add metadata (title, description, tags, license)
   - Mint IP token via Story Protocol

2. **Visualize the IP Graph**
   - Interactive D3.js graph showing IP relationships
   - Color-coded nodes (Original, Remix, Derivative)
   - Hover/click to view details

3. **Manage & Track**
   - View owned IPs
   - Track derivatives and remixes
   - Monitor revenue (mock data)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- MetaMask browser extension (for wallet connection)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Story-IP
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React + Next.js 14 + Tailwind CSS |
| **Graph Visualization** | D3.js |
| **Blockchain Interaction** | ethers.js v6 |
| **State Management** | Zustand |
| **Storage** | localStorage (MVP) / IPFS (mock) |
| **Type Safety** | TypeScript |

## 📁 Project Structure

```
Story-IP/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/             # React components
│   ├── Dashboard.tsx       # Main dashboard
│   ├── WalletConnect.tsx   # Wallet connection
│   ├── IPRegistrationForm.tsx  # IP registration form
│   ├── IPGraph.tsx         # D3.js graph visualization
│   ├── AssetList.tsx       # Asset list component
│   └── IPDetailModal.tsx   # IP detail modal
├── store/                  # State management
│   ├── walletStore.ts      # Wallet state
│   └── ipStore.ts          # IP assets state
├── lib/                    # Utilities
│   └── storyProtocol.ts    # Mock Story Protocol integration
├── types/                  # TypeScript types
│   └── index.ts            # Type definitions
└── package.json            # Dependencies
```

## 🔑 Key Components

### Wallet Integration
- MetaMask wallet connection
- EVM-compatible wallet support
- Address display and disconnect functionality

### IP Registration
- File upload (mock IPFS integration)
- Metadata input (title, description, tags)
- License type selection
- Parent IP selection for remixes

### Graph Visualization
- Force-directed graph using D3.js
- Color-coded nodes by IP type
- Interactive drag-and-drop
- Tooltips and click handlers

### Asset Management
- List view of all IPs
- Filter by creator
- View derivatives
- Create remixes

## 🧪 Story Protocol Integration

Currently, the dashboard uses **mock Story Protocol integration** for demonstration purposes. The `StoryProtocolService` class in `lib/storyProtocol.ts` simulates:

- IP asset minting
- Remix relationship registration
- Royalty calculations
- IPFS file uploads

### Future Integration

To connect to real Story Protocol contracts:

1. Update `lib/storyProtocol.ts` with actual contract addresses
2. Implement real contract interactions using ethers.js
3. Connect to Story Protocol testnet/mainnet
4. Replace mock IPFS with real IPFS service (Pinata, Web3.Storage)

## 🎨 License Types

The dashboard supports multiple license types:

- **CC0** - Public Domain (0% royalties)
- **CC-BY** - Attribution Required (2% royalties)
- **CC-BY-SA** - Attribution + Share Alike (3% royalties)
- **Commercial** - Commercial Use Allowed (10% royalties)
- **Remix-Allowed** - Remix with Attribution (5% royalties)
- **Attribution-Only** - Attribution Only (1% royalties)

## 📊 Demo Flow

1. **Register Original IP**
   - Connect wallet
   - Navigate to "Register IP"
   - Fill in form and submit
   - View in "My Assets" or "IP Graph"

2. **Create Remix**
   - Find an IP in "Discover" or "My Assets"
   - Click "Create Remix"
   - Fill in remix details
   - See relationship in graph

3. **Visualize Graph**
   - Navigate to "IP Graph"
   - See all IPs and their relationships
   - Click nodes to view details
   - Drag nodes to rearrange

## 🔮 Future Scope

### Phase 2.0
- Real on-chain license enforcement
- Auto royalties and permissions
- Story Protocol testnet integration

### Phase 3.0
- Creator revenue dashboard
- Real-time earning tracker
- Payment processing

### Phase 4.0
- API for 3rd-party integrations
- GitHub, Figma, HuggingFace plugins
- Webhook support

### Phase 5.0
- AI ownership detection
- Detect derivative works using ML
- Similarity scoring

### Phase 6.0
- Marketplace layer
- Trade, rent, or license IP directly
- Auction system

## 🤝 Contributing

This is an MVP project. Contributions are welcome! Areas for improvement:

- Real Story Protocol contract integration
- Enhanced graph visualization
- Better error handling
- Unit tests
- E2E tests
- Performance optimization

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Story Protocol](https://www.story.foundation/) for the IP infrastructure vision
- [Next.js](https://nextjs.org/) for the amazing framework
- [D3.js](https://d3js.org/) for graph visualization
- [Tailwind CSS](https://tailwindcss.com/) for styling

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Built with ❤️ for the Story Protocol ecosystem**

