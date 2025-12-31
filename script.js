
const cursor = document.querySelector(".cursor")
const root = document.querySelector("#root")


root.addEventListener("mousemove",(e)=>{
    cursor.style.left = e.x+20+"px"
    cursor.style.top = e.y+"px"
   
})
