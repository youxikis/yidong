//获取类名的兼容性函数
function getClass(classname,obj){
	//判断是否传进obj
	obj=obj||document;
    //判断是否支持obj.getElementsByClassName
	if(obj.getElementsByClassName){
		//支持
		return obj.getElementsByClassName(classname);
	}
	else{
		//不支持  获取全部
		var all=obj.getElementsByTagName("*");
		var arr=[];
		//将符合条件的筛选出来放进新数组
		for(var i=0;i<all.length;i++){
             if(checkClass(all[i].className,classname)){
                 arr.push(all[i]);
             }
		}
		return arr;
	}
}
//checkClass()检测对象的所有类名是否包含目标类名
function checkClass(classstr,classname){
    //字符串转换成数组
    var classarr=classstr.split(" ");
    for(var i=0;i<classarr.length;i++){
        if(classarr[i]==classname){
        	return true;
        }
    }
    return false;
}

// 设置或获取内容  value:要设置的内容
function oprateContent(obj,value){
	// 设置内容
	if(value){
	  if(obj.innerText){
	  
	    obj.innerText=value;
	  }
	  else{
	    obj.textContent=value;

	 }  
    }
    // 获取内容
  else{
  	 if(obj.innerText){
	   return obj.innerText;
	  }
	  else{
		return obj.textContent;
	 }
  }
}
// 获取样式  obj  style:要获取的属性
function getStyle(obj,style){
	if(obj.currentStyle){
		return obj.currentStyle[style];

	}
	else{
		return window.getComputedStyle(obj,null)[style];
	}
}

// $(".one")
// $("#one")
// $("div")
function $(name,obj){
  if(typeof name=="string"){
    	 var obj=obj||document;
    	 //去除不小心打出的前后的空格
    	 var name=name.replace(/^\s*|\s*$/g,"");
    	 if(name.charAt(0)=="#"){
    	 	return document.getElementById(name.slice(1));
    	 }
    	 else if(name.charAt(0)=="."){
             return getClass(name.slice(1),obj);
    	 }
    	 else if(/^[a-zA-z][a-zA-z0-9]{0,10}$/.test(name)){
             return obj.getElementsByTagName(name);
    	 }
       else if(/^<[a-zA-z][a-zA-z0-9]{0,10}>$/.test(name)){
             return document.createElement(name.slice(1,-1));
       }	
   }
   else if(typeof name=="function"){
  	   window.onload=function(){
  	   	  name();
  	   }
   }
}

// 获取子节点 type:no yes no:只获取元素节点 yes:获取元素节点和非空格的文本
function getChilds(obj,type){
    type=type||"no"
    var child=obj.childNodes
    var arr=[]
    for(var i=0;i<child.length;i++){
        if(type=="no"){
        	if(child[i].nodeType==1){
        		arr.push(child[i])
        	}
            
        }
        else if(type=="yes"){
            if(child[i].nodeType==1||child[i].nodeType==3&&child[i].nodeValue.replace(/^\s*|\s*$/g,""))
            {
            	arr.push(child[i])
            }
        }
    }
    return arr    
}

function firstChild(obj,type){
    type=type||"no";
    return getChilds(obj,type)[0];

}
function lastChild(obj,type){
	type=type||"no";
    return getChilds(obj,type)[getChilds(obj,type).length-1];
}
// 获取第n个孩子
function getN(obj,n,type){
	type=type||"no";
	var childs=getChilds(obj,type);

	if(n>childs.length||n<1){
		return false;
	}
	return childs[n-1];

}
// 获得下一个兄弟节点
function getNext(obj,type){
    type=type||"no";
    var next=obj.nextSibling;
    if(next==null){
       return false
    }
    if(type=="no"){
       while(next.nodeType==3||next.nodeType==8){
       	  next=next.nextSibling;
       	  if(next==null){
       	  	 return false;
       	  }
       }
       return next;
    }
    else if(type=="yes"){
        while(next.nodeType==3&&!next.nodeValue.replace(/^\s*|\s*$/g,"")||next.nodeType==8){
       	  next=next.nextSibling;
       	  if(next==null){
       	  	 return false;
       	  }
       }
       return next;
    }

}
// 获得上一个兄弟节点
function getPrevious(obj,type){
    type=type||"no";
    var previous=obj.previousSibling;
    if(previous==null){
       return false
    }
    if(type=="no"){
       while(previous.nodeType==3||previous.nodeType==8){
       	  previous=previous.previousSibling;
       	  if(previous==null){
       	  	 return false;
       	  }
       }
       return previous;
    }
    else if(type=="yes"){
        while(previous.nodeType==3&&!previous.nodeValue.replace(/^\s*|\s*$/g,"")||previous.nodeType==8){
       	  previous=previous.previousSibling;
       	  if(previous==null){
       	  	 return false;
       	  }
       }
       return previous;
    }
}

