const DEV = process.argv.includes('--dev');

module.exports = {
    incremental: DEV,
};
