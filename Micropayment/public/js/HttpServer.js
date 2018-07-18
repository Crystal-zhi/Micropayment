var base = 'http://www.diyiyinshang.com/';  //正式
//var base = 'http://192.168.0.202:18080/';  //202
// var base = 'http://47.96.144.16:18080/'; //正式
// var base = 'http://192.168.0.137:8080/'; // 李家臣 本地

var wfc_getCustMsg = base+'RMobile/app/getCustMsg'; // 获取 用户信息

var wfc_getCustAddr = base+'RMobile/app/getCustAddr'; // 获取 收货地址

var wfc_oilCardPay = base+'RGasoil/app/oilCardPay'; //  油卡下单

var wfc_oilCardBusOrderList = base+'RGasoil/app/oilCardBusOrderList'; // 油卡充值记录订单  油卡订单

var wfc_findCustCars = base+'RPeccancy/app/findCustCars'; // 车辆列表 RPeccancy/app/findCustCars

var wfc_findVioList = base+'RPeccancy/app/findVioList'; // 查询违章 (上游) RPeccancy/app/findVioList

var wfc_queryDbVioDetail = base+'RPeccancy/app/queryDbVioDetail'; // 查询违章 (数据库) RPeccancy/app/queryDbVioDetail

var wfc_queryVioOrder = base+'RPeccancy/app/queryVioOrder'; // 违章订单

var wfc_vioPay = base+'RPeccancy/app/vioPay'; // 违章代缴下单

var wfc_addRemark = base+'RPeccancy/app/addRemark'; // 违章催办

var wfc_qryPayOrder =  base+'/RMobile/app/qryPayOrder'; // 账单

var wfcoil_addOilRemark =  base+'/RGasoil/app/addOilRemark'; // 油卡催办


var wfc_payTradeOrder = base+'RMobile/app/payTradeOrder'; // 支付接口

var wfc_carInspect = base+'RPeccancy/app/carInspect'; // 车辆年检

var wfc_driverScore = base+'RPeccancy/app/driverScore'; // 驾驶证查分

var wfc_ImageOCR = base+'RMobile/app/ImageOCR'; // OCR识别

var wfc_imageUpload = base+'RPeccancy/app/imageUpload'; // 补单上传照片

var wfc_SupSubmit = base+'RPeccancy/app/SupSubmit'; // 补单总提交

//代还

var banklogo = 'http://47.96.144.16:18080/RMobile/BankLogo/';

var getCustBankCard =  base+'RMobile/app/getCustBankCard'; // 银行卡列表

var planRepayPreview = base+'RMobile/app/planRepayPreview'; // 计划还款

var planRepayCreat = base+'RMobile/app/planRepayCreat'; // 提交计划

var videoList = base+'RMobile/app/qryWSTabDetail';//微视

var rewardList = base + 'RMobile/app/qryInComeOrder'; //收益明细

var ticketList = base + 'RMobile/app/qryCustTicket';
//弹框
var dialog = YDUI.dialog;

/**
 * 拿 链接 参数 StrObjByRegExpLocation
 *
 */
var StrObjByRegExpLocation = function(strDes) {
    var obj = {};
    strDes.replace(/(\w+)(?:=([^&]*))?/g, function (str, key, value) {
        obj[key] = value;
    });
    return obj;
};

var toPayment =  function(orderNo,busType,txnAmt){
     window.location.href = base + "Micropayment/OilCard/toPayment.html?BUSORDERNO="+orderNo+"&BIZ_TYPE="+busType+"&TXNAMT="+txnAmt;
};


var _location = StrObjByRegExpLocation(window.location.search);
// console.log(_location)
//后台 请求 基本参数
var HttpParams = {
    WX:'wx',
    ORG_ID:_location.ORG_ID,
    LOGIN_ID:_location.LOGIN_ID
};
//后台 请求 基本参数
var WX = 'wx',ORG_ID = _location.ORG_ID,LOGIN_ID = _location.LOGIN_ID;



// ajax 请求方法
var HttpServer = function(url, params) {
    var deffer = $.Deferred();
    $.ajax({
        data: (params === undefined ? "" : params),
        dataType: "json",
        timeOut: 20000,
        method: "post",
        url: url,
        async: false, //是否异步
        success: function(data) {
            deffer.resolve(data);
        },
        error: function(data) {
            deffer.reject(data);
        }
    });
    return deffer.promise();
}

var webShare = function(url){
    androidwfc.webShare(url);
}

/**
 上传图片进行压缩
 id canvas id
 src 图片base64码
 ccallback 回调函数
 */
