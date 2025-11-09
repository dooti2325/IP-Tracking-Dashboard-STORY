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

- ✅ **Wallet Integration** - Connect Story-compatible wallet via MetaMask with auto-reconnect
- ✅ **IP Registration** - Upload & mint asset metadata to Story Protocol
- ✅ **Smart Licensing** - Select license type (CC0, CC-BY, Commercial, etc.)
- ✅ **Graph Visualization** - D3.js-based visual IP lineage map with zoom/pan controls
- ✅ **Dashboard View** - Manage originals, derivatives, remixes, and track usage
- ✅ **Mock Royalties** - Display simulated royalty flows for demo

### Enhanced Features

- ✅ **Toast Notifications** - Beautiful, non-intrusive notifications for all actions
- ✅ **Advanced Search & Filter** - Search by title, creator, or tags with multi-filter support
- ✅ **Interactive Graph Controls** - Zoom in/out, pan, reset, and fit-to-view functionality
- ✅ **Data Export** - Export IP data in JSON, CSV, or graph-specific formats
- ✅ **Analytics Dashboard** - Comprehensive insights with charts and statistics
- ✅ **Loading States** - Skeleton screens for better UX during data loading
- ✅ **Responsive Design** - Fully responsive across desktop, tablet, and mobile

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

## 🎨 Dashboard Views

### IP Graph
- Interactive force-directed graph visualization
- Zoom controls (in/out, reset, fit to view)
- Real-time node dragging and repositioning
- Color-coded nodes by IP type
- Detailed tooltips on hover
- Visual legend for easy identification

### My Assets
- Comprehensive list of your registered IP assets
- Search and filter by license type, IP type, and tags
- Quick actions: view details, create remix
- Export functionality (JSON, CSV, Graph)
- Real-time statistics and revenue tracking

### Discover
- Browse all public IP assets
- Advanced filtering options
- Create remixes from discovered assets
- Detailed asset information modal

### Analytics
- Overview cards with key metrics
- License type distribution chart
- Popular tags analysis
- Most remixed asset highlights
- Revenue and royalty insights

### Register IP
- User-friendly form for IP registration
- File upload support (mock IPFS)
- Multiple license type options
- Tag-based categorization
- Parent IP selection for remixes

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
│   ├── layout.tsx         # Root layout with metadata
│   ├── ClientLayout.tsx   # Client-side wrapper for hooks
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles & animations
├── components/            # React components
│   ├── Dashboard.tsx      # Main dashboard with routing
│   ├── WalletConnect.tsx  # Wallet connection UI
│   ├── IPRegistrationForm.tsx  # IP registration form
│   ├── IPGraph.tsx        # D3.js graph with zoom controls
│   ├── AssetList.tsx      # Asset list with actions
│   ├── IPDetailModal.tsx  # IP detail modal
│   ├── SearchFilter.tsx   # Advanced search & filter
│   ├── ExportMenu.tsx     # Data export dropdown
│   ├── Analytics.tsx      # Analytics dashboard
│   ├── Toast.tsx          # Toast notification component
│   ├── ToastContainer.tsx # Toast container manager
│   └── LoadingSkeleton.tsx # Loading state skeletons
├── store/                 # Zustand state management
│   ├── walletStore.ts     # Wallet connection state
│   ├── ipStore.ts         # IP assets state
│   └── toastStore.ts      # Toast notifications state
├── lib/                   # Utilities
│   ├── storyProtocol.ts   # Mock Story Protocol service
│   └── exportUtils.ts     # Export functionality
├── hooks/                 # Custom React hooks
│   └── useAutoConnect.ts  # Auto wallet reconnection
├── types/                 # TypeScript definitions
│   ├── index.ts           # Core type definitions
│   └── ethereum.d.ts      # MetaMask/Ethereum types
└── package.json           # Dependencies
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
   - Use zoom controls to navigate
   - Click nodes to view details
   - Drag nodes to rearrange
   - Export graph data

4. **Search & Filter**
   - Use the search bar to find assets
   - Apply filters by license, type, or tags
   - Clear filters to reset view
   - Export filtered results

5. **View Analytics**
   - Navigate to "Analytics"
   - Review license distribution
   - Check popular tags
   - Identify top-performing assets
   - Export comprehensive reports

## 🎯 Key Enhancements

### Toast Notification System
Modern, non-intrusive notifications replace traditional alerts:
- Success notifications for completed actions
- Error messages with helpful context
- Warning alerts for required actions
- Info messages for system updates
- Auto-dismiss with manual close option

### Advanced Search & Filter
Powerful filtering system for finding assets:
- Full-text search across title, description, and creator
- Multi-select license type filtering
- IP type filtering (Original, Remix, Derivative)
- Tag-based filtering with AND logic
- Real-time results with filter count badge
- Clear all filters functionality

### Interactive Graph Controls
Enhanced D3.js visualization with:
- **Zoom In/Out** - Precise zoom controls
- **Pan** - Click and drag to navigate
- **Reset View** - Return to default position
- **Fit to View** - Auto-center all nodes
- **Zoom Level Indicator** - Current zoom percentage
- **Visual Legend** - Color-coded node types
- **Drag & Drop** - Reposition individual nodes

### Data Export Options
Export your IP data in multiple formats:
- **JSON** - Full data export with all metadata
- **CSV** - Spreadsheet-compatible format
- **Graph Data** - Nodes and links for external visualization tools
- Available on My Assets, Discover, and Analytics views

### Analytics Dashboard
Comprehensive insights including:
- **Overview Cards** - Total assets, revenue, derivatives, top license
- **License Distribution** - Visual breakdown with percentages
- **Popular Tags** - Top 5 most-used tags with rankings
- **Most Remixed Asset** - Highlight successful IP assets
- **Real-time Statistics** - Dynamic calculations

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

