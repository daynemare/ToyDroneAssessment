
 

class GridSystem{

    constructor(matrix,droneX,droneY){
        this.matrix = matrix;
        this.uiContext = this.#getContext(500 ,0,"#111");
        this.uiOutlineContext = this.#getContext(600,1030,"#444");
        this.topContext = this.#getContext(500,865,"#111",true);
        this.cellSize = 40;
        this.padding = 1;
        this.direction;

        this.drone = {x: droneX, y: droneY, color: "orange"}
        this.matrix[droneY][droneX]=2;

        
        document.getElementById("move").addEventListener("click", this.moveDrone); 
        document.getElementById("left").addEventListener("click", this.changeDirectionLeft); 
        document.getElementById("right").addEventListener("click", this.changeDirectionRight);
        document.getElementById("report").addEventListener("click", this.reportDroneLocation);
        //document.getElementById("place").addEventListener("click", this.placeDrone);

        this.uiContext.font = "20px Courier";
        this.uiContext.fillStyle = "white";
        this.uiContext.fillText = ("Toy Drone Simulator",20,30);
    }

    #isValidMove(x,y)
    {
        if(this.matrix[this.drone.y+y][this.drone.x + x] === 0){
            return true;
        }
        return false;
    }

    reportDroneLocation = ({}) =>{

        var x = this.drone.x  - 1;
       var y = 10 - this.drone.y;

        var node = document.createElement('li');
        node.appendChild(document.createTextNode( x + "," + y +  "," + document.getElementById('nsew').textContent));
        document.querySelector('ul').appendChild(node);
     }
    
    changeDirectionLeft()
    {   

        if(document.getElementById('nsew').textContent.localeCompare("North")===0){

 
                console.log("Equal");
                document.getElementById('nsew').innerHTML = 'West'; 
                this.direction = 'West';
 
        }
        else if(document.getElementById('nsew').textContent.localeCompare("West")===0)
        {
            console.log("Equal");
            document.getElementById('nsew').innerHTML = 'South'; 
            this.direction = 'South';
           

        }
        else if(document.getElementById('nsew').textContent.localeCompare("South")===0){

            console.log("Equal");
            document.getElementById('nsew').innerHTML = 'East'; 
            this.direction = 'East';

        }
        else
        {
            document.getElementById('nsew').innerHTML = 'North'; 
            this.direction = 'North';
        }

        console.log(this.direction);
      
        var node = document.createElement('li');
        node.appendChild(document.createTextNode("LEFT"));
        document.querySelector('ul').appendChild(node);

    }

    changeDirectionRight()
    {

        if(document.getElementById('nsew').textContent.localeCompare("North")===0){

 
                console.log("Equal");
                document.getElementById('nsew').innerHTML = 'East'; 
                this.direction = 'East';
 
        }
        else if(document.getElementById('nsew').textContent.localeCompare("East")===0)
        {
            console.log("Equal");
            document.getElementById('nsew').innerHTML = 'South'; 
            this.direction = 'South';
           

        }
        else if(document.getElementById('nsew').textContent.localeCompare("South")===0){

            console.log("Equal");
            document.getElementById('nsew').innerHTML = 'West'; 
            this.direction = 'West';

        }
        else
        {
            document.getElementById('nsew').innerHTML = 'North'; 
            this.direction = 'North';
        }

        console.log(this.direction);
        var node = document.createElement('li');
        node.appendChild(document.createTextNode("RIGHT"));
        document.querySelector('ul').appendChild(node);

    }
  
