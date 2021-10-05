const baseURL = 'http://localhost:5000/api'
const { createApp } = Vue
const TaskApp = {
 props:{
  label: {
    type: String,
    required: false,
    default: "Upload Single File",
  },
 },
 data(){
  return{
   title: 'Sign-Up Form',
   heading: 'Log-In Form',
   app_name: 'To-Do List Manager',
   task: '',
   editedTask: null,
   uploadedImg: '',
   availableStatuses: ['to-do', 'in-progress', 'finished'],
   tasks: [
    {
     name: 'First to-do item.',
     status: 'finished'
    },
    {
     name: 'Second to-do item.',
     status: 'in-progress'
    },
    {
     name: 'Third to-do item.',
     status: 'to-do'
    }
   ],
   signup: [
    {
     title: 'Email',
     type: 'email',
     id: 'email',
     name: 'email'
    },
    {
     title: 'Password',
     type: 'password',
     id: 'password1',
     name: 'password1'
    },
    {
     title: 'Confirm Password',
     type: 'password',
     id: 'password2',
     name: 'password2'
    }
   ],
   login: [
    {
     title: 'Email',
     type: 'email',
     id: 'email',
     name: 'email'
    },
    {
     title: 'Password',
     type: 'password',
     id: 'password',
     name: 'password'
    }
   ]
  }
 },
 methods: {
  submitTask(){
   if(this.task.length === 0) return;

   if(this.editedTask === null){
     this.tasks.push({
       name: this.task,
       status: 'to-do'
     });
   } else{
     this.tasks[this.editedTask].name = this.task;
     this.editedTask = null;
   }
   this.task='';
 },
 deleteTask(index){
   this.tasks.splice(index,1);
 },
 editTask(index){
   this.task = this.tasks[index].name;
   this.editedTask = index;
 },
 changeStatus(index){
   let newIndex = this.availableStatuses.indexOf(this.tasks[index].status);
   if(++newIndex > 2) newIndex = 0;
   this.tasks[index].status = this.availableStatuses[newIndex];
 },
 firstcharUpper(str){
   return str.charAt(0).toUpperCase() + str.slice(1);
 },
 async handleChange(){
  let file = event.target.files[0];
  const API = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json'
    }    
  })
  let formData = new FormData();
  formData.append("file",file);
  let {data} = await API.post("images/single-upload", formData);
  console.log("API_UPLOAD_RESP", data);  
  this.uploadedImg = data.imagePath;
 }
 },
 delimiters: ['{','}']
}

createApp(TaskApp).mount('#app')
