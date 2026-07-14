/* =====================================================
   TERAVIA - Avatar Upload
   File: assets/js/upload/avatar-upload.js
===================================================== */

const AvatarUpload={

async upload(file){

try{

const user=await AuthGuard.user();

if(!user)
throw new Error("Silakan login terlebih dahulu.");


if(!file)
throw new Error("File avatar tidak ditemukan.");


const ext=file.name.split(".").pop();

const fileName=`${user.id}/avatar-${Date.now()}.${ext}`;


const {error:uploadError}=await supabaseClient
.storage
.from("profile-images")
.upload(fileName,file,{
upsert:true
});


if(uploadError)throw uploadError;


const {data:urlData}=supabaseClient
.storage
.from("profile-images")
.getPublicUrl(fileName);


const avatarUrl=urlData.publicUrl;


const {error:updateError}=await supabaseClient
.from("profiles")
.update({
avatar_url:avatarUrl
})
.eq("id",user.id);


if(updateError)throw updateError;


return{
success:true,
url:avatarUrl,
message:"Foto profil berhasil diperbarui."
};


}catch(err){

return{
success:false,
message:err.message
};

}

}

};


window.AvatarUpload=AvatarUpload;
