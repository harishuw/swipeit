/*
****swipeit 1.0*******************
****swipeit.js********************
****Created by Harish U Warrier***
****Created on 12-09-2018*********
*/
var swipeit=function(elem){
    this.time=300;
    this.d=0;
    this.x=0;
    this.y=0;
    this.t=0;
    this.len=arguments[1]||0;
    var $this=this;
    var el=document.querySelector(elem);
    var getxy=function(evt){
        var xy=evt.changedTouches[0];
        return {x:xy.pageX,y:xy.pageY};  
    };
    this.swipeleft=function(){};
    this.swiperight=function(){};
    this.swipeup=function(){};
    this.swipedown=function(){};
    el.addEventListener("touchstart", function(e){
        $this.d = 0;
        var xy=getxy(e);
        $this.x = xy.x;
        $this.y = xy.y;
        $this.t = new Date().getTime();
    });
    function process(e){
        var xy=getxy(e);
        var x1 = xy.x - $this.x;
        var y1 = xy.y - $this.y;
        $this.d=x1;
        var ety=Math.abs(y1);
        var et=new Date().getTime() - $this.t;
        var params={x:x1,y:y1 };
        if(Math.abs(x1)>Math.abs(y1)){
            var l = new CustomEvent('swipeleft', { detail: {x:x1,y:y1 }});
            var r = new CustomEvent('swiperight', { detail: {x:x1,y:y1 }});
            if(x1>0){
                el.dispatchEvent(r);
                $this.swiperight({type:"right",x:x1,y:y1});
                if($this.len>0 && et <= $this.time && $this.d >= $this.len && ety <= $this.len){
                    el.dispatchEvent(new CustomEvent('swiperight'+$this.len, { detail:params }));
                }
            }else{                
                el.dispatchEvent(l);
                $this.swipeleft({type:"left",x:x1,y:y1 });
            }            
        }else{
            var u = new CustomEvent('swipeup', { detail: {x:x1,y:y1 }});
            var dw = new CustomEvent('swipedown', { detail: {x:x1,y:y1 } });
            if(y1>0){
                el.dispatchEvent(dw);
                $this.swipedown({type:"down",x:x1,y:y1 });
            }else{                
                el.dispatchEvent(u);
                $this.swipeup({type:"up",x:x1,y:y1 });
            }          
        }        
    };   
    el.removeEventListener("touchend",process);
    el.addEventListener("touchend",process);
    el.addEventListener("touchcancel", function(){
        
    });
    el.addEventListener("touchmove", function(){
        
    });  
};

(function () {
    if(typeof window.CustomEvent === "function" ) return false; 
    function CustomEvent ( event, params ) {
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        var evt = document.createEvent( 'CustomEvent' );
        evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
        return evt;
    }
    CustomEvent.prototype = window.Event.prototype;
    window.CustomEvent = CustomEvent;
})();