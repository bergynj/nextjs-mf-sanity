# pnpm Enforcement Configuration

## Overview

This document outlines how to enforce `pnpm` as the only package manager in the Nx monorepo.

## Configuration Files

### 1. `.npmrc` (Root)

Create `.npmrc` at the workspace root:

```
engine-strict=true
auto-install-peers=true
strict-peer-dependencies=false
shamefully-hoist=false
```

**Key settings:**
- `engine-strict=true` - Enforces Node.js version from package.json
- `auto-install-peers=true` - Automatically installs peer dependencies
- `strict-peer-dependencies=false` - Allows some peer dependency flexibility (adjust as needed)
- `shamefully-hoist=false` - Uses pnpm's strict module resolution (better for monorepos)

### 2. `package.json` - packageManager Field

Add to root `package.json`:

```json
{
  "packageManager": "pnpm@9.0.0",
  "engines": {
    "node": ">=18.0.0",
    "pnpm": ">=9.0.0"
  },
  "scripts": {
    "preinstall": "npx only-allow pnpm"
  }
}
```

### 3. `.nvmrc` (Optional but Recommended)

Create `.nvmrc` to specify Node.js version:

```
18
```

### 4. `only-allow` Package

Install `only-allow` as a dev dependency:

```bash
pnpm add -D -w only-allow
```

This package prevents npm/yarn from being used and shows a helpful error message.

## Nx Configuration

### `nx.json` - Package Manager

Ensure `nx.json` specifies pnpm:

```json
{
  "cli": {
    "packageManager": "pnpm"
  },
  "npmScope": "schema-ui",
  "tasksRunnerOptions": {
    "default": {
      "runner": "nx/tasks-runners/default",
      "options": {
        "cacheableOperations": ["build", "lint", "test", "typecheck"]
      }
    }
  }
}
```

## Verification

### Check pnpm Version

```bash
pnpm --version
```

### Verify Enforcement

Try using npm/yarn - you should see an error:

```bash
npm install
# Error: Use "pnpm install" for installation in this project
```

## Migration Commands

All commands should use `pnpm`:

```bash
# Install dependencies
pnpm install

# Add dependency to workspace root
pnpm add -w <package>

# Add dependency to specific library
pnpm add --filter @schema-ui/shared <package>

# Add dev dependency
pnpm add -D -w <package>

# Run scripts
pnpm run <script>

# Nx commands (pnpm is automatically used)
pnpm nx <command>
```

## CI/CD Configuration

### GitHub Actions Example

```yaml
name: CI

on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm nx build
```

## Benefits of pnpm in Monorepos

1. **Disk Space**: Shared dependency store saves disk space
2. **Speed**: Faster installs due to content-addressable storage
3. **Strictness**: Better dependency resolution prevents phantom dependencies
4. **Monorepo Support**: Built-in workspace support (no need for Lerna/Rush)
5. **Nx Integration**: Nx has excellent pnpm support

## Troubleshooting

### Issue: "pnpm: command not found"

**Solution**: Install pnpm globally:
```bash
npm install -g pnpm
# or
corepack enable
corepack prepare pnpm@9.0.0 --activate
```

### Issue: Lock file conflicts

**Solution**: Always commit `pnpm-lock.yaml` and use `pnpm install --frozen-lockfile` in CI.

### Issue: Peer dependency warnings

**Solution**: Adjust `strict-peer-dependencies` in `.npmrc` or add missing peer dependencies.

## Additional Resources

- [pnpm Documentation](https://pnpm.io/)
- [pnpm Workspaces](https://pnpm.io/workspaces)
- [Nx pnpm Support](https://nx.dev/nx-api/nx/documents/package-manager)
