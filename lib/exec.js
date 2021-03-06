/* eslint no-console:0, no-process-exit:0, no-process-env:0 */
var childProcess = require('child_process');

function executeCommand(cmd, args, opt, exit) {
    var ret;

    if (process.platform === 'win32') {
        ret = childProcess.spawnSync(process.env.comspec || 'cmd.exe', ['/s', '/c', cmd].concat(args), {
            stdio: opt || 'inherit'
        });
    } else {
        ret = childProcess.spawnSync(cmd, args, {
            stdio: opt || 'inherit'
        });
    }

    if (ret.error) {
        ret.stderr && console.error(ret.stderr.toString().trim());
        console.error(cmd, args.join(' '), '=>');
        console.error(ret.error);
        if (exit === false) { return false; }
        process.exit(1);
    }

    if (ret.status !== 0) {
        ret.stderr && console.error(ret.stderr.toString().trim());
        console.error(cmd, args.join(' '), '=>', ret.status);
        if (exit === false) { return false; }
        process.exit(ret.status);
    }

    return ret.stdout && ret.stdout.toString().trim();
}

module.exports = executeCommand;
