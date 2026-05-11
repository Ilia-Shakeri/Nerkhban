#!/bin/bash

echo "=========================================="
echo "Nerkhban Desktop App - Installation"
echo "=========================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}Error: package.json not found. Please run this script from the project root.${NC}"
    exit 1
fi

echo -e "${YELLOW}Step 1: Installing root dependencies...${NC}"
npm install
if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to install root dependencies${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Root dependencies installed${NC}"
echo ""

echo -e "${YELLOW}Step 2: Installing frontend dependencies...${NC}"
cd frontend
npm install
if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to install frontend dependencies${NC}"
    exit 1
fi
cd ..
echo -e "${GREEN}✓ Frontend dependencies installed${NC}"
echo ""

echo -e "${YELLOW}Step 3: Checking WSLg availability...${NC}"
if [ -z "$DISPLAY" ]; then
    echo -e "${YELLOW}Warning: DISPLAY variable not set${NC}"
    echo -e "${YELLOW}WSLg might not be available. Electron window may not open.${NC}"
    echo -e "${YELLOW}To fix: Ensure you're using WSL 2 with Windows 11 or Windows 10 with WSLg support${NC}"
else
    echo -e "${GREEN}✓ DISPLAY is set to: $DISPLAY${NC}"
fi
echo ""

echo "=========================================="
echo -e "${GREEN}Installation Complete!${NC}"
echo "=========================================="
echo ""
echo "To start the application:"
echo "  npm run dev"
echo ""
echo "Or run separately:"
echo "  Terminal 1: cd frontend && npm run dev"
echo "  Terminal 2: npm run electron"
echo ""
echo "Documentation:"
echo "  - FINAL_FIX_REPORT.md - Complete fix documentation"
echo "  - COMPREHENSIVE_AUDIT_REPORT.md - Detailed audit"
echo "  - QUICK_START.md - User guide"
echo ""
