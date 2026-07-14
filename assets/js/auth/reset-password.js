/* =====================================================
   TERAVIA - Reset Password
   File: assets/js/auth/reset-password.js
===================================================== */

const ResetPassword={

async update(password,confirmPassword){

try{

password=(password||"").trim();
confirmPassword=(confirmPassword||"").trim();

if(!password)throw new Error("Password baru wajib diisi.");
if(password.length<8)throw new Error("Password minimal 8 karakter.");
if(password!==confirmPassword)throw new Error("Konfirmasi password tidak sama.");

const {data:{session}}=await supabaseClient.auth.getSession();

if(!session)throw new Error("Session reset password tidak ditemukan.");

const {error}=await supabaseClient.auth.updateUser({
password
});

if(error)throw error;

return{
success:true,
message:"Password berhasil diperbarui."
};

}catch(err){

return{
success:false,
message:err.message
};

}

}

};

window.ResetPassword=ResetPassword;