var ImageCompressionO = function (id,src,callback) {
    var canvas = document.getElementById(id);
    var cxt = canvas.getContext('2d');
    var tCanvas = document.getElementById(id);
    var tcxt = canvas.getContext('2d');
    var img = new Image();
    img.src = src;
    img.onload = function() {
        var initSize = img.src.length;
        var width = img.width;
        var height = img.height;
        var ratio;
        if ((ratio = width * height / 4000000)>1) {
            ratio = Math.sqrt(ratio);
            width /= ratio;
            height /= ratio;
        }else {
            ratio = 1.5;
        }
        canvas.width = width;
        canvas.height = height;
        cxt.fillStyle = "#fff";
        cxt.fillRect(0, 0, canvas.width, canvas.height);

        var count;
        if ((count = width * height / 1000000) > 1) {
            count = ~~(Math.sqrt(count)+1); //计算要分成多少块瓦片

//            计算每块瓦片的宽和高
            var nw = ~~(width / count);
            var nh = ~~(height / count);

            tCanvas.width = nw;
            tCanvas.height = nh;

            for (var i = 0; i < count; i++) {
                for (var j = 0; j < count; j++) {
                    tcxt.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);

                    cxt.drawImage(tCanvas, i * nw, j * nh, nw, nh);
                }
            }
        } else {
            cxt.drawImage(img, 0, 0, width, height);
        }

        cxt.drawImage(img, 0, 0, width, height);
        var dataUrl	= canvas.toDataURL('image/jpeg');

        console.log('压缩前：' + initSize);
        console.log('压缩后：' + dataUrl.length);
        console.log('压缩率：' + ~~(100 * (initSize - dataUrl.length) / initSize) + "%");

        callback ? callback(dataUrl) : '';
    }
}
var ImageCompressionT = function (id,src,callback) {
    var canvas = document.getElementById(id);
    var cxt = canvas.getContext('2d');
    canvas.width = 400;
    canvas.height = 350;
    var img = new Image();
    img.src = src;
    img.onload = function() {
        cxt.drawImage(img, 0,0,canvas.width,canvas.height);
        var dataUrl	= canvas.toDataURL('image/jpeg');
        callback ? callback(dataUrl) : '';
    }
}
var ImageCompressionTT = function (id,src,callback) {
    var canvas = document.getElementById(id);
    var cxt = canvas.getContext('2d');
    canvas.width = 400;
    canvas.height = 350;
    var img = new Image();
    img.src = src;
    img.onload = function() {
        cxt.drawImage(img, 0,0,canvas.width,canvas.height);
        var dataUrl	= canvas.toDataURL('image/jpeg');
        callback ? callback(dataUrl) : '';
    }
}
var ImageCompressionF = function (id,src,callback) {
    var canvas = document.getElementById(id);
    var cxt = canvas.getContext('2d');
    canvas.width = 400;
    canvas.height = 350;
    var img = new Image();
    img.src = src;
    img.onload = function() {
        cxt.drawImage(img, 0,0,canvas.width,canvas.height);
        var dataUrl	= canvas.toDataURL('image/jpeg');
        callback ? callback(dataUrl) : '';
    }
}

// 年检 ocr 图片压缩
var OCRImage= function (id,src,callback) {
    var canvas = document.getElementById(id);
    var cxt = canvas.getContext('2d');
    canvas.width = 450;
    canvas.height = 400;
    var img = new Image();
    img.src = src;
    img.onload = function() {
        cxt.drawImage(img, 0,0,canvas.width,canvas.height);
        var dataUrl	= canvas.toDataURL('image/jpeg');
        callback ? callback(dataUrl) : '';
    }
}




/**
 * 存储localStorage
 */
var setStore = function(name, content){
    if (!name) return;
    if (typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
};

/**
 * 获取localStorage
 */
var getStore = function(name) {
    if (!name) return;
    return window.localStorage.getItem(name);
};

var gettoken = function(name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays)
    document.cookie = name + '=' + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
};

/**
 * 删除localStorage
 */
var removeStore = function(name) {
    if (!name) return;
    window.localStorage.removeItem(name);
};



