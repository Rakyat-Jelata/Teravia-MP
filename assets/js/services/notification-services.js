/* =====================================================
   TERAVIA - Notification Service
   File: assets/js/services/notification-service.js
===================================================== */

const NotificationService={

async create(userId,title,message,type="system"){

try{

const {data,error}=await supabaseClient
.from("notifications")
.insert({

user_id:userId,

title,

message,

type,

is_read:false

})
.select()
.single();


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


async list(limit=20){

try{

const user=await AuthGuard.user();

if(!user)
throw new Error("Silakan login terlebih dahulu.");


const {data,error}=await supabaseClient
.from("notifications")
.select("*")
.eq("user_id",user.id)
.order("created_at",{ascending:false})
.limit(limit);


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


async read(id){

try{

const user=await AuthGuard.user();

if(!user)
throw new Error("Silakan login terlebih dahulu.");


const {error}=await supabaseClient
.from("notifications")
.update({

is_read:true

})
.eq("id",id)
.eq("user_id",user.id);


if(error)throw error;


return{

success:true,

message:"Notifikasi dibaca."

};


}catch(err){

return{

success:false,

message:err.message

};

}

}

};


window.NotificationService=NotificationService;
