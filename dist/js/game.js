var Bullet,Effects,GameOverStage,Images,LeftPlayer,Mode,Monster,MonsterSpawner,Player,RANDOM_TILES,RightPlayer,Score,SplitStage,SplitTileMap,StartStage,StoryStage,i,j,extend=function(t,e){function i(){this.constructor=t}for(var s in e)hasProp.call(e,s)&&(t[s]=e[s]);return i.prototype=e.prototype,t.prototype=new i,t.__super__=e.prototype,t},hasProp={}.hasOwnProperty,bind=function(t,e){return function(){return t.apply(e,arguments)}};for(Score={highScore:0,lastScore:0,setScore:function(t){if(Score.lastScore=t,t>Score.highScore)return Score.highScore=t}},Effects={anaglyph:function(t,e,i,s,r,o){return null==o&&(o=3),i.save(),i.textBaseline="middle",i.textAlign="center",i.translate(s,r),i.globalAlpha=.8,i.font=e,i.fillStyle="red",i.fillText(t,-o,0),i.fillStyle="cyan",i.fillText(t,o,0),i.globalAlpha=1,i.fillStyle="black",i.fillText(t,0,0),i.restore()},generateNoise:function(t,e,i){var s,r,o;for(o=t.createImageData(e,i),r=0;r<o.data.length;)s=120*Math.random()|0,o.data[r++]=0,o.data[r++]=0,o.data[r++]=0,o.data[r++]=s;return o}},Images={BULLET:"bullet",BULLET_DATA:"images/bullet.png",TILES:"tiles",TILES_DATA:"images/tiles_small.png",SPRITEMAP:"spritemap",SPRITEMAP_DATA:"images/spritemap.png",PORTAL:"portal",PORTAL_DATA:"images/portal.png"},Loader.loadImage(Images.BULLET,Images.BULLET_DATA),Loader.loadImage(Images.TILES,Images.TILES_DATA),Loader.loadImage(Images.SPRITEMAP,Images.SPRITEMAP_DATA),Loader.loadImage(Images.PORTAL,Images.PORTAL_DATA),SplitTileMap=function(t){function e(t,i,s,r,o){e.__super__.constructor.call(this,2*t,2*i,s/2,r,o)}return extend(e,t),e.prototype._render=function(){var t,e,i,s,r,o,n,h,a,l,c;for(e=Loader.getImage(Images.TILES),o=[],t=i=0,r=this.cols;0<=r?i<=r:i>=r;t=0<=r?++i:--i)o.push(function(){var i,r,o;for(o=[],s=i=0,r=this.rows;0<=r?i<=r:i>=r;s=0<=r?++i:--i)n=this.getTile(t,s),h=t*this.tileSize,l=s*this.tileSize,a=0,c=0,0===n?(a=0,c=0):(n=1)?(a=1,c=0):(n=2)?(a=0,c=1):(n=3)&&(a=1,c=1),this.ctx.save(),this.ctx.drawImage(e,a*this.tileSize,c*this.tileSize,this.tileSize,this.tileSize,h,l,this.tileSize,this.tileSize),o.push(this.ctx.restore());return o}.call(this));return o},e}(TileMap),RANDOM_TILES=[],i=j=0;j<=179;i=++j)RANDOM_TILES.push(Math.round(3*Math.random()));SplitStage=function(t){function e(t,i,s){this.testBulletCollisions=bind(this.testBulletCollisions,this),this._update=bind(this._update,this),this._init=bind(this._init,this),e.__super__.constructor.call(this,t,i-e.gutterHeight,s)}return extend(e,t),e.tileWidth=32,e.wallWidth=e.tileWidth+8,e.gutterHeight=e.tileWidth+8,e.prototype._init=function(){var t,i;return t=this.width/e.tileWidth,i=this.height/e.tileWidth,this.tilemap=new SplitTileMap(t,i,e.tileWidth,RANDOM_TILES,this.ctx),this.wall=new Box(new Vector(this.width/2-e.wallWidth/2,0),e.wallWidth,this.height),this.portal=Loader.getImage(Images.PORTAL),this.lives=4,this.leftPlayer=new LeftPlayer(30,this.height/2),this.addActor(this.leftPlayer),this.rightPlayer=new RightPlayer(610,this.height/2),this.addActor(this.rightPlayer),this.monsterSpawner=new MonsterSpawner(this.width/2,this.height/2),this.addActor(this.monsterSpawner)},e.prototype._render=function(){return this.tilemap.render(),this.drawColorOverlay(),this.drawWall(),this.drawGutter(),this.drawCrosses()},e.prototype._update=function(t){var e,i,s,r,o;if(this.lives<=0)return this.state=STATE.finished,void Score.setScore(this.leftPlayer.score+this.rightPlayer.score);for(this.testBulletCollisions(),r=[],o=this.actors,i=0,s=o.length;i<s;i++)e=o[i],e.shouldDestroy()||r.push(e);return this.actors=r},e.prototype.drawColorOverlay=function(){var t;return t=this.getContext(),t.save(),t.globalAlpha=.1,t.fillStyle="cyan",t.fillRect(0,0,this.width/2,this.height),t.fillStyle="red",t.fillRect(this.width/2,0,this.width/2,this.height),t.restore()},e.prototype.drawWall=function(){var t,s,r,o,n,h,a;for(t=this.getContext(),t.save(),h=e.tileWidth,a=this.width/2-h/2,n=this.height/h-1,t.drawImage(this.portal,0,0,h,h,a,0,h,h),t.drawImage(this.portal,0,2*h,h,h,a,n*h,h,h),o=n-1,i=s=1,r=o;1<=r?s<=r:s>=r;i=1<=r?++s:--s)t.drawImage(this.portal,0,h,h,h,a,h*i,h,h);return t.restore()},e.prototype.drawCrosses=function(){var t,i,s;if(i=this.width/2,s=this.height+8,t=e.tileWidth,this.lives>=4&&this.drawCross(i-2*t,s),this.lives>=3&&this.drawCross(i+t,s),this.lives>=2&&this.drawCross(i,s),this.lives>=1)return this.drawCross(i-t,s)},e.prototype.drawCross=function(t,i){var s,r,o,n,h;return r=this.getContext(),h=e.tileWidth-6,s=8,o=t+h/2,n=i+h/2,r.fillStyle="red",r.fillRect(o-s/2,i,s,h),r.fillRect(t,n-s/2,h,s)},e.prototype.drawGutter=function(){var t,i,s;return t=this.getContext(),t.fillStyle="#000000",t.fillRect(0,this.height,this.width,this.height+e.gutterHeight),i=11,s=27,t.fillStyle="White",t.font="normal 12pt Arial",t.fillText("Anomalies resolved: "+this.leftPlayer.score,i,this.height+s),t.save(),t.scale(-1,1),t.fillStyle="White",t.font="normal 12pt Arial",t.fillText("Anomalies resolved: "+this.rightPlayer.score,-this.width+i,this.height+s),t.restore()},e.prototype.testBulletCollisions=function(){var t,e,i,s,r,o,n,h,a,l,c,d,u,p;for(e=this.actors.filter(this.isInstanceOfBullet),o=0,h=e.length;o<h;o++)t=e[o],i=MathHelpers.doesCircleRectIntersect(t.body,this.wall),i&&(t.destroy=!0);for(u=this.actors.filter(this.isInstanceOfMonster),p=[],n=0,a=u.length;n<a;n++){for(d=u[n],c=0,l=e.length;c<l;c++)t=e[c],MathHelpers.doesCircleCircleIntersect(t.body,d.body)&&(t.firedBy instanceof Player&&t.firedBy.addScore(1),t.destroy=!0,d.destroy=!0);s=MathHelpers.doesCircleCircleIntersect(this.leftPlayer.body,d.body),r=MathHelpers.doesCircleCircleIntersect(this.rightPlayer.body,d.body),(s||r)&&(this.lives--,d.destroy=!0),this.isCircleInBounds(d.body)?p.push(void 0):(this.lives--,p.push(d.destroy=!0))}return p},e.prototype.isInstanceOfBullet=function(t){return t instanceof Bullet},e.prototype.isInstanceOfMonster=function(t){return t instanceof Monster},e}(Stage),StoryStage=function(t){function e(t,i,s){this._update=bind(this._update,this),this._init=bind(this._init,this),e.__super__.constructor.call(this,t,i,s),this.showFooterTimer=new Timer(1e3),this.opacity=0}return extend(e,t),e.prototype._init=function(){return this.text="They successfully opened a portal to a parallel dimension.",this.text1="What they didn't anticipate were the anomalies...",this.text2="There was a glitch, and now we can't close it. We're both doomed.",this.footer="Destroy as many intruders as you can before we're overwhelmed",this.enterText="Press Enter to Fight"},e.prototype._update=function(t){if(this.showFooterTimer.tick(t),this.showFooterTimer.hasEnded())return this.opacity>=1?this.opacity=1:this.opacity+=.1},e.prototype._render=function(){return this.ctx.save(),this.ctx.fillStyle="black",this.ctx.fillRect(0,0,this.width,this.height),this.ctx.textBaseline="middle",this.ctx.textAlign="center",this.ctx.fillStyle="white",this.ctx.font="18px Georgia",this.ctx.fillText(this.text,this.width/2,60),this.ctx.fillText(this.text1,this.width/2,120),this.ctx.fillText(this.text2,this.width/2,180),this.showFooterTimer.hasEnded()&&(this.ctx.globalAlpha=this.opacity,this.ctx.fillText(this.footer,this.width/2,250),this.ctx.fillStyle="red",this.ctx.fillText(this.enterText,this.width/2,300),this.controller.isPressed(Keys.ENTER)&&(this.state=STATE.finished)),this.ctx.restore()},e.prototype.drawText=function(t,e,i){return this.ctx.fillText(t,e,i)},e}(Stage),StartStage=function(t){function e(t,i,s){this._update=bind(this._update,this),this._init=bind(this._init,this),e.__super__.constructor.call(this,t,i,s)}return extend(e,t),e.prototype._init=function(){return this.title="Double Vision",this.entryText="Hit ENTER to begin"},e.prototype._update=function(t){if(this.controller.isPressed(Keys.ENTER))return this.state=STATE.finished},e.prototype._render=function(){var t,e,i,s,r;return this.ctx.save(),s=32,t=2*this.height/3,e=this.width/4,r=this.width/2,i=3*this.width/4,this.ctx.textBaseline="middle",this.ctx.textAlign="center",this.ctx.font="24px Georgia",this.ctx.fillStyle="black",this.ctx.fillRect(0,this.height/2,this.width,this.height/2),this.ctx.fillStyle="red",this.drawText("Red Guard",e,t),this.ctx.fillStyle="white",this.drawText("W",e,t+s),this.drawText("S",e,t+2*s),this.drawText("D",e,t+3*s),this.drawText("CONTROLS",r,t-s),this.drawText("- Move Up -",r,t+s),this.drawText("- Move Down - ",r,t+2*s),this.drawText("- Fire -",r,t+3*s),this.ctx.fillStyle="cyan",this.drawText("Blue Guard",i,t),this.ctx.fillStyle="white",this.drawText("UP",i,t+s),this.drawText("DOWN",i,t+2*s),this.drawText("LEFT",i,t+3*s),Effects.anaglyph(this.title,"72px Georgia",this.ctx,this.width/2,this.height/5,5),Effects.anaglyph(this.entryText,"36px Georgia",this.ctx,this.width/2,2*this.height/5,3),this.ctx.restore()},e.prototype.drawText=function(t,e,i){return this.ctx.fillText(t,e,i)},e}(Stage),GameOverStage=function(t){function e(t,i,s){this._update=bind(this._update,this),this._init=bind(this._init,this),e.__super__.constructor.call(this,t,i,s)}return extend(e,t),e.prototype._init=function(){return this.gameOverText="GAME OVER",this.retryText="Hit ENTER play again",this.background=this.getNoise()},e.prototype._update=function(t){if(this.controller.isPressed(Keys.ENTER))return this.state=STATE.finished},e.prototype._render=function(){var t,e;return this.ctx.save(),this.background=this.getNoise(),this.ctx.putImageData(this.background,0,0),e="High Score: "+Score.highScore,t="Last Score: "+Score.lastScore,Effects.anaglyph(this.gameOverText,"54px Georgia",this.ctx,this.width/2,this.height/5,5),Effects.anaglyph(e,"32px Georgia",this.ctx,this.width/2,2*this.height/5,5),Effects.anaglyph(t,"32px Georgia",this.ctx,this.width/2,3*this.height/5,5),Effects.anaglyph(this.retryText,"32px Georgia",this.ctx,this.width/2,4*this.height/5,3),this.ctx.restore()},e.prototype.getNoise=function(){return Effects.generateNoise(this.ctx,this.width,this.height)},e}(Stage),Monster=function(t){function e(t,i,s,r){null==s&&(s=0),this.left=r,this._update=bind(this._update,this),e.__super__.constructor.call(this,t,i,s,16),this.speed=Math.round(2*Math.random())+2.5,this.image=Loader.getImage(Images.SPRITEMAP),this.sprite=new Sprite(this.image,32),this.opacity=0}return extend(e,t),e.CREEP_LEFT_CYCLE=[{col:0,row:2},{col:1,row:2},{col:2,row:2},{col:3,row:2},{col:2,row:2},{col:1,row:2}],e.CREEP_RIGHT_CYCLE=[{col:0,row:3},{col:1,row:3},{col:2,row:3},{col:3,row:3},{col:2,row:3},{col:1,row:3}],e.prototype._init=function(){return this.left?this.sprite.setCycle(e.CREEP_LEFT_CYCLE,400):this.sprite.setCycle(e.CREEP_RIGHT_CYCLE,400),this.opacity=0},e.prototype._render=function(){var t;return t=this.stage.getContext(),t.save(),this.sprite.draw(this.position.x-this.radius,this.position.y-this.radius,t,this.opacity),t.restore()},e.prototype._update=function(t){var e,i,s;return this.opacity>1?this.opacity=1:this.opacity+=t/1e3,this.sprite.updateFrame(t),s=t/100,e=this.speed*s,i=new Vector(e,0),i.rotate(this.direction),this.position.add(i),this.updateBody()},e}(CircleActor),Mode={MIRROR:0,FLIPPED:1,VARIANCE:2},MonsterSpawner=function(t){function e(t,i){this.updateMode=bind(this.updateMode,this),this._update=bind(this._update,this),this._init=bind(this._init,this),e.__super__.constructor.call(this,t,i),this.mode=Mode.MIRROR,this.spawnTime=3e3,this.spawnTimer=new Timer(this.spawnTime),this.modeTimer=new Timer(6e3),this.animate=new Timer(100)}return extend(e,t),e.prototype._init=function(){return this.mode=Mode.MIRROR,this.spawnTime=3e3,this.spawnTimer=new Timer(this.spawnTime),this.modeTimer=new Timer(6e3),this.animate=new Timer(100),this.animate.end()},e.prototype._render=function(){var t,e,i,s;if(!this.animate.hasEnded())return t=this.stage.getContext(),i=28,e=this.stage.height-16,s=Effects.generateNoise(t,i,e),t.putImageData(s,this.stage.width/2-i/2,8)},e.prototype._update=function(t){if(this.spawnTimer.tick(t),this.modeTimer.tick(t),this.animate.tick(t),this.spawnTimer.hasEnded()&&(this.spawnTimer.restart(),this.spawnMonsters()),this.modeTimer.hasEnded())return this.spawnTime<=500?this.spawnTime=500:this.spawnTime<=2e3?this.spawnTime-=100:this.spawnTime-=200,this.spawnTimer.timeout=this.spawnTime,this.modeTimer.restart(),this.animate.restart(),this.updateMode()},e.prototype.spawnMonsters=function(){var t,e,i,s;switch(e=20,t=this.stage.height-2*e,i=0,s=0,this.mode){case Mode.MIRROR:i=s=Math.floor(Math.random()*t)+e;break;case Mode.FLIPPED:i=Math.floor(Math.random()*t)+e,s=this.stage.height-i;break;case Mode.VARIANCE:i=Math.floor(Math.random()*t)+e,s=Math.floor(Math.random()*t)+e;break;default:i=s=Math.floor(Math.random()*t)+e}return this.stage.addActor(new Monster(this.stage.width/2,i,0,(!1))),this.stage.addActor(new Monster(this.stage.width/2,s,MathHelpers.toRadians(180),(!0)))},e.prototype.updateMode=function(){var t,e;return e=[Mode.MIRROR,Mode.FLIPPED,Mode.VARIANCE],e.splice(this.mode,1),t=Math.floor(Math.random()*e.length),this.mode=e[t]},e}(Actor),Player=function(t){function e(t,i){this.addScore=bind(this.addScore,this),e.__super__.constructor.call(this,t,i,0,16),this.controller=Controller.get(),this.velx=0,this.vely=0,this.maxSpeed=5,this.score=0}return extend(e,t),e.prototype.addScore=function(t){return this.score+=t},e.prototype._render=function(){return this.drawDebug()},e}(CircleActor),LeftPlayer=function(t){function e(t,i){this._update=bind(this._update,this),e.__super__.constructor.call(this,t,i),this.reloadTimer=new Timer(500),this.image=Loader.getImage(Images.SPRITEMAP),this.sprite=new Sprite(this.image,32),this.sprite.setCycle(e.STAND_CYCLE),this.isStopped=!1}return extend(e,t),e.STAND_CYCLE=[{col:0,row:1}],e.RUN_CYCLE=[{col:1,row:1},{col:2,row:1}],e.prototype._render=function(){return this.sprite.draw(this.position.x-this.radius,this.position.y-this.radius,this.stage.getContext())},e.prototype._update=function(t){var i,s,r,o,n;return this.sprite.updateFrame(t),this.reloadTimer.tick(t),o=this.position,n=t/100,s=100,i=1.5,this.controller.isPressed(Keys.D)||this.reloadTimer.end(),this.reloadTimer.hasEnded()&&this.controller.isPressed(Keys.D)&&(this.reloadTimer.restart(),this.stage.addActor(new Bullet(o.x+10,o.y,this.direction,this,(!1)))),this.controller.isPressed(Keys.W)?this.vely>-this.maxSpeed&&(this.vely-=i*n,this.vely<-this.maxSpeed&&(this.vely=-this.maxSpeed)):this.vely<0&&(this.vely+=s*n,this.vely>0&&(this.vely=0)),this.controller.isPressed(Keys.S)?this.vely<this.maxSpeed&&(this.vely+=i*n,this.vely>this.maxSpeed&&(this.vely=this.maxSpeed)):this.vely>0&&(this.vely-=s*n,this.vely<0&&(this.vely=0)),r=new Circle(new Vector(o.x,o.y+this.vely),this.radius),this.stage.isCircleInBounds(r)&&this.setPosition(o.x,o.y+this.vely),0!==this.velx||0!==this.vely||this.isStopped?(0!==this.velx||0!==this.vely&&this.isStopped)&&(this.isStopped=!1,this.sprite.setCycle(e.RUN_CYCLE,200)):(this.isStopped=!0,this.sprite.setCycle(e.STAND_CYCLE)),this.updateBody()},e}(Player),RightPlayer=function(t){function e(t,i){this._update=bind(this._update,this),e.__super__.constructor.call(this,t,i),this.direction=MathHelpers.toRadians(180),this.reloadTimer=new Timer(500),this.image=Loader.getImage(Images.SPRITEMAP),this.sprite=new Sprite(this.image,32),this.sprite.setCycle(e.STAND_CYCLE),this.isStopped=!1}return extend(e,t),e.STAND_CYCLE=[{col:0,row:0}],e.RUN_CYCLE=[{col:1,row:0},{col:2,row:0}],e.prototype._render=function(){return this.sprite.draw(this.position.x-this.radius,this.position.y-this.radius,this.stage.getContext())},e.prototype._update=function(t){var i,s,r,o,n;return this.sprite.updateFrame(t),this.reloadTimer.tick(t),o=this.position,n=t/100,s=20,i=1.5,this.controller.isPressed(Keys.LEFT)||this.reloadTimer.end(),this.reloadTimer.hasEnded()&&this.controller.isPressed(Keys.LEFT)&&(this.reloadTimer.restart(),this.stage.addActor(new Bullet(o.x-10,o.y,this.direction,this,(!0)))),this.controller.isPressed(Keys.UP)?this.vely>-this.maxSpeed&&(this.vely-=i*n,this.vely<-this.maxSpeed&&(this.vely=-this.maxSpeed)):this.vely<0&&(this.vely+=s*n,this.vely>0&&(this.vely=0)),this.controller.isPressed(Keys.DOWN)?this.vely<this.maxSpeed&&(this.vely+=i*n,this.vely>this.maxSpeed&&(this.vely=this.maxSpeed)):this.vely>0&&(this.vely-=s*n,this.vely<0&&(this.vely=0)),r=new Circle(new Vector(o.x,o.y+this.vely),this.radius),this.stage.isCircleInBounds(r)&&this.setPosition(o.x,o.y+this.vely),0!==this.velx||0!==this.vely||this.isStopped?(0!==this.velx||0!==this.vely&&this.isStopped)&&(this.isStopped=!1,this.sprite.setCycle(e.RUN_CYCLE,200)):(this.isStopped=!0,this.sprite.setCycle(e.STAND_CYCLE)),this.updateBody()},e}(Player),Bullet=function(t){function e(t,i,s,r,o){null==s&&(s=0),this.firedBy=r,this.left=null!=o&&o,e.__super__.constructor.call(this,t,i,s,4),this.bulletSpeed=120,this.opacity=0,this.image=Loader.getImage(Images.BULLET)}return extend(e,t),e.LEFT_CYCLE=[{col:1,row:0}],e.RIGHT_CYCLE=[{col:0,row:0}],e.prototype._init=function(){return this.opacity=0,this.image=Loader.getImage(Images.BULLET),this.sprite=new Sprite(this.image,8),this.left?this.sprite.setCycle(e.LEFT_CYCLE):this.sprite.setCycle(e.RIGHT_CYCLE)},e.prototype._render=function(){return this.sprite.draw(this.position.x-this.radius,this.position.y-this.radius,this.stage.getContext())},e.prototype._update=function(t){var e,i,s;return s=t/100,i=this.bulletSpeed*s,e=new Vector(i,0),e.rotate(this.direction),this.position.add(e),this.stage.isCircleInBounds(this.body)||(this.destroy=!0),this.updateBody()},e}(CircleActor);