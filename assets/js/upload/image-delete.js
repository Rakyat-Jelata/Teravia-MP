/* =====================================================
   TERAVIA - Image Delete
   File: assets/js/upload/image-delete.js
===================================================== */

const ImageDelete={

async property(imageId){

try{

const user=await AuthGuard.user();

if(!user)throw new Error("Silakan login terlebih dahulu.");


const {data:image,error:imageError}=await supabaseClient
.from("property_images")
.select(`
id,
storage_path,
properties(
user_id
)
`)
.eq("id",imageId)
.single();


if(imageError)throw imageError;


if(image.properties.user_id!==user.id)
throw new Error("Anda tidak memiliki akses menghapus gambar ini.");


const {error:storageError}=await supabaseClient
.storage
.from("property-images")
.remove([
image.storage_path
]);


if(storageError)throw storageError;


const {error:deleteError}=await supabaseClient
.from("property_images")
.delete()
.eq("id",imageId);


if(deleteError)throw deleteError;


return{
success:true,
message:"Gambar berhasil dihapus."
};


}catch(err){

return{
success:false,
message:err.message
};

}

}

};


window.ImageDelete=ImageDelete;
