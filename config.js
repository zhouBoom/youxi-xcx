//主机域名

var host = '192.168.1.100/server';

var config = {
    service:{
        host,

        //上传文件地址

        uploadUrl: `http://${host}/?uploadfile/uploadfile`,

        dowloadUrl:`http://${host}/?dowload/search`,

        loginUrl:`http://${host}/?login/login`
    }
};

module.exports = config;