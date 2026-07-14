/* =====================================================
   TERAVIA - Storage Service
   File: assets/js/services/storage-service.js
===================================================== */

const StorageService={

async upload(bucket,path,file){

try{

if(!file)
throw new Error("File tidak ditemukan.");


const {data,error}=await supabaseClient
.storage
.from(bucket)
.upload(path,file,{
upsert:false
});


if(error)throw error;


return{

success:true,

data

};


}catch(err){

return{

success:false,

message:err.message

};

}

},


async replace(bucket,path,file){

try{

const {data,error}=await supabaseClient
.storage
.from(bucket)
.update(path,file,{
upsert:true
});


if(error)throw error;


return{

success:true,

data

};


}catch(err){

return{

success:false,

message:err.message

};

}

},


async remove(bucket,path){

try{

const {error}=await supabaseClient
.storage
.from(bucket)
.remove([
path
]);


if(error)throw error;


return{

success:true,

message:"File berhasil dihapus."

};


}catch(err){

return{

success:false,

message:err.message

};

}

},


url(bucket,path){

try{

const {data}=supabaseClient
.storage
.from(bucket)
.getPublicUrl(path);


return data.publicUrl;


}catch(err){

return null;

}

}

};


window.StorageService=StorageService;
