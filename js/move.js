(function($){
	//拖拽功能
	$.fn.move = function(options){
	    var _this = this;
	    var $this = $(this);

	    var defalutValue = {
	    	zIndex: 		111111,     //层级
	    	cursor: 		'move',     //鼠标移入的效果
	    	type: 			'all', 		//类型 pc / mobile / all  三种
	    }

	    var opt = $.extend(defalutValue,options||{});

	    defalutValue.pcMove = function(){
		    $this.css({
		      cursor:opt.cursor,
		    });

		    var mouseOffsetX=0;   //获取鼠标距离divtop  left 的像素
		    var mouseOffsetY=0;
		    var isDraging=false;  //是否可以拖动

		    var moveX = 0;  //div需要定位的位置
		    var moveY = 0;

		    $this.on('mousedown',function(e){
		      isDraging=true;

		      var e = e || window.event;
		      mouseOffsetX = e.pageX - $this.offset().left;
		      mouseOffsetY = e.pageY - $this.offset().top;
		      // console.log($this.offset().left+'----'+ $this.offset().top);

		      $(document).on('mousemove',function(e){
		        var e = e || window.event;
		        var mouseX = e.pageX;
		        var mouseY = e.pageY;

		        if(isDraging){
		          moveX = mouseX - mouseOffsetX;
		          moveY =mouseY - mouseOffsetY;

		          var maxX=document.documentElement.scrollWidth-$this.width();
		          var maxY=document.documentElement.scrollHeight-$this.height();

		          moveX = Math.min(maxX,Math.max(0,moveX));
		          moveY = Math.min(maxY,Math.max(0,moveY));

		          $this.css({
		            position:'absolute',
		            transform:'translate3d(0,0,0)',
		            left:moveX,
		            top:moveY,
		            'z-index':1111,
		          })
		        }
		      });

		      $(document).on('mouseup',function(e){
		        isDraging=false;
		        // console.log(isDraging);
		      });
		    });
		}

		defalutValue.mobileMove = function(){
		    //******************************************************这以下是手机上的效果   以上是pc的效果
		    var touch_x = 0,	//手触摸屏幕的起始x值	
				touch_y = 0,	//手触摸屏幕的起始y值
				move_x = 0,
				move_y = 0,
				x = 0,
				y = 0,
				touch_move = 0,
				touch_start = 0;

		    $this.on('touchstart',function(event){
		    	event.preventDefault();
	            touch_start = event.originalEvent.touches[0] || event.originalEvent.targetTouches[0];
	            touch_x = touch_start.pageX - $this.offset().left;
	            touch_y = touch_start.pageY - $this.offset().top;
		    });

		    $this.on('touchmove',function(event){
		    	touch_move = event.originalEvent.touches[0] || event.originalEvent.targetTouches[0];
	            move_x = touch_move.pageX;
	            move_y = touch_move.pageY;
	            x = (move_x - touch_x);    //获取的是手指x方向的位移距离
	            y = (move_y - touch_y);    //获取的是手指y方向的位移距离

				var maxX=document.documentElement.scrollWidth-$this.width();
				var maxY=document.documentElement.scrollHeight-$this.height();

				x = Math.min(maxX,Math.max(0,x));
				y = Math.min(maxY,Math.max(0,y));

	            $this.css({
	            	position:'absolute',
		            transform:'translate3d(0,0,0)',
		            left:x,
		            top:y,
		            'z-index':options.zIndex,
	            });
		    });
		}

		switch (opt.type){
			case 'pc':
				defalutValue.pcMove();
				break;
			
			case 'mobile':
				defalutValue.mobileMove();
				break;

			case 'all':
				defalutValue.pcMove();
				defalutValue.mobileMove();
				break;
		}

	    return _this;
	}
})(jQuery)