var vm = new Vue({
    el:'#OilCard',
    data:{
        urlfindCustOilCard:base+'RGasoil/app/findCustOilCard', // 查询客户油卡列表
        //urloilCardRecharge:base+'RGasoil/app/oilCardRecharge', // tab1 充值
        taboneitems:[], //tab1 有卡时 展示的信息
        items1:[
            100,200,500,1000
        ],
        Payable: '100', //付款金额
        che:false, //第一页去支付动画
        che2:false, //第二页去支付动画
        che3:false, //第三页去支付动画
        item1Gotopay1:true, //切换 时 第一 页去掉支付
        item1Gotopay2:false,// 第二页 去支付 隐藏
        item1Gotopay3:false,//第三页 去支付 隐藏
        nooryescardstatus1:true, //第一页没有卡时的状态or有卡时的状态
        cardnumber1:'1000114300006979231', // 第一页 油卡号
        Refuelingamount:100, //第二页 加油金额
        Refuelingamountecharts:2, //第二页 加油金额 图表 绿色部分
        Refuelingamountecharts1:98, //第二页 加油金额 图表  白色部分
        monthMonth:1,//第二页 充值时间 月
        monthMonthcharts:1,//第二页 充值时间 月图表 绿色部分
        monthMonthcharts1:11,//第二页 充值时间 月图表  白色部分
        tabpanel3topcolorl: true,//第三页 办卡点击样式切换
        tabpanel3topcolorr: true,//第三页 办卡点击样式切换
        YourselfOrOthers: false, // 第三页 自己办卡 或 他人办卡 上传身份证照片 逻辑
        IDphoto2img1:'',//第三页 照片
        IDphoto2img2:'',//第三页 照片
        IDphoto2img3:'',//第三页 照片
        IDphoto2img4:'',//第三页 照片
        citylocationa:'',//第三页获取位置
        onecitylocation:'1',//第三页获取位置 执行一次
        tabthreeSelectTheTypeOfOilCard:true, // tab3 选择 油卡类型
        tabthreeOILCARD_TYPE:'Sinopec', // tab3 油卡类型 传入后台 默认 中石化
        tabthree_shouji:'',// tab3 手机号传后台
        tabthree_name:'', //  tab3 给他人办卡 姓名 传后台
        tabthree_xuanzeshouhuodizhi:'请选择您的详细地址', // tab3 收货地址
        tabthree_xuanzeshouhuodizhione:'', //tab3 给他人办卡 收货地址
        tabpanel4topcolorl: true,//第四页 办卡点击样式切换
        tabpanel4topcolorr: true,//第四页 办卡点击样式切换
        tabpanel4nolist: false,   //第四页 没有 记录
        zhankai: false,   //第四页 点击展开
        items2:[
            // {a:'46546444646549456465',b:'1000113300015259667',c:'130******170',d:'*贝贝',e:'200',f:'2018-11-11 11:11:11',g:'成功'},
            // {a:'46546444646549456465',b:'1000113300015259667',c:'130******170',d:'*贝贝',e:'200',f:'2018-11-11 11:11:11',g:'失败'},
            // {a:'46546444646549456465',b:'1000113300015259667',c:'130******170',d:'*贝贝',e:'200',f:'2018-11-11 11:11:11',g:'成功'}
        ],//第四页 充值记录 列表
        yonghuxinxi:{},  //用户信息
        shouhuodizhi:[], //收货地址列表
        AllphoneRegular:/^1[3456789]\d{9}$/ //正则手机
    },
    filters: {
        //过滤 油卡号 加空格
        onecardnumberfil:function(value){
            if(!value){return ''}
            var val = value;
            var _val = val.substr(0,4)+' '+val.substr(4,4)+' '+val.substr(8,4)+' '+val.substr(12,4)+' '+val.substr(16,val.length)
            return _val
        },
        // 判断 tab1  tab2  上部展示卡信息  名称
        oilcardName:function(value){
            if(!value){return ''}
            if(value == 'PetroChina'){
                return '中国石油'
            }else if(value == 'Sinopec'){
                return '中国石化'
            }
        }
    },
    computed:{
        // 加油金额 加 '元'
        Refuelingamountplusyuan:function(){
            return this.Refuelingamount +'元'
        },
        monthMonthplusyue:function(){
            return this.monthMonth +'月'
        }
    },
    methods:{
        goBackToTheLastPage: function() {
            window.history.go(-1)
        },
        parseStrObjByRegExp:function(strDes) {
            var obj = {};
            strDes.replace(/(\w+)(?:=([^&]*))?/g, function (str, key, value) {
                obj[key] = value;
            });
            return obj;
        },
        _initialization: function() {
            //存储信息
            setStore("ORG_ID",_location.ORG_ID);
            setStore("LOGIN_ID",_location.LOGIN_ID);
            removeStore('DISCOUNT');
            removeStore('TICKET_NO');
            removeStore('e');
            console.log(YDUI.device);
            // console.log(md5('123'))
            var that = this;
            // 选项卡
            var $tab = $('#J_Tab');
            $tab.tab({
                nav: '.tab-nav-item',
                panel: '.tab-panel-item',
                activeClass: 'tab-active'
            });

            $tab.find('.tab-nav-item').on('open.ydui.tab', function (e) {
                // console.log('索引：%s - [%s]正在打开', e.index, $(this).text());
                if(e.index!='0'){
                    that.item1Gotopay1 = false;
                }else{
                    that.item1Gotopay1 = true;
                }
                if(e.index!='1'){
                    that.item1Gotopay2 = false;
                }else{
                    that.item1Gotopay2 = true;
                }
                if(e.index!='2'){
                    that.item1Gotopay3 = false;
                }else{
                    that.item1Gotopay3 = true;
                    // if(that.onecitylocation=='1'){ //只执行一次
                    //     // that.citylocation();
                    //     that.onecitylocation = '0'
                    // }


                }
                if(e.index=='3'){
                    /**
                     *   油卡充值记录
                     * */
                    var obj = {};
                    obj.WX = WX;
                    obj.ORG_ID = ORG_ID;
                    obj.LOGIN_ID = LOGIN_ID;
                    obj.BUS_TYPE = 'Recharge';
                    HttpServer(wfc_oilCardBusOrderList,obj).then(function(data){
                        dialog.loading.open();
                        // console.log(data)
                        if(data.RSPCODE=='SUCCESS'){
                            dialog.loading.close();
                            // dialog.toast(data.RSPMSG, 'none', 1000);
                            that.items2 = data.RECORDS;
                            // console.log(that.items2)
                        }else{
                            dialog.loading.close();
                            dialog.toast(data.RSPMSG, 'none', 1000);
                        }
                    });
                }


            });

            $tab.find('.tab-nav-item').on('opened.ydui.tab', function (e) {
                // console.log('索引：%s - [%s]已经打开了', e.index, $(this).text());
            });
            var obj = {};
            obj.WX = WX;
            obj.ORG_ID = ORG_ID;
            obj.LOGIN_ID = LOGIN_ID;
            HttpServer(this.urlfindCustOilCard,obj).then(function(data){
                if(data.RSPCODE == 'SUCCESS'){
                    if(data.OILCARDS.length<=0){
                        that.nooryescardstatus1 = false   // 没有卡 时 显示 没有 卡的展示界面
                    }else{
                        if(getStore('SelectOilCardInformation')){
                            var arr =[];
                            arr.push(JSON.parse(getStore('SelectOilCardInformation')));
                            that.taboneitems = arr
                        }else {
                            var array =[];
                            array.push(data.OILCARDS[0])
                            that.taboneitems = array
                        }
                    }
                }else{
                    alert("服务器错误,请联系管理员!");
                }
                
               
            });
            /*
             *  获取用户信息
             */
            HttpServer(wfc_getCustMsg,HttpParams).then(function(data){
                that.yonghuxinxi = data
            });
            /*
             *   获取收货地址
             */
            HttpServer(wfc_getCustAddr,HttpParams).then(function(data){
                that.shouhuodizhi = data.ADDR_LIST
            });
        },
        tab1_addcard:function(){
            OilCard.OlAddoilcard()
        },
        tab1_adduser:function(){
            OilCard.Addoiluser()
        },
        selectoilcard: function(e,index){
            // e.target 是你当前点击的元素
            // e.currentTarget 是你绑定事件的元素
            console.log(this.items1[index])
            this.Payable = this.items1[index];
            var _selectul = document.getElementById('_selectul');
            for(var i = 0;i<_selectul.children.length;i++){
                _selectul.children[i].firstChild.classList.remove("_selectdiv1color")
            }
            e.currentTarget.firstChild.classList.add("_selectdiv1color");
            $('#discount').html('减免<font color="#02AD9A" style="padding: 0 .06rem;">'+String(Number(getStore('DISCOUNT'))*Number(this.Payable)/100)+'</font>元');
            var tt = Number(this.Payable) - Number(this.Payable) * Number(getStore('DISCOUNT')/100)
            $('#sjMoney').html('&yen;'+String(tt));
        },
        //点击协议,查看协议详情
        getAgreement:function(){
            layer.open({
                type: 2,
                title: ['油卡服务协议'],
                shadeClose: true,
                shade: 0.8,
                area: ['90%', '90%'],
                content: 'agreement.html' ,//iframe的url
                btn: ['确定'],
              }); 
        },
        //第一页 点击 同意 协议
        clickagree: function() {
            this.che = !this.che
        },
        // 第二页 点击 同意 协议
        clickagree2: function(){
            this.che2 = !this.che2
        },
        // 第三页 点击 同意 协议
        clickagree3: function(){
            this.che3 = !this.che3
        },
        goPaymentno: function() {
            YDUI.dialog.toast('请同意油卡服务协议', 'none', 1500);
        },
        goPaymentno2: function() {
            YDUI.dialog.toast('请同意油卡服务协议', 'none', 1500);
        },
        goPaymentno3: function() {
            YDUI.dialog.toast('请同意油卡服务协议', 'none', 1500);
        },
        //第一页 支付
        tabonetaoqian:function() {
            var that =this;
            var obj = {};
            obj.WX = WX;
            obj.ORG_ID = ORG_ID;
            obj.LOGIN_ID = LOGIN_ID;
            obj.OILCARD_NO = that.taboneitems[0].OILCARD_NO; // 卡号
            obj.DISCOUNT = String(Number(that.Payable)*100*Number(getStore('DISCOUNT')/100));//优惠金额
            obj.ORDAMT = String(Number(that.Payable)*100);
            obj.TXNAMT = String(Number(that.Payable)*100 - Number(obj.DISCOUNT)); // 元转分 金额  减去 折扣
            obj.TYPE = '0'; //  自充  0  代充  1
            obj.BUS_TYPE = 'Recharge'; //类型
            obj.DISC_PLAN = getStore('TICKET_NO'); 
            if(obj.OILCARD_NO==null||obj.OILCARD_NO==''||obj.OILCARD_NO==undefined){
                dialog.toast('请选择油卡', 'none', 1500);
                return ;
            }
            HttpServer(wfc_oilCardPay,obj).then(function(data){
                removeStore('DISCOUNT');
                removeStore('TICKET_NO');
                removeStore('e');
                if(data.RSPCODE == 'SUCCESS') {
                    // dialog.toast(data.RSPMSG, 'none', 1000);
                    // console.log(data.ORDERNO)
                    toPayment(data.ORDERNO,obj.BUS_TYPE,obj.TXNAMT);
                    // HttpServer(wfc_payTradeOrder,wfc_obj).then(function(data){
                    //      console.log(data.PAY_BODY)
                           // var wfc_obj = {};
                           //  wfc_obj.WX = WX;
                           //  wfc_obj.ORG_ID = ORG_ID;
                           //  wfc_obj.LOGIN_ID = LOGIN_ID;
                           //  wfc_obj.BUSORDERNO = data.ORDERNO;
                           //  wfc_obj.TRANS_TYPE = 'ALIPAY_WAP';
                           //  wfc_obj.BIZ_TYPE = 'Recharge';
                           //  wfc_obj.TXNAMT = obj.TXNAMT;
                    //     if(data.RSPCODE == 'SUCCESS'){
                    //          if($('#zfb_zf').html() == '' || $('#zfb_zf').html() == null || $('#zfb_zf').html() == undefined){
                    //              $('#zfb_zf').html(data.PAY_BODY)
                    //          }else{
                    //              $('#zfb_zf').html('')
                    //              $('#zfb_zf').html(data.PAY_BODY)
                    //          }
                    //     }else{
                    //         dialog.toast(data.RSPMSG, 'none', 1000);
                    //     }
                    // })
                }else {
                    dialog.toast(data.RSPMSG, 'none', 1500);
                }
            })
        },
        //第三页 支付
        tabthreetaoqian:function() {
            var that = this;
            if(!that.YourselfOrOthers){ //给自己办卡
                var obj = {};
                obj.WX = WX;
                obj.ORG_ID = ORG_ID;
                obj.LOGIN_ID = LOGIN_ID;
                obj.OILCARD_TYPE = that.tabthreeOILCARD_TYPE;//油卡类型
                obj.OIL_TYPE = $('#tabpanel3select').val();//油类型
                obj.DISCOUNT = '100';// 折扣  例 : 9折 传 90
                obj.ORDAMT = String(Number(25)*100); // 订单金额
                obj.TXNAMT = String(25*100 * Number(obj.DISCOUNT/100)); // 费用 应付款
                obj.CUST_NAME = that.yonghuxinxi.CUST_NAME; //姓名
                obj.BUS_TYPE = 'Transact'; //类型
                if(!that.AllphoneRegular.test(that.tabthree_shouji)){
                    dialog.toast('手机号不正确', 'none', 1500);
                    return
                }
                obj.PHONE = that.tabthree_shouji; //手机
                obj.SELF = '0'; //0 自办 1 代办
                if(that.tabthree_xuanzeshouhuodizhi==''||that.tabthree_xuanzeshouhuodizhi==null||that.tabthree_xuanzeshouhuodizhi==undefined||that.tabthree_xuanzeshouhuodizhi=='请填写您的详细地址'){
                    dialog.toast('请您选择收货地址或前去添加收货地址', 'none', 1500);
                    return
                }
                obj.RECEIVE_ADDRESS = that.tabthree_xuanzeshouhuodizhi;
                dialog.loading.open('正在处理...');
                HttpServer(wfc_oilCardPay,obj).then(function(res){
                    dialog.loading.close();
                    if(res.RSPCODE == 'SUCCESS'){
                        // dialog.toast(res.RSPMSG, 'none', 1000);
                        toPayment(res.ORDERNO,obj.BUS_TYPE,obj.TXNAMT);
                        // console.log(res.ORDERNO)
                        // HttpServer(wfc_payTradeOrder,wfc_obj).then(function(data){
                        //     console.log(data.PAY_BODY)
                        // var wfc_obj = {};
                        // wfc_obj.WX = WX;
                        // wfc_obj.ORG_ID = ORG_ID;
                        // wfc_obj.LOGIN_ID = LOGIN_ID;
                        // wfc_obj.BUSORDERNO = res.ORDERNO;
                        // wfc_obj.TRANS_TYPE = 'ALIPAY_WAP';
                        // wfc_obj.BIZ_TYPE = 'Transact';
                        // wfc_obj.TXNAMT = obj.TXNAMT;
                        //     if(data.RSPCODE == 'SUCCESS'){
                        //         if($('#zfb_zf').html() == '' || $('#zfb_zf').html() == null || $('#zfb_zf').html() == undefined){
                        //             $('#zfb_zf').html(data.PAY_BODY)
                        //         }else{
                        //             $('#zfb_zf').html('')
                        //             $('#zfb_zf').html(data.PAY_BODY)
                        //         }
                        //     }else{
                        //         dialog.toast(data.RSPMSG, 'none', 1000);
                        //     }
                        // })
                    }else{
                        dialog.toast(res.RSPMSG, 'none', 1500);
                    }
                })
            }else{ //给他人办卡
                var obje ={};
                obje.WX = WX;
                obje.ORG_ID = ORG_ID;
                obje.LOGIN_ID = LOGIN_ID;
                obje.OILCARD_TYPE = that.tabthreeOILCARD_TYPE;//油卡类型
                obje.OIL_TYPE = $('#tabpanel3select').val();//油类型
                obje.DISCOUNT = '100';// 折扣  例 : 9折 传 90
                obje.ORDAMT = String(Number(25)*100); // 订单金额
                obje.TXNAMT = String(25*100 * Number(obje.DISCOUNT/100)); // 费用 应付款
                obje.BUS_TYPE = 'Transact'; //类型
                if(that.tabthree_name == ''){
                    dialog.toast('请填写姓名', 'none', 1000);
                    return
                }
                obje.CUST_NAME = that.tabthree_name; //姓名
                if(!that.AllphoneRegular.test(that.tabthree_shouji)){
                    dialog.toast('手机号不正确', 'none', 1000);
                    return
                }
                obje.PHONE = that.tabthree_shouji; //手机
                obje.SELF = '1'; //0 自办 1 代办
                if(that.tabthree_xuanzeshouhuodizhione==''||that.tabthree_xuanzeshouhuodizhione==null||that.tabthree_xuanzeshouhuodizhione==undefined){
                    dialog.toast('请您选择收货地址或前去添加收货地址', 'none', 1000);
                    return
                }
                obje.RECEIVE_ADDRESS = that.tabthree_xuanzeshouhuodizhione;
                if(that.IDphoto2img1 == ''){
                    dialog.toast('请上传身份证正面', 'none', 1000);
                    return
                }
                if(that.IDphoto2img2 == ''){
                    dialog.toast('请上传身份证背面', 'none', 1000);
                    return
                }
                if(that.IDphoto2img3 == ''){
                    dialog.toast('请上传行驶证正面', 'none', 1000);
                    return
                }
                if(that.IDphoto2img4 == ''){
                    dialog.toast('请上传行驶证背面', 'none', 1000);
                    return
                }
                dialog.loading.open('正在处理...');

                obje.ATTACHMENT_A = that.IDphoto2img1.split(",")[1];
                obje.ATTACHMENT_B = that.IDphoto2img2.split(",")[1];
                obje.ATTACHMENT_C = that.IDphoto2img3.split(",")[1];
                obje.ATTACHMENT_D = that.IDphoto2img4.split(",")[1];
                HttpServer(wfc_oilCardPay,obje).then(function(res){
                    dialog.loading.close();
                    if(res.RSPCODE == 'SUCCESS'){
                        // console.log(res.ORDERNO)
                        // dialog.toast(res.RSPMSG, 'none', 1000);
                        toPayment(res.ORDERNO,obje.BUS_TYPE,obje.TXNAMT);
                        // HttpServer(wfc_payTradeOrder,wfc_obj).then(function(data){
                        //     // console.log(data.PAY_BODY)
                        //     if(data.RSPCODE == 'SUCCESS'){
                        //         dialog.loading.close();
                        // var wfc_obj = {};
                        // wfc_obj.WX = WX;
                        // wfc_obj.ORG_ID = ORG_ID;
                        // wfc_obj.LOGIN_ID = LOGIN_ID;
                        // wfc_obj.BUSORDERNO = res.ORDERNO;
                        // wfc_obj.TRANS_TYPE = 'ALIPAY_WAP';
                        // wfc_obj.BIZ_TYPE = 'Transact';
                        // wfc_obj.TXNAMT = obje.TXNAMT;
                        //         that.toPayment(data.ORDERNO,obj.BUS_TYPE,obj.TXNAMT);
                        //         // if($('#zfb_zf').html() == '' || $('#zfb_zf').html() == null || $('#zfb_zf').html() == undefined){
                        //         //     $('#zfb_zf').html(data.PAY_BODY)
                        //         // }else{
                        //         //     dialog.loading.close();
                        //         //     $('#zfb_zf').html('')
                        //         //     $('#zfb_zf').html(data.PAY_BODY)
                        //         // }
                        //     }else{
                        //         dialog.loading.close();
                        //         dialog.toast(data.RSPMSG, 'none', 1000);
                        //     }
                        // })
                    }else{
                        dialog.toast(res.RSPMSG, 'none', 1000);
                    }
                }).catch(function(ErrMsg){
                    //获取数据失败时的处理逻辑
                    dialog.loading.close();
                    dialog.toast('请求失败,请联系管理员', 'none', 1000);
                })
            }

        },
        // 第二页 油 金额
        TabtwoRefuelingamountplusless: function(value){
            this.Refuelingamount+=value;
            if(this.Refuelingamount < 100){
                this.Refuelingamount = 100;
                YDUI.dialog.toast('不能少于100元!', 'none', 1500);
            }
            if(this.Refuelingamount > 1000000){
                this.Refuelingamount = 1000000;
                YDUI.dialog.toast('一次最多1000000元!', 'none', 1500);
            }
            this._echatrs(value)
        },
        //油 表
        _echatrs:function(v){
            // Echarts 初始
            // 油
            var that =this;
            if(v>0){
                that.Refuelingamountecharts=that.Refuelingamountecharts+1;
                that.Refuelingamountecharts1=that.Refuelingamountecharts1-1
            }else{
                that.Refuelingamountecharts=that.Refuelingamountecharts-1;
                that.Refuelingamountecharts1=that.Refuelingamountecharts1+1
            }
            if(that.Refuelingamount >= 10000){
                that.Refuelingamountecharts = 100;
                that.Refuelingamountecharts1 = 0;
            }
            if(that.Refuelingamount <= 100){
                that.Refuelingamountecharts = 2;
                that.Refuelingamountecharts1 = 98;
            }
            // console.log(that.Refuelingamountecharts +'------'+ that.Refuelingamountecharts1)
            var myChart1 = echarts.init(document.getElementById('TabtwopagedialAmount'));
            var data=[{value:that.Refuelingamountecharts, name:''}, {value:that.Refuelingamountecharts1, name:''}];
            var a=0;
            for(var i=0; i<data.length; i++)
            {
                a+=data[i].value;
            }
            data.push({value:a, name:'__other', itemStyle:{normal:{color:'rgba(0,0,0,0)'}}});
            //console.log(data);
            var option1 = {

                tooltip : {
                    trigger: 'none'
                    //formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                animation: true,
                color:[ new echarts.graphic.LinearGradient(0, 0, 0, 1,[
                    {offset: 0, color: '#40F2DE'  },
                    {
                        offset: 1, color: '#02AD9A'
                    }], false),'#F3F3F3'],
                series : [
                    {
                        name: '油表',
                        type: 'pie',
                        startAngle:180,
                        radius :  ['130%','50%'],
                        center: ['50%', '80%'],
                        data:data,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        }
                    }
                ]
            };
            myChart1.setOption(option1);
        },
        //第二页 月
        TabtwomonthMontplusless:function(v){
            this.monthMonth+=v;
            if(this.monthMonth < 1){
                this.monthMonth = 1;
                YDUI.dialog.toast('不能少于1个月!', 'none', 1500);
            }
            if(this.monthMonth > 12){
                this.monthMonth = 12;
                YDUI.dialog.toast('最多12个月!', 'none', 1500);
            }
            this._echatrsMonth(v)
        },
        _echatrsMonth:function(va){
            // Echarts 初始
            // 月
            var that =this;
            if(va>0){
                that.monthMonthcharts=that.monthMonthcharts+1;
                that.monthMonthcharts1=that.monthMonthcharts1-1
            }else{
                that.monthMonthcharts=that.monthMonthcharts-1;
                that.monthMonthcharts1=that.monthMonthcharts1+1
            }
            if(that.monthMonth >= 12){
                that.monthMonthcharts = 12;
                that.monthMonthcharts1 = 0;
            }
            if(that.monthMonth <= 1){
                that.monthMonthcharts = 1;
                that.monthMonthcharts1 = 11;
            }
            // console.log(that.Refuelingamountecharts +'------'+ that.Refuelingamountecharts1)
            var myChart1 = echarts.init(document.getElementById('TabtwopagedialMonth'));
            var data=[{value:that.monthMonthcharts, name:''}, {value:that.monthMonthcharts1, name:''}];
            var a=0;
            for(var i=0; i<data.length; i++)
            {
                a+=data[i].value;
            }
            data.push({value:a, name:'__other', itemStyle:{normal:{color:'rgba(0,0,0,0)'}}});
            //console.log(data);
            var option1 = {

                tooltip : {
                    trigger: 'none'
                    //formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                animation: true,
                color:[ new echarts.graphic.LinearGradient(0, 0, 0, 1,[
                    {offset: 0, color: '#40F2DE'  },
                    {
                        offset: 1, color: '#02AD9A'
                    }], false),'#F3F3F3'],
                series : [
                    {
                        name: '月份',
                        type: 'pie',
                        startAngle:180,
                        radius :  ['130%','50%'],
                        center: ['50%', '80%'],
                        data:data,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        }
                    }
                ]
            };
            myChart1.setOption(option1);
        },
        //第三页
        tabpanel3_ziji:function(){
            this.tabpanel3topcolorl = true
            this.tabpanel3topcolorr = true
            this.YourselfOrOthers = false

        },
        tabpanel3_taren:function(){
            this.tabpanel3topcolorl = false
            this.tabpanel3topcolorr = false
            this.YourselfOrOthers = true
            this.tabpanel3idphoto()
        },
        tabpanel3selectsanjiao:function(e){
            $('#tabpanel3select').click()
        },
        tabpanel3idphoto:function(){
            var that = this;
            var maxSize = 1024 * 1024;//  图片大小
            $('#IDphoto2input1').change(function(){
                var file = $('#IDphoto2input1').get(0).files[0];
                // if (file.size > maxSize) {
                //     weui.alert('图片太大，不允许上传');
                //     return;
                // }
                dialog.toast('处理中...','none', 200)
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload=function(e){
                    // console.log(e);
                    ImageCompressionO('ImasesCompressionO',e.target.result,function(d){
                        that.IDphoto2img1 = d; //身份证 正面
                    });
                }
                dialog.loading.close();
            });
            $('#IDphoto2input2').change(function(){
                var file = $('#IDphoto2input2').get(0).files[0];
                // if (file.size > maxSize) {
                //     weui.alert('图片太大，不允许上传');
                //     return;
                // }
                dialog.toast('处理中...','none', 200)
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload=function(e){
                    ImageCompressionO('ImasesCompressionT',e.target.result,function(d){
                        that.IDphoto2img2 = d; //身份证 正面
                    });
                }
                dialog.loading.close();
            })
            $('#IDphoto2input3').change(function(){
                var file = $('#IDphoto2input3').get(0).files[0];
                // if (file.size > maxSize) {
                //     weui.alert('图片太大，不允许上传');
                //     return;
                // }
                dialog.toast('处理中...','none', 200)
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload=function(e){
                    ImageCompressionO('ImasesCompressionTT',e.target.result,function(d){
                        that.IDphoto2img3 = d; //身份证 正面
                    });
                }
                dialog.loading.close();
            })
            $('#IDphoto2input4').change(function(){
                var file = $('#IDphoto2input4').get(0).files[0];
                // if (file.size > maxSize) {
                //     weui.alert('图片太大，不允许上传');
                //     return;
                // }
                dialog.toast('处理中...','none', 200)
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload=function(e){
                    ImageCompressionO('ImasesCompressionF',e.target.result,function(d){
                        that.IDphoto2img4 = d; //身份证 正面
                    });
                }
                dialog.loading.close();
            })
        },
        tabthreeSelectTheTypeOfOilCardgo:function(index){
            var that = this;
            if(index<=0){
                that.tabthreeSelectTheTypeOfOilCard = false;
                that.tabthreeOILCARD_TYPE = 'PetroChina'; //中石油
            }else{
                that.tabthreeSelectTheTypeOfOilCard = true;
                that.tabthreeOILCARD_TYPE = 'Sinopec'; //中石化
            }
        },
        //第三页收货地址
        tabthree_xuanzeshouhuo:function(){
            var that = this;
            console.log(that.shouhuodizhi)
            if(that.shouhuodizhi.length == '0') {
                dialog.toast('您没有收货地址,请去添加收货地址', 'none', 1500);
                return
            }
            var json = '';
            var jsonarray = [];
            // 转换成 weui  格式
            for(var i = 0; i<that.shouhuodizhi.length; i++){
                // 遍历  收货地址  处理成 JSON 格式
                json +='{'+'"'+'label'+'"'+':'+'"'+that.shouhuodizhi[i].AREA+that.shouhuodizhi[i].STREET+that.shouhuodizhi[i].ADDRESS+'",'+'"'+'value'+'"'+':'+i+'},'
            }
            json=json.substring(0,json.length-1); // 去掉最后一个 字符 ',' 号
            jsonarray = JSON.parse('['+json+']');
            weui.picker(jsonarray, {
                onChange: function (result) {
                    // console.log(result);
                },
                onConfirm: function (result) {
                    // console.log(result);
                    that.tabthree_xuanzeshouhuodizhi = jsonarray[result[0]].label;
                }
            });
        },
        //第四页
        tabpanel4_ziji:function() {
            this.tabpanel4topcolorl = true
            this.tabpanel4topcolorr = true
        },
        tabpanel4_taren:function() {
            this.tabpanel4topcolorl = false
            this.tabpanel4topcolorr = false
        },
        tabpanel4zhankaibei:function(e) {
            this.zhankai = !this.zhankai
        },
        //第三页 定位
        // citylocation:function(){
        //     var that = this
        //     // 百度地图API功能
        //     var map = new BMap.Map("allmap");
        //     var point = new BMap.Point();
        //     map.centerAndZoom(point,13);
        //     var geolocation = new BMap.Geolocation();
        //     geolocation.getCurrentPosition(function(r){
        //         if(this.getStatus() == BMAP_STATUS_SUCCESS){
        //             var mk = new BMap.Marker(r.point);
        //             map.addOverlay(mk);
        //             map.panTo(r.point);
        //             //console.log(r);
        //             console.log('您的位置：'+r.point.lng+','+r.point.lat);
        //             that.citylocationa = r.address.province+r.address.city
        //         }else {
        //             alert('failed'+this.getStatus());
        //         }
        //     },{enableHighAccuracy: true})
        // }
        ticket:function(e){
            var that = this;
            layer.open({
                type: 2,
                content: 'ticket.html',
                skin: 'up',
                shadeClose: true,
                title:'请选择优惠券',
                shade: 0.8,
                area: ['100%', '50%'],
                btn:['确定'],
                offset: 'b',
                end:function(){
                    $('#discount').html('减免<font color="#02AD9A" style="padding: 0 .06rem;">'+String(Number(getStore('DISCOUNT'))*Number(that.Payable)/100)+'</font>元')
                    var tt = Number(that.Payable) - Number(that.Payable) * Number(getStore('DISCOUNT')/100)
                    $('#sjMoney').html('&yen;'+String(tt));
                }
              });
        }
    },
    beforeCreate: function () {
        dialog.loading.open('加载中...');
    },
    beforeMount: function () {

    },
    mounted: function () {
        this.$nextTick(function () {
            this._initialization();
            this._echatrs();
            this._echatrsMonth();
        })
    },
    updated: function () {
        dialog.loading.close();
    }
})