var record = require('./lib/record');
var upload = require('./lib/upload');
var request = require('./lib/dowload');
var login = require('./lib/login');
var Session = require('./lib/session');
var play = require('./lib/play');

var exports = module.exports = {
    startRecord: record.startRecord,
    stopRecord: record.stopRecord,
    getRecordDuration: record.getRecordDuration,
    getRecordSrc: record.getRecordSrc,
    RecordError: record.RecordError,
    uploadFile: upload.uploadFile,
    UploadError: upload.UploadError,
    
    request: request.request,
    RequestError: request.RequestError,

    login: login.login,
    setLoginUrl: login.setLoginUrl,
    LoginError: login.LoginError,

    setSession: Session.set,
    getSession: Session.get,
    clearSession: Session.clear,

    playRecord: play.playRecord,
    PlayError: play.PlayError,
}