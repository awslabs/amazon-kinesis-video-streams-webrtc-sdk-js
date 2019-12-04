module.exports = async () =>
    new Promise((resolve) => {
        global.wss.close(resolve);
    });
