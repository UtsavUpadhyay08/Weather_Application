console.log('The app is running')

const weatherForm = document.querySelector('form')
const search= document.querySelector('input')
const messageone=document.querySelector('#message-1')
const messagetwo=document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    messageone.textContent='Loading......'
    messagetwo.textContent=''
    const address= search.value
    fetch('http://localhost:3000/weather?address='+address).then((response) => {
    response.json().then((data)=>{
        const obj=data
        if(obj.error){
            messageone.textContent=obj.error
            messagetwo.textContent=""
        }else{
            messageone.textContent=obj.text
            messagetwo.textContent=obj.precip
        }
    })
})
})