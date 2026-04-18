const { spawn } = require('child_process');

function startProcess(command, env = process.env) {
  return spawn(command, {
    stdio: 'inherit',
    shell: true,
    env,
  });
}

const webProcess = startProcess('npm run serve');
const apiProcess = startProcess('npx @neteaseapireborn/api', {
  ...process.env,
  PORT: '10754',
});

let shuttingDown = false;

function shutdown(code = 0) {
  if (shuttingDown) return;
  shuttingDown = true;

  if (webProcess && !webProcess.killed) {
    webProcess.kill();
  }

  if (apiProcess && !apiProcess.killed) {
    apiProcess.kill();
  }

  process.exit(code);
}

webProcess.on('exit', code => {
  if (!shuttingDown) {
    shutdown(typeof code === 'number' ? code : 1);
  }
});

apiProcess.on('exit', code => {
  if (!shuttingDown) {
    shutdown(typeof code === 'number' ? code : 1);
  }
});

process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));
