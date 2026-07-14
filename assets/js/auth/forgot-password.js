/* =====================================================
   TERAVIA - Forgot Password
   File: assets/js/auth/forgot-password.js
===================================================== */

const ForgotPassword={

async send(email){

try{

email=(email||"").trim().toLowerCase();

if(!email)throw new Error("Email wajib diisi.");

const {error}=await supabaseClient.auth.resetPasswordForEmail(email,{
redirectTo:`${window.location.origin}/reset-password.html`
});

if(error)throw error;

return{
success:true,
message:"Link reset password berhasil dikirim."
};

}catch(err){

return{
success:false,
message:err.message
};

}

}

};

window.ForgotPassword=ForgotPassword;
