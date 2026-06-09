'use strict';

const { fork } = require('child_process');
const path = require('path');

const serverPath = path.join(__dirname, '..', 'client', 'server', 'server.js');
const rootUri = 'file:///tmp';
const timeoutMs = 10000;

function fail(message, child) {
	console.error(message);
	if (child && !child.killed) {
		try {
			child.kill('SIGKILL');
		} catch (_e) {
			// Ignore kill errors during teardown.
		}
	}
	process.exit(1);
}

const child = fork(serverPath, ['--node-ipc'], {
	stdio: ['pipe', 'pipe', 'pipe', 'ipc']
});

let timer = setTimeout(() => {
	fail(`Timed out after ${timeoutMs}ms waiting for LSP handshake`, child);
}, timeoutMs);

let gotInitialize = false;
let shutdownSent = false;

child.on('error', (err) => {
	clearTimeout(timer);
	fail(`Failed to launch language server: ${err.message}`, child);
});

child.on('exit', (code, signal) => {
	clearTimeout(timer);
	if (shutdownSent && code === 0) {
		console.log('LSP IPC handshake smoke check passed.');
		process.exit(0);
	}
	fail(`Language server exited unexpectedly (code=${code}, signal=${signal})`, child);
});

child.on('message', (msg) => {
	if (!msg || typeof msg !== 'object') {
		return;
	}

	if (msg.id === 1 && typeof msg.result === 'object') {
		gotInitialize = true;
		child.send({ jsonrpc: '2.0', method: 'initialized', params: {} });
		child.send({
			jsonrpc: '2.0',
			id: 2,
			method: 'shutdown',
			params: null
		});
		return;
	}

	if (msg.id === 2 && msg.result === null && gotInitialize) {
		shutdownSent = true;
		child.send({ jsonrpc: '2.0', method: 'exit', params: null });
	}
});

child.send({
	jsonrpc: '2.0',
	id: 1,
	method: 'initialize',
	params: {
		processId: process.pid,
		rootUri,
		capabilities: {},
		workspaceFolders: [{ uri: rootUri, name: 'tmp' }]
	}
});
