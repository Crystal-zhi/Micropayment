var vm = new Vue({
    el:'#mainBox',
    data:{
        pointsIndex:0
    },
    computed:{
        srcUrl:function(){
            if(this.pointsIndex==0){
                return "./../public/img/CreditPoints/5.png";
            }
            if(this.pointsIndex==1){
                return "./../public/img/CreditPoints/6.png";
            }
            if(this.pointsIndex==2){
               return "./../public/img/CreditPoints/7.png"; 
            }
            if(this.pointsIndex==3){
                return "./../public/img/CreditPoints/8.png";
            }
            if(this.pointsIndex==4){
                return "./../public/img/CreditPoints/9.png";
            }
        },
    },
    methods:{
        changeIndex:function(i){
            this.pointsIndex=i;
        },
        goBackToTheLastPage:function(){
            window.history.go(-1)
        }
    }
})