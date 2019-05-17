class Board {
    constructor(ctx){
      this.clusters = [];
      this.colors = ["red","blue","green","purple"];
      this.lightColors = ["LightPink","LightSkyBlue","LightGreen","MediumPurple"];
      this.numColors = 4;
      this.circleRadius = 5;
      this.boardCtx = ctx;
      this.boardData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
      this.variance = 1800;
      this.delta = 20;
      ctx.globalAlpha = 1;
      for(var i=0;i<this.numColors;++i){
        var newCluster = new Cluster(5,this.colors[i],this.circleRadius,this.variance)
        this.clusters.push(newCluster);
      }
    }
  
    drawPixels(){
      ctx.globalAlpha = 0.5;
      var maxSquareDist = Math.pow(canvasWidth,2) + Math.pow(canvasHeight,2);
      for(var x=0;x<canvasWidth;x += this.delta){
        for(var y=0;y<canvasHeight;y += this.delta){
          var midX = x + this.delta/2;
          var midY = y + this.delta/2;
          var minSquareDist = maxSquareDist;
          var minColor = "white";
          for(var clusterCount=0;clusterCount<this.numColors;++clusterCount){
            var cluster = this.clusters[clusterCount];
            for(var pointCount=0;pointCount<cluster.numPoints;++pointCount){
              var point = cluster.allPoints[pointCount];
              var temp = point.squareDistance(midX,midY);
              if(temp < minSquareDist){
                minSquareDist = temp;
                minColor = cluster.color;
              }
            }
          }
          ctx.fillStyle = this.lightColors[this.colors.indexOf(minColor)];
          ctx.fillRect(x,y,this.delta,this.delta);
        }
      }
    }
  
  }