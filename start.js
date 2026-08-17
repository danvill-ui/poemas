const { spawn } = require('child_process');
const path = require('path');

// Apuntamos al binario de next usando la ruta del sistema
const nextBin = path.join(__dirname, 'node_modules', '.bin', 'next');

const child = spawn('node', [nextBin, 'start', '-p', '3000'], {
    cwd: __dirname,
    stdio: 'inherit'
});

child.on('error', (err) => console.error('Error:', err));