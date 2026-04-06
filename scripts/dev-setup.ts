#!/usr/bin/env tsx
/**
 * Development Environment Setup for Identa
 *
 * Creates the local Kind cluster with ctlptl-managed registry.
 */

import { execSync, spawnSync } from 'child_process';
import { existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const c = {
  blue: '\x1b[34m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  reset: '\x1b[0m',
};

const log     = (msg: string) => console.log(`${c.blue}identa:${c.reset} ${msg}`);
const success = (msg: string) => console.log(`${c.green}✓${c.reset} ${msg}`);
const error   = (msg: string) => console.error(`${c.red}✗${c.reset} ${msg}`);
const warn    = (msg: string) => console.log(`${c.yellow}!${c.reset} ${msg}`);

function commandExists(cmd: string): boolean {
  return spawnSync('which', [cmd], { stdio: 'pipe' }).status === 0;
}

function checkPrerequisites(): boolean {
  log('Checking prerequisites...');
  let ok = true;

  for (const tool of ['docker', 'kubectl', 'kind', 'ctlptl', 'tilt', 'helm']) {
    if (commandExists(tool)) {
      success(`${tool} found`);
    } else {
      error(`${tool} not found — please install it`);
      ok = false;
    }
  }

  try {
    execSync('docker info', { stdio: 'pipe' });
    success('Docker daemon running');
  } catch {
    error('Docker daemon not running');
    ok = false;
  }

  return ok;
}

function clusterExists(): boolean {
  try {
    return execSync('kind get clusters', { encoding: 'utf-8' }).includes('kind');
  } catch {
    return false;
  }
}

function createCluster(): void {
  log('Creating Kind cluster with ctlptl registry...');
  const cfg = resolve(ROOT, 'kind/ctlptl-cluster.yaml');
  if (!existsSync(cfg)) {
    error(`Cluster config not found: ${cfg}`);
    process.exit(1);
  }
  try {
    execSync(`ctlptl apply -f ${cfg}`, { cwd: ROOT, stdio: 'inherit' });
    success('Cluster ready');
  } catch {
    error('Failed to create cluster');
    process.exit(1);
  }
}

function showStatus(): void {
  log('Checking cluster status...');
  if (clusterExists()) {
    success('Kind cluster exists');
    try {
      execSync('kubectl cluster-info --context kind-kind', { stdio: 'inherit' });
    } catch {
      warn('Could not get cluster info');
    }
  } else {
    warn('Kind cluster does not exist — run: pnpm dev:setup');
  }
}

function showHelp(): void {
  console.log(`
Identa — Development Setup

Usage:
  pnpm dev:setup          Create Kind cluster + registry
  pnpm dev:setup status   Check cluster status
  pnpm dev:setup delete   Delete cluster
  pnpm dev:up             Start Tilt
  pnpm dev:down           Stop Tilt
  pnpm dev:delete         Delete cluster (shortcut)

Services:
  Identa app:   http://localhost:3000
  Tilt UI:      http://localhost:10350
`);
}

const command = process.argv[2] ?? 'setup';

switch (command) {
  case 'setup':
  case 'create': {
    if (!checkPrerequisites()) {
      error('Prerequisites not met');
      process.exit(1);
    }
    console.log('');
    if (clusterExists()) {
      warn('Kind cluster already exists');
      console.log('To recreate: pnpm dev:delete && pnpm dev:setup');
    } else {
      createCluster();
    }
    console.log('');
    success('Setup complete!');
    console.log('');
    console.log('Next: pnpm dev:up');
    console.log('');
    console.log('  Identa:   http://localhost:3000');
    console.log('  Tilt UI:  http://localhost:10350');
    break;
  }

  case 'status':
    showStatus();
    break;

  case 'delete':
  case 'destroy':
    log('Deleting cluster...');
    try {
      execSync(`ctlptl delete -f ${resolve(ROOT, 'kind/ctlptl-cluster.yaml')}`, {
        cwd: ROOT,
        stdio: 'inherit',
      });
      success('Cluster deleted');
    } catch {
      error('Failed to delete cluster');
    }
    break;

  case 'help':
  case '--help':
  case '-h':
    showHelp();
    break;

  default:
    error(`Unknown command: ${command}`);
    showHelp();
    process.exit(1);
}
