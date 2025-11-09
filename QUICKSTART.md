# Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Start Development Server

```bash
npm run dev
```

### Step 3: Open in Browser

Navigate to [http://localhost:3000](http://localhost:3000)

### Step 4: Connect Wallet

1. Install [MetaMask](https://metamask.io/) browser extension
2. Click "Connect Wallet" in the dashboard
3. Approve the connection in MetaMask

### Step 5: Register Your First IP

1. Click "Register IP" in the navigation
2. Fill in the form:
   - Title: "My First IP"
   - Description: "A test IP asset"
   - Select tags (optional)
   - Choose a license type
3. Click "Register IP"
4. Wait for the mock minting process (1-2 seconds)

### Step 6: View Your IP Graph

1. Click "IP Graph" in the navigation
2. See your IP visualized as a node
3. Click on the node to view details

### Step 7: Create a Remix

1. Go to "My Assets" or "Discover"
2. Click "Create Remix" on any IP
3. Fill in the remix details
4. Submit and see the relationship in the graph!

## 🎯 Demo Scenarios

### Scenario 1: Original → Remix → Derivative

1. Register an original IP (e.g., "Original Song")
2. Create a remix of it (e.g., "Remix Version")
3. Create a derivative of the remix (e.g., "Extended Mix")
4. View the full lineage in the IP Graph

### Scenario 2: Multiple Remixes

1. Register an original IP
2. Create multiple remixes from the same original
3. See all remixes branching from the original in the graph

### Scenario 3: Track Revenue

1. Register IPs with different license types
2. Check the royalty percentages in "My Assets"
3. View total revenue in the stats bar

## 💡 Tips

- **Graph Navigation**: Drag nodes to rearrange the graph
- **Node Colors**: 
  - 🔵 Blue = Original
  - 🟢 Green = Remix
  - 🟣 Purple = Derivative
- **Data Persistence**: All IPs are saved to localStorage
- **Wallet**: You can use any EVM-compatible wallet (MetaMask recommended)

## 🐛 Troubleshooting

### Wallet Not Connecting
- Make sure MetaMask is installed and unlocked
- Check that you're on a supported network
- Try refreshing the page

### Graph Not Showing
- Make sure you have at least one IP registered
- Check browser console for errors
- Try refreshing the page

### IPs Not Saving
- Check browser localStorage is enabled
- Clear localStorage and try again: `localStorage.clear()`

## 📚 Next Steps

- Read the full [README.md](./README.md) for detailed documentation
- Explore the codebase structure
- Customize the license types and royalty percentages
- Integrate with real Story Protocol contracts

---

**Happy IP Creating! 🎨**

