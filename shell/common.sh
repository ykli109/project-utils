#!/usr/bin/env bash

# 1、将文件中的特性字符串替换，mac环境下sed和linux使用不一致
function replace() {
    origin="$1"
    replacement="$2"
    file="$3"

    if [ "$(uname)" == "Darwin" ]; then
        sed -i "" "s/${origin}/${replacement}/g" "$file"
    else
        sed -i "s/${origin}/${replacement}/g" "$file"
    fi
}

# 2、获取当前代码库commit版本
function getCommitId() {
    echo $(git rev-parse --short=7 HEAD);
}
COMMIT_ID=$(getCommitId)

# 3、判断变量是否存在
if [ -n "$VAR" ]; then
    # do something if exist
    echo exist
fi

# 4、判断变量是否存在
if [ -z "$VAR" ]; then
    # do something if exist
    echo not exist
fi

# 5、加载远程资源，支持错误重试3次
function load_source() {
    local source_url=$1
    local source=''
    for i in $(seq 1 3)
    do
        conf=$(curl -s $source_url)
        if [ -n "$source" ]; then
            break
        fi
    done

    echo $source
}


