/* =====================================================
   TERAVIA - Blog Image Upload
   File: assets/js/upload/blog-image-upload.js
===================================================== */

const BlogImageUpload={

async upload(file){

try{

const user=await AuthGuard.user();

if(!user)
throw new Error("Silakan login terlebih dahulu.");


const isAdmin=await AuthGuard.admin();

if(!isAdmin)
throw new Error("Akses admin diperlukan.");


if(!file)
throw new Error("File gambar tidak ditemukan.");


const ext=file.name.split(".").pop();

const fileName=`${user.id}/blog-${Date.now()}.${ext}`;


const {error:uploadError}=await supabaseClient
.storage
.from("blog-images")
.upload(fileName,file);


if(uploadError)throw uploadError;


const {data:urlData}=supabaseClient
.storage
.from("blog-images")
.getPublicUrl(fileName);


return{
success:true,
url:urlData.publicUrl,
path:fileName,
message:"Gambar blog berhasil diupload."
};


}catch(err){

return{
success:false,
message:err.message
};

}

}

};


window.BlogImageUpload=BlogImageUpload;
