#!/usr/bin/env node
/**
 * WebSocket Terminal Server with PTY
 * Run separately: node scripts/terminal-server.js
 */

const http = require('http');
const { Server } = require('socket.io');
const pty = require('node-pty');
const os = require('os');

const PORT = process.env.TERMINAL_PORT || 3001;
const shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';

const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// Track active terminals
const terminals = new Map();

io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);

  // Create new terminal
  socket.on('terminal:create', (options = {}) => {
    const cols = options.cols || 80;
    const rows = options.rows || 24;
    const cwd = options.cwd || process.cwd();

    try {
      const term = pty.spawn(shell, [], {
        name: 'xterm-256color',
        cols,
        rows,
        cwd,
        env: { ...process.env, TERM: 'xterm-256color' },
      });

      const terminalId = `term_${Date.now()}`;
      terminals.set(terminalId, { term, socket });

      // Send output to client
      term.onData((data) => {
        socket.emit('terminal:output', { id: terminalId, data });
      });

      // Handle terminal exit
      term.onExit(({ exitCode }) => {
        socket.emit('terminal:exit', { id: terminalId, exitCode });
        terminals.delete(terminalId);
      });

      socket.emit('terminal:created', { id: terminalId, pid: term.pid });
      console.log(`Terminal created: ${terminalId} (PID: ${term.pid})`);
    } catch (error) {
      socket.emit('terminal:error', { error: error.message });
    }
  });

  // Handle input from client
  socket.on('terminal:input', ({ id, data }) => {
    const terminal = terminals.get(id);
    if (terminal) {
      terminal.term.write(data);
    }
  });

  // Resize terminal
  socket.on('terminal:resize', ({ id, cols, rows }) => {
    const terminal = terminals.get(id);
    if (terminal) {
      terminal.term.resize(cols, rows);
    }
  });

  // Kill terminal
  socket.on('terminal:kill', ({ id }) => {
    const terminal = terminals.get(id);
    if (terminal) {
      terminal.term.kill();
      terminals.delete(id);
      console.log(`Terminal killed: ${id}`);
    }
  });

  // Cleanup on disconnect
  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
    // Kill all terminals for this socket
    for (const [id, terminal] of terminals.entries()) {
      if (terminal.socket === socket) {
        terminal.term.kill();
        terminals.delete(id);
      }
    }
  });
});

server.listen(PORT, () => {
  console.log(`Terminal WebSocket server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down terminal server...');
  for (const [id, terminal] of terminals.entries()) {
    terminal.term.kill();
  }
  server.close();
  process.exit(0);
});
