          var speed=10; // lower number for faster
          var leaves=50; // number of leaves falling at a time
          var untidy=30;  
          
          var boddie;
          var dx=new Array();
          var xp=new Array();
          var yp=new Array();
          var am=new Array();
          var dy=new Array();
          var le=new Array();
          var swide=480;
          var shigh=320;
          var sleft=0;
          var starty=0;
          var offset=0;
          var tidying=0; 
          var deeex=0;
          var has_focus=true;
          var ie_version=(navigator.appVersion.indexOf("MSIE")!=-1)?parseFloat(navigator.appVersion.split("MSIE")[1]):false;
          var leafy=new Array();
          var leaf_image=new Array();
           
          leaf_image[0]='snowy.svg';
           
          leaf_image[1]='snowy.svg';
           
          leaf_image[2]='snowy.svg';
           
          leaf_image[3]='snowy.svg';

          function addLoadEvent(funky) {
            var oldonload=window.onload;
            if (typeof(oldonload)!='function') window.onload=funky;
            else window.onload=function() {
              if (oldonload) oldonload();
              funky();
            }
          }

          addLoadEvent(september_21);

          function september_21() { if (document.getElementById) {
            var i;
            if (ie_version) {
              document.onfocusin=function(){has_focus=true;};
              document.onfocusout=function(){has_focus=false;};
            } 
            else {
              window.onfocus=function(){has_focus=true;};
              window.onblur=function(){has_focus=false;};
            }
            window.onscroll=set_scroll;
            window.onresize=set_width;
            document.onmousemove=mouse;
            boddie=document.createElement("div");
            boddie.style.position="fixed";
            boddie.style.bottom="0px";
            boddie.style.left="0px";
            boddie.style.width="100%";
            boddie.style.overflow="visible";
            boddie.style.backgroundColor="transparent";
            boddie.style.pointerEvents="none";
            boddie.style.zIndex="0";
            document.body.insertBefore(boddie, document.body.firstChild); 
            set_width();
            for (i=0; i<leaves; i++) start_leaf(Math.random()*shigh*3/4);
            offset=0;
            setInterval("falling_leaves()", speed);
          }}


        function start_leaf(whyp) {
            starty++;
            offset++;
            var f, size;
            size=start_fall(starty, whyp);
            f=document.createElement("img");
            f.src=leaf_image[starty%leaf_image.length];
            f.width=size;
            f.style.height="auto";
            f.style.position="absolute";
            f.style.zIndex=1000+starty;
            f.style.top=yp[starty]+"px";
            f.style.left=xp[starty]+"px";
            leafy[starty]=f;
            boddie.appendChild(f);
          }
            
          function start_fall(i, whyp) {
            var size=72-Math.floor(36*Math.random());
            dx[i]=Math.random();
            am[i]=8+Math.random()*24;
            dy[i]=1+Math.random()*2;
            xp[i]=Math.random()*(swide-size);
            yp[i]=whyp-size;
            le[i]='falling';
            return size;
          }

          function set_width() {
            var sw, sh;
            if (typeof(window.innerWidth)=='number' && window.innerWidth) {
              sw=window.innerWidth;
              sh=window.innerHeight;
            }
            else if (document.compatMode=="CSS1Compat" && document.documentElement && document.documentElement.clientWidth) {
              sw=document.documentElement.clientWidth;
              sh=document.documentElement.clientHeight; 
            }
            else {
              sw=document.body.clientWidth;
            sh=document.body.clientHeight;
            }
            if (sw && sh && has_focus) {
              swide=sw;
              shigh=sh;
            }
            boddie.style.height=shigh+"px";
          }

          function falling_leaves() {
            var i;
            var c=0;
            for (i=0; i<starty; i++) {
              if (leafy[i] && le[i]!='tidying') {
              if (yp[i]>shigh || xp[i]>swide || xp[i]<-leafy[i].width) {
                if (offset>0) offset--;
                boddie.removeChild(leafy[i]);
                leafy[i]=false;
              }
              else if (yp[i]+untidy*offset/leaves<shigh-leafy[i].height/2) {
                yp[i]+=dy[i];
                dx[i]+=0.025+Math.random()/10;
                xp[i]+=deeex;
                leafy[i].style.top=(yp[i]-am[i]/2*Math.abs(Math.sin(dx[i])))+"px";
                leafy[i].style.left=(xp[i]+am[i]*Math.sin(dx[i]))+"px";
              }
              else if (le[i]=='falling') le[i]='landed';
            }
            if (leafy[i] && le[i]=='falling') c++;
            }
            if (c<leaves) start_leaf(0);
          }

          function set_scroll() {
            if (typeof(self.pageXOffset)=='number' && self.pageXoffset) sleft=self.pageXOffset;
            else if (document.body && document.body.scrollLeft) sleft=document.body.scrollLeft;
            else if (document.documentElement && document.documentElement.scrollLeft) sleft=document.documentElement.scrollLeft;
            else sleft=0;
          }

          function mouse(e) {
            var x;
            if (e) x=e.pageX;
            else {
            x=event.x;
              set_scroll();
              x+=sleft;
            }
            deeex=has_focus?Math.floor(-1.5+4*(x-sleft)/swide):0;
          }