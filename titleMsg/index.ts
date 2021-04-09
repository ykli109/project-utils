/**
* @file 在浏览器标签栏提示信息
* @author liyunkun(yili109@outlook.com)
*/

export default (msg: string) => {
    if (window && window.document) {
        const oldTitle = document.title;
        let title = `...${msg}...`;
        let shift = title[0];
        let timer;

        const setTitle = () => {
            timer = setTimeout(() => {
                title = title.slice(1) + shift;
                shift = title[0];
                document.title = title;
                setTitle();
            }, shift === '.' ? 500 : 1000);
        };

        timer = setTimeout(() => {
            title = title.slice(1) + shift;
            shift = title[0];
            document.title = title;
            setTitle();
        }, shift === '.' ? 500 : 1000);

        return () => {
            clearTimeout(timer);
            document.title = oldTitle;
        };
    }
};
