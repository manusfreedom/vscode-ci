# vscode-ci

Source code for the VS Code extension **PHP intellisense for codeigniter**.

The extension package and metadata live in `client/`.
The language server implementation lives in `server/`.

## Quick Start

Install dependencies:

```bash
yarn install
```

Compile both sides:

```bash
yarn --cwd client run compile
yarn --cwd server run compile
```

Bundle server for release:

```bash
yarn --cwd server run webpack-pro
```

## Build VSIX

Primary command:

```bash
yarn --cwd client run package:vsix
```

Notes:

- `package:vsix` builds server/client and syncs `LICENSE` from repo root into `client/LICENSE` before packaging.
- `@vscode/vsce` currently requires a newer Node runtime than Node 16 in some environments.
- If your default Node is old, run packaging with Node 20:

```bash
cd client
npx -y node@20 /usr/local/lib/node_modules/npm/bin/npm-cli.js exec --yes @vscode/vsce -- package --no-yarn
```

Output artifact:

- `client/php-ci-<version>.vsix`

## Documentation

Extension usage documentation is in `client/README.md`.