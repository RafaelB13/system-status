# ============================================================================
# System Status — Makefile
# ============================================================================

# Variables
NODE_BIN   := ./node_modules/.bin
TSC        := $(NODE_BIN)/tsc
TSC_ALIAS  := $(NODE_BIN)/tsc-alias
ELECTRON   := $(NODE_BIN)/electron
EB         := $(NODE_BIN)/electron-builder
DIST_DIR   := dist
RELEASE_DIR := release

# Colors
GREEN  := \033[0;32m
YELLOW := \033[0;33m
CYAN   := \033[0;36m
RESET  := \033[0m

# ============================================================================
# Main targets
# ============================================================================

.PHONY: help install build start dist clean rebuild lint check

## Show this help
help:
	@echo ""
	@echo "$(CYAN)⚙️  System Status — Available commands$(RESET)"
	@echo ""
	@grep -E '^## ' Makefile | sed 's/^## /  /' | while read -r line; do \
		read -r target < /dev/stdin || true; \
		echo ""; \
	done
	@echo "  $(GREEN)make install$(RESET)    Install dependencies"
	@echo "  $(GREEN)make build$(RESET)      Compile TypeScript + resolve aliases"
	@echo "  $(GREEN)make start$(RESET)      Build and run with Electron"
	@echo "  $(GREEN)make dist$(RESET)       Build and package as .dmg"
	@echo "  $(GREEN)make clean$(RESET)      Remove build artifacts"
	@echo "  $(GREEN)make rebuild$(RESET)    Clean + build"
	@echo "  $(GREEN)make check$(RESET)      Type-check without emitting files"
	@echo ""

# ============================================================================
# Development
# ============================================================================

## Install dependencies
install:
	@echo "$(YELLOW)📦 Installing dependencies...$(RESET)"
	npm install
	@echo "$(GREEN)✅ Dependencies installed$(RESET)"

## Compile TypeScript and resolve path aliases
build:
	@echo "$(YELLOW)🔨 Compiling TypeScript...$(RESET)"
	$(TSC)
	$(TSC_ALIAS)
	@echo "$(GREEN)✅ Build complete → $(DIST_DIR)/$(RESET)"

## Build and run with Electron
start: build
	@echo "$(YELLOW)🚀 Starting Electron app...$(RESET)"
	$(ELECTRON) .

## Type-check without emitting files
check:
	@echo "$(YELLOW)🔍 Type-checking...$(RESET)"
	$(TSC) --noEmit
	@echo "$(GREEN)✅ No type errors$(RESET)"

# ============================================================================
# Distribution
# ============================================================================

## Build and package as .dmg
dist: build
	@echo "$(YELLOW)📦 Packaging app...$(RESET)"
	$(EB)
	@echo "$(GREEN)✅ Package ready → $(RELEASE_DIR)/$(RESET)"

# ============================================================================
# Cleanup
# ============================================================================

## Remove build artifacts (dist/ and release/)
clean:
	@echo "$(YELLOW)🧹 Cleaning build artifacts...$(RESET)"
	rm -rf $(DIST_DIR) $(RELEASE_DIR)
	@echo "$(GREEN)✅ Clean$(RESET)"

## Clean and rebuild
rebuild: clean build