// 插入一个元素在某一元素之前  obj1：要插入的元素  obj:要插入到obj之前
function insertBefore(obj1,obj){
    var parent=obj.parentNode;
    parent.insertBefore(obj1,obj)
}

// 插入一个元素在某一元素之后
function insertAfter(obj1,obj){
	var parent=obj.parentNode;
	var objnext=getNext(obj,"yes");
	if(!objnext){
		parent.appendChild(obj1)
	}
	else{
		parent.insertBefore(obj1,objnext);
    }
}

//15.hover
//判断某个元素是否包含有另外一个元素
function contains (parent,child) {
    if(parent.contains){
        return parent.contains(child) && parent!=child;
    }else{
        return (parent.compareDocumentPosition(child)===20);
    }
}

//判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
function checkHover (e,target) {
    if(getEvent(e).type=="mouseover"){
        return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
            !((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
    }else{
        return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
            !((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
    }
}
//鼠标移入移出事件
/*
 hover 不能用于事件委托
 obj   要操作的对象
 overfun   鼠标移入需要处理的函数
 outfun     鼠标移除需要处理的函数
 */
function hover (obj,overfun,outfun) {
    if(overfun){
        obj.onmouseover=function  (e) {
            if(checkHover(e,obj)){
                overfun.call(obj,[e]);
            }
        }
    }
    if(outfun){
        obj.onmouseout=function  (e) {
            if(checkHover(e,obj)){
                outfun.call(obj,[e]);
            }
        }
    }
}


/*封装节点轮播图：
box:最外层框
obj:要轮播的对象
sBox:每次轮播的小对象
lBtn,rBtn:左右按钮 
num:一次轮播几张
*/
function nodeLunbo(box,obj,sBox,lBtn,rBtn,num){
    var  box=box;
    var  imgBox=obj;
    var  lbtn=lBtn;
    var  rbtn=rBtn;
    var  sbox=sBox;
    var  n=num;
    var  width=parseInt(getStyle(sbox[0],"width"))+parseInt(getStyle(sbox[0],"border-right"));
         // imgbox.style.width=width*sbox.length+"px"
    var  flag=true;
    var  tt=setInterval(moveL2,2000);
         function moveL2(){  
            animate(imgBox,{left:-width*n},700,function(){
                for(var i=1;i<=n;i++){
                  var first=firstChild(imgBox);      
                  imgBox.appendChild(first);
                  imgBox.style.left=0;
                }
                flag=true;
            })

     }
        function moveR2(){
          for(var i=1;i<=n;i++){
            var first=firstChild(imgBox);
            var last=lastChild(imgBox);
            insertBefore(last,first);  
             
          }
          imgBox.style.left=-width*n+"px";   
          animate(imgBox,{left:0},700,function(){flag=true});
    }
        box.onmouseover=function(){
          clearInterval(tt);
    }
        box.onmouseout=function(){
          tt=setInterval(moveL2,2000);
    }

        lbtn.onclick=function(){
          if(flag){
            flag=false;
            moveR2();

          }     
    }
        rbtn.onclick=function(){
          if(flag){
            flag=false;
            moveL2();
          } 
    }

}


function nodeLunbo2(box,obj,sBox,lBtn,rBtn,num){
    var  box=box;
    var  imgBox=obj;
    var  lbtn=lBtn;
    var  rbtn=rBtn;
    var  sbox=sBox;
    var  n=num;
    var  width=parseInt(getStyle(sbox[0],"width"));
         // imgbox.style.width=width*sbox.length+"px"
   
    var  tt=setInterval(moveL2,5000);
         function moveL2(){ 
             imgBox.style.left= -width*n+"px";
             for(var i=1;i<=n;i++){
                      var first=firstChild(imgBox);      
                      imgBox.appendChild(first);
                      imgBox.style.left=0;
                    }
           


     }
        function moveR2(){
          for(var i=1;i<=n;i++){
            var first=firstChild(imgBox);
            var last=lastChild(imgBox);
            insertBefore(last,first);  
             
          }
          imgBox.style.left=-width*n+"px";   
          imgBox.style.left=0;
          flag=true
    }
        box.onmouseover=function(){
          clearInterval(tt);
    }
        box.onmouseout=function(){
          tt=setInterval(moveL2,2000);
    }

        lbtn.onclick=function(){
          
            
            moveR2();

             
    }
        rbtn.onclick=function(){
         
            moveL2();
         
    }

}