// 油卡 跳转
var OilCard = {

    OlAddoilcard: function () {
        window.location.href='./Addoilcard.html?LOGIN_ID='+_location.LOGIN_ID+'&ORG_ID='+_location.ORG_ID;
    },
    Addoiluser: function () {
        window.location.href='./Addoiluser.html?LOGIN_ID='+_location.LOGIN_ID+'&ORG_ID='+_location.ORG_ID;
    },
    OlOilCard: function () {
        window.location.href = './OilCard.html?LOGIN_ID='+_location.LOGIN_ID+'&ORG_ID='+_location.ORG_ID;
    }
};
//违章 查询订单
var RPeccancy = {
    RealtimeQuotesOne: function () {
        window.location.href='./Real-timeQuotesOne.html?LOGIN_ID='+_location.LOGIN_ID+'&ORG_ID='+_location.ORG_ID;
    },
    RealtimeQuotesTwo: function () {
        window.location.href='./Real-timeQuotesTwo.html?LOGIN_ID='+_location.LOGIN_ID+'&ORG_ID='+_location.ORG_ID;
    },
    RealtimeQuotesThree: function () {
        window.location.href='./Real-timeQuotesThree.html?LOGIN_ID='+_location.LOGIN_ID+'&ORG_ID='+_location.ORG_ID;
    }
};
//从app 下面点进来 违章 查询订单
var SRPeccancy = {
    RealtimeQuotesOne: function () {
        window.location.href='./SReal-timeQuotesOne.html?LOGIN_ID='+_location.LOGIN_ID+'&ORG_ID='+_location.ORG_ID+'&HPHM='+_location.HPHM; //车牌
    },
    RealtimeQuotesTwo: function () {
        window.location.href='./SReal-timeQuotesTwo.html?LOGIN_ID='+_location.LOGIN_ID+'&ORG_ID='+_location.ORG_ID+'&HPHM='+_location.HPHM; //车牌
    },
    RealtimeQuotesThree: function () {
        window.location.href='./SReal-timeQuotesThree.html?LOGIN_ID='+_location.LOGIN_ID+'&ORG_ID='+_location.ORG_ID+'&HPHM='+_location.HPHM; //车牌
    }
};
//违章订单
var newCardOrders = {
     all:function(){
         window.location.href = './../newCarOrders/All.html?LOGIN_ID='+_location.LOGIN_ID+'&ORG_ID='+_location.ORG_ID;
     },
     daichuli:function(){
         window.location.href = './../newCarOrders/daichuli.html?LOGIN_ID='+_location.LOGIN_ID+'&ORG_ID='+_location.ORG_ID;
     },
     daiqueren:function(){
         window.location.href = './../newCarOrders/daiqueren.html?LOGIN_ID='+_location.LOGIN_ID+'&ORG_ID='+_location.ORG_ID;
     },
     yiwancheng:function(){
        window.location.href = './../newCarOrders/yiwancheng.html?LOGIN_ID='+_location.LOGIN_ID+'&ORG_ID='+_location.ORG_ID;
     }
};
//油卡订单
var OilOrders = {
    all:function(){
        window.location.href = './../OilOrders/All.html?LOGIN_ID='+_location.LOGIN_ID+'&ORG_ID='+_location.ORG_ID;
    },
    daichuli:function(){
        window.location.href = './../OilOrders/daichuli.html?LOGIN_ID='+_location.LOGIN_ID+'&ORG_ID='+_location.ORG_ID;
    },
    // daiqueren:function(){
    //     window.location.href = './../OilOrders/daiqueren.html?LOGIN_ID='+_location.LOGIN_ID+'&ORG_ID='+_location.ORG_ID;
    // },
    yiwancheng:function(){
        window.location.href = './../OilOrders/yiwancheng.html?LOGIN_ID='+_location.LOGIN_ID+'&ORG_ID='+_location.ORG_ID;
    }
};
//我要补单
var newCarIWantRemedy = {
    go_NoOrderTwo: function () {
        window.location.href = './NoOrderTwo.html?LOGIN_ID='+_location.LOGIN_ID+'&ORG_ID='+_location.ORG_ID+'&HPHM='+getStore('Inq_weizhangchepai'); //车牌
    },
    go_NoOrderThree: function () {
        window.location.href = './NoOrderThree.html?LOGIN_ID='+_location.LOGIN_ID+'&ORG_ID='+_location.ORG_ID+'&HPHM='+_location.HPHM; //车牌
    }
};
// 驾照查分
var newCarCheckpoints = {
    go_ScoreDisplay: function (DRIVING_NUMBER,ARCHIVES_NO) {
        //DRIVING_NUMBER 驾证号
        //ARCHIVES_NO 档案号
        window.location.href = './ScoreDisplay.html?LOGIN_ID='+_location.LOGIN_ID+'&ORG_ID='+_location.ORG_ID+'&DRIVING_NUMBER='+DRIVING_NUMBER+'&ARCHIVES_NO'+ARCHIVES_NO;
    }
};
// 计划还款
var Replacement = {
    go_FillInInformation: function () {
        window.location.href = './FillInInformation.html?LOGIN_ID='+_location.LOGIN_ID+'&ORG_ID='+_location.ORG_ID;
    }
};