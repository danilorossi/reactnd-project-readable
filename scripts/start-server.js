/**
* This is a utility to start the server project
*/
(function() {
    const args = [ 'start' ];
    const opts = { stdio: 'inherit', cwd: 'api-server', shell: true };
    require("child_process").spawn('npm', args, opts);
})();
