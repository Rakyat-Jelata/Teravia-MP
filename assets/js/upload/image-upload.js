/* =====================================================
   TERAVIA - Image Upload
   File: assets/js/upload/image-upload.js
===================================================== */

const ImageUpload={

async property(files,propertyId){

try{

const user=await AuthGuard.user();

if(!user)throw new Error("Silakan login terlebih dahulu.");

if(!files||!files.length)
throw new Error("File gambar belum dipilih.");


const uploads=[];


for(const file of files){

const ext=file.name.split(".").pop();

const fileName=`${user.id}/${propertyId}/${Date.now()}.${ext}`;


const {error:uploadError}=await supabaseClient
.storage
.from("property-images")
.upload(fileName,file);


if(uploadError)throw uploadError;


const {data:urlData}=supabaseClient
.storage
.from("property-images")
.getPublicUrl(fileName);


const imageUrl=urlData.publicUrl;


const {data:image,error:imageError}=await supabaseClient
.from("property_images")
.insert({
property_id:propertyId,
image_url:imageUrl,
storage_path:fileName
})
.select()
.single();


if(imageError)throw imageError;


uploads.push(image);

}


return{
success:true,
data:uploads,
message:"Gambar berhasil diupload."
};


}catch(err){

return{
success:false,
message:err.message
};

}

}

};


window.ImageUpload=ImageUpload;
