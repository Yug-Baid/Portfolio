
const cursor = document.querySelector(".cursor")
const root = document.querySelector("#root")


root.addEventListener("mousemove",(e)=>{
    cursor.style.left = e.x+2+"px"
    cursor.style.top = e.y+2+
    "px"
   
})
