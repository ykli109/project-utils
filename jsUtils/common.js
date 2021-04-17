// 使用setTimeout实现setInterval，避免因程序阻塞导致interval时间不可控
export const customedSetInterval = (callback, interval) => {
    let timer;

    const fn = () => {
        timer = setTimeout(() => {
            callback();
            fn();
        }, interval);
    };

    const clear = () => clearTimeout(timer);

    setTimeout(() => fn(), 0);

    return clear;
};
