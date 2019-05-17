class Cluster {
    constructor(k,color,circleRadius,variance){
        // k is number of dots in that cluster
        this.numPoints = k;
        this.color = color;
        this.variance = variance; //used to generate individual clusters
        this.circleRadius = circleRadius;
        this.center = new Point(canvasWidth * (0.15 + 0.7*Math.random()),canvasHeight * (0.15 + 0.7*Math.random()));
        this.drawCircle(this.center,color);
        this.allPoints = [this.center];
        for(var i=0;i<k-1;++i){
            this.generateNormal(this.center,this.variance);
        }
    }


    //for each color, use normal distribution to place neighboring
    // points of same color around the initial point.
    // In this case, I am going to use the Box muller transform to generate
    // the numbers
    generateNormal(center,variance){
        var first = Math.random();
        var second = Math.random();
        var Z0 = Math.sqrt(-2*Math.log(first))*Math.cos(2*Math.PI*second);
        var Z1 = Math.sqrt(-2*Math.log(first))*Math.sin(2*Math.PI*second);
        // Z0 and Z1 are independent random variables with a standard
        // normal distribution
        var newX = Math.sqrt(variance) * Z0 + center.x;
        var newY = Math.sqrt(variance) * Z1 + center.y;
        if(newX < 0 || newX > canvasWidth){
            newX = - Math.sqrt(variance) * Z0 + center.x;
        }
        if(newY < 0 || newY > canvasHeight){
            newY = - Math.sqrt(variance) * Z1 + center.y;
        }
        var newPoint = new Point(newX,newY);
        this.allPoints.push(newPoint);
        this.drawCircle(newPoint, this.color);
        //keep second random generated, only regen first
        first = second;
        second = Math.random();
    }
  
    drawCircle(point,color){
        ctx.beginPath();
        ctx.arc(point.x, point.y, this.circleRadius,0,2*Math.PI);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
    }
  
  }

  class Point {
      constructor(x,y){
          this.x = x;
          this.y = y;
      }

      squareDistance(x,y){
          return Math.pow(Math.abs(this.x - x),2) + Math.pow(Math.abs(this.y - y),2);
      }
  }