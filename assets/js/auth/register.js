/* =====================================================
   TERAVIA - Register
   File: assets/js/auth/register.js
===================================================== */

const Register={

async signUp(form){

try{

const fullName=form.fullName?.trim();
const email=form.email?.trim().toLowerCase();
const password=form.password;
const phone=form.phone?.trim()||"";
const persona=form.persona||null;

if(!fullName)throw new Error("Nama lengkap wajib diisi.");
if(!email)throw new Error("Email wajib diisi.");
if(!password)throw new Error("Password wajib diisi.");

const {data,error}=await supabaseClient.auth.signUp({

email,
password,

options:{
data:{
full_name:fullName
}
}

});

if(error)throw error;

if(data.user){

const {error:updateError}=await supabaseClient
.from("profiles")
.update({
phone_whatsapp:phone,
persona_type:persona
})
.eq("id",data.user.id);

if(updateError)throw updateError;

}

return{
success:true,
user:data.user,
session:data.session,
message:"Registrasi berhasil."
};

}catch(err){

return{
success:false,
message:err.message
};

}

}

};

window.Register=Register;