    #updateMatrix(x,y,val){
        this.matrix[x][y] = val;
    }


    moveDrone = ({}) => {

        var cmd = "MOVE";

        if(document.getElementById('nsew').textContent.localeCompare("East")===0)
        {
            if(this.#isValidMove(1,0)){
              this.#updateMatrix(this.drone.y,this.drone.x,0);
              this.#updateMatrix(this.drone.y,this.drone.x+1,2);
              this.drone.x ++;
              this.render();
              console.log("Moving the drone right");
             
            }
 
        }else if(document.getElementById('nsew').textContent.localeCompare("West")===0){

            if(this.#isValidMove(-1,0)){

                this.matrix[this.drone.y][this.drone.x] = 0;
                this.matrix[this.drone.y][this.drone.x-1] = 2;
                this.drone.x--;
                this.render();
                console.log("Moving the drone left");
              }

        }
        else if(document.getElementById('nsew').textContent.localeCompare("South")===0){

            
            if(this.#isValidMove(0,1)){

                this.matrix[this.drone.y][this.drone.x] = 0;
                this.matrix[this.drone.y + 1][this.drone.x] = 2;
                this.drone.y++;
                this.render();
                console.log("Moving the drone down");
              }
         

        }
        else{


              if(this.#isValidMove(0,-1)){

                this.matrix[this.drone.y][this.drone.x] = 0;
                this.matrix[this.drone.y - 1][this.drone.x] = 2;
                this.drone.y--;
                this.render();
                var node = document.createElement('li');
                node.appendChild(document.createTextNode("MOVE"));
                document.querySelector('ul').appendChild(node);
                console.log("Moving the drone up");
              }

        }

      
        
    }   

    #getCenter(w,h){
        return{
            x:window.innerWidth / 2 - w / 2 + "px",
            y:window.innerHeight/ 2 - h / 2 + "px"
        };
    }

    #getContext(w,h,color="111",isTransparent=false)
    {
        
        
       

        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d");
        this.width = this.canvas.width = w;
        this.height = this.canvas.height = h;
        this.canvas.style.position = "absolute";
        this.canvas.style.background = color;
        if(isTransparent){
        this.canvas.style.backgroundColor = "transparent";
        }
        const center = this.#getCenter(w,h);
        this.canvas.style.marginLeft = center.x;
        this.canvas.style.marginTop = center.y;
        document.body.appendChild(this.canvas);
    
        return this.context;
    
    }

    /*placeDrone = () =>
    {   
    var nX = Math.round((Math.random() * 10)+1);
    var nY = Math.round((Math.random() * 10)+1);
 

    this.#updateMatrix(this.drone.y,this.drone.x,0);
    this.#updateMatrix(nX,nY,2);
    //this.drone.x ++;
    this.render();
    } */  


    render(){

       

        //const w = (this.cellSize + this.padding) * this.matrix[0].length - (this.padding);
        //const h = (this.cellSize + this.padding) * this.matrix.length - (this.padding);

        //this.uiOutlineContext.canvas.width = w;
        //this.uiOutlineContext.canvas.height = h;

        //const center = this.#getCenter(w,h);

        //this.uiOutlineContext.canvas.style.marginLeft = center.x;
         this.uiOutlineContext.canvas.style.marginLeft = 0;
        //this.uiOutlineContext.canvas.style.marginTop = center.y;
          this.uiOutlineContext.canvas.style.marginTop = 0;

       // this.topContext.canvas.style.marginLeft = center.x;
         this.topContext.canvas.style.marginLeft = 0;
        //this.topContext.canvas.style.marginTop = center.y;
         this.topContext.canvas.style.marginTop = 0;
      
     

        for(let row = 0; row <this.matrix.length;row++){
            for(let col = 0; col <this.matrix[row].length;col++){
                
                const cellVal = this.matrix[row][col];
                let color = "#111";
        
                if(cellVal === 1){

                    color = "#4488FF";
                }
                else if(cellVal === 2)
                {   
                    color = this.drone.color;
                }   

                this.uiOutlineContext.fillStyle = color;
                this.uiOutlineContext.fillRect(col * (this.cellSize + this.padding),
                row * (this.cellSize + this.padding),
                this.cellSize,this.cellSize);

                
                
            }
        }

      
       
    }   
}


const gridMatrix = [
    [1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1]
];

        var nX = 1;
        var nY = 10;
        
        const gridSystem = new GridSystem(gridMatrix,nX,nY);
        gridSystem.render();
      
        


       