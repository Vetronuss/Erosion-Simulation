var grid = []
var grid2 = [];
var div = 200;
var bias = 0.4
function setup()
{
  noiseSeed(1)
  squareCanvas();
  background(0);
  f();
  show();
  for (var i = 0; i < 20;i++){
    erode();
    
    
  }
  normMap();
  show2();
}

function normMap()
{
  var n = normNoise(grid2)
  var low = n[0];
  var high = n[1];
  for (var i = 0; i < grid2.length; i++)
  {
    for (var o = 0; o < grid2[i].length; o++)
    {
      grid2[i][o] = map(grid2[i][o],low,high,0,1)
    }
  }
}

function f(){
  grid = [];
  for (var i = 0; i < div; i++)
  {
    grid.push([])
    grid2.push([])
    for (var o = 0; o < div; o++)
    {
      
      //var val = noise(i/10,o/10) + noise((i+1)/10,(o)/10)+ noise((i-1)/10,(o)/10)+ noise((i)/10,(o+1)/10)+ noise((i)/10,(o-1)/10)
      //val+= noise((i+1)/10,(o+1)/10)+ noise((i+1)/10,(o-1)/10)+ noise((i-1)/10,(o-1)/10)+ noise((i-1)/10,(o+1)/10)
      
      //val/=9
      
      val = noise(i/10,o/10)
  
      grid[i].push(val)
      grid2[i].push(val)
    }
  }
  
  
}

function show()
{
  noStroke()
  for (var i = 0; i < div; i++)
  {
    
    for (var o = 0; o < div; o++)
    {
      var val = grid[i][o]*255;
      if (val<100)
      {
        fill(20,20,val); 
        stroke(20,20,val)
        //grid2[i][o]=0;
      }else if (val < 120)
      {
        fill(lerpColor(color('yellow'),color('brown'),val/255)); 
        stroke(lerpColor(color('yellow'),color('brown'),val/255))  
      }
      else if (val < 150)
      {
        fill('green')
        stroke('green')
      }
      else
      {
        fill(val)
        stroke(val)
      }
      
      square(i*(width/div),o*(height/div),width/div)
    }
  }
}

function show2()
{
  for (var i = 0; i < div; i++)
  {
    
    for (var o = 0; o < div; o++)
    {
      var val = grid2[i][o]*255;
      
        fill(val)
        stroke(val)
    
      
      square(i*(width/div),o*(height/div),width/div)
    }
  }
}

function erode()
{
  for (var i = 0; i < div; i++)
  {
    for (var o = 0; o < div; o++)
    {
      if (grid[i][o]!=0)
        drop(i,o,0);
      
    }
  }
}

function drop(x,y,dep)
{
  if (dep > 0.1)
  {
    //grid2[x][y]+=dep;
    //return;
  }
  
  var a = [
    createVector(x,y),
    createVector(x+1,y),
    createVector(x-1,y),
    createVector(x,y+1),
    createVector(x,y-1),
    createVector(x+1,y+1),
    createVector(x-1,y+1),
    createVector(x-1,y-1),
    createVector(x+1,y-1)
  ];
  var small = mini(grid2,a);
  if (small.x == x && small.y == y)
  {
    grid2[x][y]+=dep;
    return;
  }else
  {
    dep+=(grid2[x][y]-(grid2[x][y]+grid2[small.x][small.y])/2)*bias
    grid2[x][y]-=(grid2[x][y]-(grid2[x][y]+grid2[small.x][small.y])/2)*bias
    drop(small.x,small.y,dep)
  }
}


function mini(g,a)
{
  var smallest = g[a[0].x][a[0].y];
  var index = a[0];
  for (var i = 0; i < a.length; i++)
  {
    try{
    if (g[a[i].x][a[i].y]<smallest)
    {
      smallest = g[a[i].x][a[i].y];
      index = a[i]
    }
    }catch(ad){}
  }
  return index;
}

function draw()
{
  
  
  
}

