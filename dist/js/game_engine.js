var Actor,Box,Circle,CircleActor,Controller,Game,Keys,Loader,MathHelpers,PreloaderStage,STATE,Shape,Sprite,SquareActor,Stage,TileMap,Timer,Vector,bind=function(t,i){return function(){return t.apply(i,arguments)}},extend=function(t,i){function e(){this.constructor=t}for(var s in i)hasProp.call(i,s)&&(t[s]=i[s]);return e.prototype=i.prototype,t.prototype=new e,t.__super__=i.prototype,t},hasProp={}.hasOwnProperty;Loader={numberOfImages:0,numberComplete:0,images:{},loadImage:function(t,i){var e;return Loader.numberOfImages++,e=new Image,e.onload=function(){return Loader.images[t]=e,Loader.numberComplete++},e.src=i},getImage:function(t){return Loader.images[t]},getProgress:function(){return Loader.numberComplete/Loader.numberOfImages},doneLoading:function(){return 1===Loader.getProgress()}},Vector=function(){function t(t,i){this.x=null!=t?t:0,this.y=null!=i?i:0,this.subtract=bind(this.subtract,this),this.add=bind(this.add,this),this.rotate=bind(this.rotate,this)}return t.prototype.rotate=function(t){var i,e;return i=this.x,e=this.y,this.x=i*Math.cos(t)-e*Math.sin(t),this.y=i*Math.sin(t)+e*Math.cos(t)},t.prototype.add=function(i){if(i instanceof t)return this.x+=i.x,this.y+=i.y},t.prototype.subtract=function(i){if(i instanceof t)return this.x-=i.x,this.y-=i.y},t}(),Shape=function(){function t(t){this.position=t}return t}(),Circle=function(t){function i(t,e){this.radius=null!=e?e:0,i.__super__.constructor.call(this,t)}return extend(i,t),i}(Shape),Box=function(t){function i(t,e,s){this.w=null!=e?e:0,this.h=null!=s?s:0,i.__super__.constructor.call(this,t)}return extend(i,t),i}(Shape),MathHelpers={isCircleInRect:function(t,i){var e,s,r,o,n,h,a,l;if(t instanceof Circle&&i instanceof Box)return a=i.position.x,n=a+i.w,l=i.position.y,h=l+i.h,r=t.position.x-t.radius,e=t.position.x+t.radius,o=t.position.y-t.radius,s=t.position.y+t.radius,!(a>r||n<e||l>o||h<s)},doesCircleRectIntersect:function(t,i){var e,s,r,o;if(t instanceof Circle&&i instanceof Box)return e=t.position,o=i.position,s=e.x-Math.max(o.x,Math.min(e.x,o.x+i.w)),r=e.y-Math.max(o.y,Math.min(e.y,o.y+i.h)),s*s+r*r<t.radius*t.radius},doesCircleCircleIntersect:function(t,i){var e,s,r;if(t instanceof Circle&&i instanceof Circle)return e=t.position,s=i.position,r=MathHelpers.getDistance(e.x,e.y,s.x,s.y),!(t.radius+i.radius<r)},toDegrees:function(t){return t*(180/Math.PI)},toRadians:function(t){return t*(Math.PI/180)},getDistance:function(t,i,e,s){return Math.sqrt(Math.pow(e-t,2)+Math.pow(s-i,2))}},Sprite=function(){function t(t,i){this.image=t,this.spriteSize=i,this.updateFrame=bind(this.updateFrame,this),this.setCycle=bind(this.setCycle,this),this.flipped=!1,this.frame=0,this.timer=void 0}return t.prototype.draw=function(t,i,e,s){var r,o,n;return r=this.cycle[this.frame],o=r.col*this.spriteSize,n=r.row*this.spriteSize,e.save(),e.translate(t,i),e.globalAlpha=s,e.drawImage(this.image,o,n,this.spriteSize,this.spriteSize,0,0,this.spriteSize,this.spriteSize),e.restore()},t.prototype.setCycle=function(t,i){return this.cycle=t,this.interval=null!=i?i:0,this.cycleLength=this.cycle.length,this.frame=0,this.timer=new Timer(this.interval)},t.prototype.updateFrame=function(t){if(this.timer.tick(t),this.timer.hasEnded())return this.frame=(this.frame+1)%this.cycleLength,this.timer.restart()},t}(),Controller=function(){function t(){document.onkeyup=function(i){return t.pressed[i.keyCode]=!1},document.onkeydown=function(i){return t.pressed[i.keyCode]=!0}}var i;return i=null,t.pressed=new Map,t.get=function(){return null==this.instance&&(i=new this),i},t.prototype.isPressed=function(i){return t.pressed[i]},t}(),Keys={ENTER:13,LEFT:37,RIGHT:39,UP:38,DOWN:40,A:65,D:68,W:87,S:83},Actor=function(){function t(t,i,e){this.direction=null!=e?e:0,this.lookAt=bind(this.lookAt,this),this.setDirection=bind(this.setDirection,this),this.setPosition=bind(this.setPosition,this),this.setStage=bind(this.setStage,this),this.position=new Vector(t,i),this.stage=null,this.destroy=!1}return t.prototype.init=function(){if(this._init)return this._init()},t.prototype.update=function(t){if(this._update)return this._update(t)},t.prototype.render=function(){if(this._render)return this._render()},t.prototype.setStage=function(t){this.stage=t},t.prototype.setPosition=function(t,i){return null==t&&(t=0),null==i&&(i=0),this.position=new Vector(t,i)},t.prototype.setDirection=function(t){return this.direction=t*(Math.PI/180)},t.prototype.shouldDestroy=function(){return this.destroy},t.prototype.lookAt=function(t){return t instanceof Vector?this.direction=Math.atan2(t.x-this.position.y,t.x-this.position.x):void console.log("ERROR: "+t+" is not an Point")},t}(),SquareActor=function(t){function i(t,e,s,r,o){null==s&&(s=0),this.width=null!=r?r:0,this.height=null!=o?o:0,this.updateBody=bind(this.updateBody,this),i.__super__.constructor.call(this,t,e,s),this.body=new Box(this.position,this.width,this.height)}return extend(i,t),i.prototype.updateBody=function(){return this.body=new Box(this.position,this.width,this.height)},i}(Actor),CircleActor=function(t){function i(t,e,s,r){null==s&&(s=0),this.radius=null!=r?r:0,this.updateBody=bind(this.updateBody,this),i.__super__.constructor.call(this,t,e,s),this.body=new Circle(this.position,this.radius)}return extend(i,t),i.prototype.updateBody=function(){return this.body=new Circle(this.position,this.radius)},i}(Actor),TileMap=function(){function t(t,i,e,s,r){this.cols=null!=t?t:0,this.rows=null!=i?i:0,this.tileSize=null!=e?e:0,this.tiles=null!=s?s:[],this.ctx=null!=r?r:void 0}return t.prototype.getTile=function(t,i){return this.tiles[i*this.cols+t]},t.prototype.render=function(){if(this._render)return this._render()},t}(),Timer=function(){function t(t){this.timeout=t,this.restart=bind(this.restart,this),this.end=bind(this.end,this),this.tick=bind(this.tick,this),this.elapsed=0}return t.prototype.tick=function(t){return this.elapsed+=t},t.prototype.end=function(t){return this.elapsed=this.timeout},t.prototype.hasEnded=function(){return this.elapsed>=this.timeout},t.prototype.restart=function(){return this.elapsed=0},t}(),STATE={finished:0,running:1},Stage=function(){function t(t,i,e){this.width=t,this.height=i,this.ctx=null!=e?e:void 0,this.setContext=bind(this.setContext,this),this.addActor=bind(this.addActor,this),this.actors=[],this.bounds=new Box(new Vector,this.width,this.height),this.state=STATE.running,this.controller=Controller.get()}return t.prototype.addActor=function(t){return t instanceof Actor?(t.setStage(this),t.init(),this.actors.push(t)):void console.log("ERROR: "+t+" is not an Actor")},t.prototype.init=function(){if(this.actors=[],this.state=STATE.running,this._init)return this._init()},t.prototype.update=function(t){var i,e,s,r,o;for(this._update&&this._update(t),r=this.actors,o=[],e=0,s=r.length;e<s;e++)i=r[e],o.push(i.update(t));return o},t.prototype.render=function(){var t,i,e,s,r;for(this._render&&this._render(),s=this.actors,r=[],i=0,e=s.length;i<e;i++)t=s[i],r.push(t.render());return r},t.prototype.setContext=function(t){this.ctx=t},t.prototype.getContext=function(){return this.ctx},t.prototype.isCircleInBounds=function(t){return t instanceof Circle&&MathHelpers.isCircleInRect(t,this.bounds)},t}(),PreloaderStage=function(t){function i(t,e,s){this._update=bind(this._update,this),i.__super__.constructor.call(this,t,e,s),this.progress=Loader.getProgress()}return extend(i,t),i.prototype.drawLoaderProgress=function(){var t,i,e,s;return s=20,e=this.width-2*s,t=50,i=e*this.progress,this.ctx.strokeRect(s,this.height/2-t/2,e,t),this.ctx.fillRect(s,this.height/2-t/2,i,t)},i.prototype._init=function(){},i.prototype._update=function(t){this.progress=Loader.getProgress(),Loader.doneLoading()&&(this.state=STATE.finished)},i.prototype._render=function(){return this.ctx.save(),this.drawLoaderProgress(),this.ctx.restore()},i}(Stage),Game=function(){function t(i,e,s,r){this.canvas=null!=r?r:void 0,this.gameStep=bind(this.gameStep,this),this.render=bind(this.render,this),this.start=bind(this.start,this),this.border=bind(this.border,this),this.backgroundColor=bind(this.backgroundColor,this),this.setStage=bind(this.setStage,this),this.canvas||(this.canvas=document.createElement("canvas"),document.body.appendChild(this.canvas)),this.canvas.ctx=this.canvas.getContext("2d"),this.canvas.width=i,this.canvas.height=e,this.canvas.addEventListener("mousemove",function(i){var e;return e=this.getBoundingClientRect(),t.mousePoint=new Vector(i.clientX-e.left,i.clientY-e.top)}),this.running=!1,this.setup=s||void 0,this.stage=null,this.startTime=0,this.accumulator=0,this.actualFps=0,this.setup&&this.setup()}return t.fps=60,t.frameDuration=1e3/t.fps,t.mousePoint=void 0,t.prototype.setStage=function(t){return t instanceof Stage?(this.stage=t,this.stage.setContext(this.canvas.ctx),this.stage.init()):void console.log("ERROR: "+t+" is not an Stage")},t.prototype.setStageTransition=function(t){return this._transition=t},t.prototype.backgroundColor=function(t){return this.canvas.style.backgroundColor=t},t.prototype.border=function(t){return this.canvas.style.border=t},t.prototype.getMouseLocation=function(){return t.mousePoint},t.prototype.start=function(){return this.running=!0,this.startTime=Date.now(),this.gameStep(),window.onEachFrame(this.render)},t.prototype.update=function(t){if(null!=this._transition&&this._transition(),null!=this.stage)return this.stage.update(t)},t.prototype.render=function(){if(null!=this.running)return this.canvas.ctx.save(),this.canvas.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.canvas.ctx.restore(),null!=this.stage?this.stage.render():void 0},t.prototype.gameStep=function(){var i,e;if(null!=this.running){for(i=Date.now(),e=i-this.startTime,e>1e3&&(e=t.frameDuration),this.actualFps=1e3/e,this.startTime=i,this.accumulator+=e;this.accumulator>=t.frameDuration;)this.update(t.frameDuration),this.accumulator-=t.frameDuration;return setTimeout(this.gameStep,t.frameDuration)}},t}(),function(){var t;t=void 0,t=window.requestAnimationFrame?function(t){var i;(i=function(){t(),requestAnimationFrame(i)})()}:window.webkitRequestAnimationFrame?function(t){var i;(i=function(){t(),webkitRequestAnimationFrame(i)})()}:window.mozRequestAnimationFrame?function(t){var i;(i=function(){t(),mozRequestAnimationFrame(i)})()}:function(t){setInterval(t,Game.frameDuration)},window.onEachFrame=t}();