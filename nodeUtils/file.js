// 写文件到指定路径，路径不存在则创建路径
const writeFileSync = (target, content, options = {}) => {
    const dir = path.dirname(target);
    !fs.existsSync(dir) && fs.mkdirSync(dir, {recursive: true});
    fs.writeFileSync(target, content, {encoding: 'utf-8', ...options});
};

// 复制文件指定路径，路径不存在则创建路径
const copyFileSync = (source, target) => {
    const dir = path.dirname(target);
    !fs.existsSync(dir) && fs.mkdirSync(dir, {recursive: true});
    fs.copyFileSync(source, target);
};

// 清除空的文件夹, folder为文件夹路径
function cleanEmptyFolders(folder) {
    const isDir = fs.statSync(folder).isDirectory();
    if (!isDir) {
        return;
    }

    let files = fs.readdirSync(folder);
    if (files.length > 0) {
        files.forEach(file => cleanEmptyFolders(path.join(folder, file)));
        files = fs.readdirSync(folder);
    }
    if (files.length === 0) {
        fs.rmdirSync(folder);
        console.log('removed: ', folder);
    }
};

// 读取json文件
const readJson = filepath => {
    const output = fs.readFileSync(filepath).toString();

    return JSON.parse(output);
};
