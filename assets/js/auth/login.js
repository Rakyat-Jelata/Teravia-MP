/* =====================================================
   TERAVIA - Login
   File: assets/js/auth/login.js
===================================================== */

const Login={

init(){
this.form=document.getElementById("loginForm");
if(!this.form)return;
this.bindEvents();
},

bindEvents(){
this.form.addEventListener("submit",this.submit.bind(this));
},

async submit(e){
e.preventDefault();

const email=document.getElementById("email").value.trim();
const password=document.getElementById("password").value;

if(!email||!password){
Toast.show("Email dan password wajib diisi.","error");
return;
}

try{

Loading.show();

const {data,error}=await supabaseClient.auth.signInWithPassword({
email,
password
});

if(error)throw error;

Toast.show("Login berhasil.","success");

setTimeout(()=>{
window.location.href="dashboard.html";
},800);

}catch(err){

Toast.show(err.message||"Login gagal.","error");

}finally{

Loading.hide();

}

}

};

document.addEventListener("DOMContentLoaded",()=>{
Login.init();
});
