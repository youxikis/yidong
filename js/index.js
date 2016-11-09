$(function(){
    var headr=$(".hdR")[0]
    var headr_lis=$("li",headr); 
    var dlxia=$(".dlxia")[0]
    var sjyytxia=$(".sjyytxia")[0]
    var dlf=$("#dlf");
    var sjyyt=$("#sjyyt");
     headr_lis[0].onmouseover=function()
     {

        dlxia.style.display="block"
         headr_lis[0].style.background="#fff";
         dlf.style.color="#25b2fe";
     }
      headr_lis[0].onmouseout=function()
     {   
        dlxia.style.display="none"
       headr_lis[0].style.background="";
         dlf.style.color="#e40077";
     } 
     headr_lis[1].onmouseover=function()
     {  
        sjyytxia.style.display="block"
         sjyyt.style.color="#25b2fe";
     }
      headr_lis[1].onmouseout=function()
     {   
        sjyytxia.style.display="none"
         sjyyt.style.color="#888";
     } 


//地点选择
    var selectL=$(".selectL")[0];
	var city=$(".location")[0];
	var body=$("body")[0];
	city.onclick=function(e){
	   var e=e||window.event;
	   if(e.cancelBubble){
	     e.cancelBubble=true;
	   }else{
	    e.stopPropagation();
	   }
       selectL.style.display="block";
	  } 
	body.onclick=function(){
		  selectL.style.display="none";
	   }
	
//导航
    var item=$(".item");
    // var dhas=$("a",item[0])[0];
    var itemxia=$(".itemxia");
    for(var i=0;i<item.length;i++)
    {

       item[i].index=i;
       item[i].onmouseover=function()

       {
          var dhas=$("a",item[this.index])[0];
          itemxia[this.index].style.display="block";
          item[this.index].style.background="#f6f6f6";
           dhas.style.color="#0085d2";

       }
        item[i].onmouseout=function()
       {
           var dhas=$("a",item[this.index])[0];
          itemxia[this.index].style.display="none";
           item[this.index].style.background="#e4e4e4"
           dhas.style.color="#6F676C";

       } 
     }

/*    var item=$(".item");   
    var itemxia=$(".itemxia");
    for(var i=0;i<item.length;i++)
    {
       function(n){
       item[n].onmouseover=function()
       {
          itemxia[n].style.display="block";

       }
        item[n].onmouseout=function()
       {
          itemxia[n].style.display="none";

       } 
     }(i)
   }*/


/*  var item=$(".item");   
    var itemxia=$(".itemxia");
   item[i].onmouseover=(function(n){
      return function(){
        list[n].style.display="block";
      }
   })(i)*/


/*轮播图*/
var  midBn=$(".midBn")[0];
var  imgs=$("a",$(".midimgs")[0])
var  buttons=$("li",$(".button")[0]);

/*页面初始化*/

/*imgs[0].style.zIndex=10;
//buttons[0].classList.add("btncolor");//添加类名
 buttons[0].id="btncolor";
*/
/*自动轮播*/
 // var now=0;//记录当前窗口中图片的下标（）
 // var t=setInterval(move,2000);

 /*鼠标以上停止，移开轮播 */

  // midBn.onmouseover=function(){
  //      clearInterval(t);
  //   }
  //   midBn.onmouseout=function(){
  //      t=setInterval(move,2000);
  //  }

/* 圈圈list */
    
/*    for(var i=0;i<imgs.length;i++)
    {
       buttons[i].index=i;
       buttons[i].onclick=function()
       {
          for(var i=0;i<imgs.length;i++){
             imgs[i].style.zIndex=5;
            buttons[i].id="";;
        }
        buttons[this.index].id="btncolor";
        imgs[this.index].style.zIndex=10;
        now=this.index;
       }

     }*/

/*左右按钮*/

/*    bnL.onclick=function(){
      moveL();
   }
     
     bnR.onclick=function(){
      move();
   }

   function move(){
      now++;
      if(now==imgs.length){
        now=0;
      }//让小标达到最大长度时，变回0

      for(var i=0;i<imgs.length;i++){
        imgs[i].style.zIndex=5;
        buttons[i].id="";

      }//调低所有图片的层级
      imgs[now].style.zIndex=10;//调高当前图片层级
      buttons[now].id="btncolor";
 }

   
     function moveL(){
       now--;
       if(now<0)
       {
         now=imgs.length-1;
       }
       
       for(var i=0;i<imgs.length;i++) 
       {
         imgs[i].style.zIndex=5;
         buttons[i].id="";

       }
         imgs[now].style.zIndex=10;
         buttons[now].id="btncolor";     //按钮添加
  }*/

 /*无缝轮播*/
//将除了第一张的图片放在右边
  var mx=parseInt(getStyle(midBn,"width")); 
  for(var i=0;i<imgs.length;i++){
      if(i==0){
         continue;
      }
      imgs[i].style.left=mx+"px";

  }
  /*初始化*/
  buttons.id="btncolor"
   var now=0;
   var next=0;
   var t=setInterval(move,2000)
     midBn.onmouseover=function(){
         clearInterval(t)
     }
     midBn.onmouseout=function(){
         t=setInterval(move,2000)
     }


    /*选项卡next 相当于this.index*/
    // for(var i=0;i<imgs.length;i++)
    // {
    //    buttons[i].index=i;
    //    buttons[i].onclick=function(){
    //       imgs[this.index].style.left=mx+"px";
    //       buttons[now].id=""
    //       buttons[this.index].id="btncolor"
    //       animate(imgs[now],{left:-mx});
    //       animate(imgs[this.index],{left:0});
    //       now=this.index;
    //       next=this.index;
    //    }

    //  }

/*选项卡*/
    for(var i=0;i<imgs.length;i++){
       buttons[i].index=i;
       buttons[i].onclick=function(){             
       
           if(now>this.index){
              imgs[this.index].style.left=-mx+"px"; 
              animate(imgs[now],{left:mx},600);
              animate(imgs[this.index],{left:0},600);

           }else if(now<this.index){
              imgs[this.index].style.left=mx+"px";
              animate(imgs[now],{left:-mx},600);
              animate(imgs[this.index],{left:0},600);

           }else{
              return
           }
           buttons[now].id="";
           buttons[this.index].id="btncolor" ; 
           now=this.index;
           next=this.index;  
        }
       }

  /*
   now:当前图片
   next:即将要动的图片 
   imgs[now]  left:-mx
   imgs[next]  left:0
  */

  /*左右按钮*/
   var bnL=$(".bnL")[0];
   var bnR=$(".bnR")[0]; 
   var flag=true;
   bnL.onclick=function(){
       if(flag){
          moveL();
          flag=false;
      }

   }
     
     bnR.onclick=function(){
     
          if(flag){
          move();
          flag=false;
      }
   }

   function move(){
     next++;
     if(next==imgs.length){
       next=0;
     }  
      imgs[next].style.left=mx+"px";
      buttons[now].id=""
      buttons[next].id="btncolor"
      animate(imgs[now],{left:-mx},600);
      animate(imgs[next],{left:0},600,function(){flag=true});
      now=next;
   }
   function moveL(){
     next--;
     if(next<0){
       next=imgs.length-1;
     }  
      imgs[next].style.left=-mx+"px";
      buttons[now].id=""
      buttons[next].id="btncolor"
      animate(imgs[now],{left:mx},600);
      animate(imgs[next],{left:0},600,function(){flag=true});
      now=next;
   }


// 节点轮播
 nodeLunbo($(".bnBot")[0],$(".imgboxs")[0],$(".small"),$(".left-btn")[0],rbtn=$(".right-btn")[0],1)

// 放大缩小
// function zhangsuo(){
//   var allPics=$("img",$(".rightBnT")[0]);
 
//   console.log(allPics)
  
      
//       allPics[this].onmouseover=function(){         
//          var img=$("img",this)
//          // animate(img,{width:34;height:34;},1)
//          img.style.width="34px";
         
//       }
//       allPics[this].onmouseout=function(){         
//          var img=$("img",this)
//          animate()
         
//       }
//   }

// zhangsuo();


// 公告轮播
var gonggao=$(".gonggao")[0];
var gonggaoZh=$(".gonggaoZh")[0]
var gglis=$("li",$(".gonggaoZh")[0]);
var gengduoL=$(".gengduoL")[0];
var gengduoR=$(".gengduoR")[0];
nodeLunbo2(gonggao,gonggaoZh,gglis,gengduoL,gengduoR,1);


//    固定右
    var guding2=$(".guding2")[0];
//  var divs=$("div",guding2);
     console.log(divs.length)
    for(var i=0;i<divs.length;i++){
        divs[i].index=i;

        divs[i].onmouseover=function(){
            animate(divs[this.index],{left:-84},300);
        }
        divs[i].onmouseout=function(){
            animate(divs[this.index],{left:-22},300);
        }
    }
})


