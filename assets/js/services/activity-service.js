/* =====================================================
   TERAVIA - Activity Service
   File: assets/js/services/activity-service.js
===================================================== */

const ActivityService={

async log(action,description="",metadata={}){

try{

const user=await AuthGuard.user();


const {data,error}=await supabaseClient
.from("activities")
.insert({

user_id:user?.id||null,

action,

description,

metadata

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


async mine(limit=50){

try{

const user=await AuthGuard.user();

if(!user)
throw new Error("Silakan login terlebih dahulu.");


const {data,error}=await supabaseClient
.from("activities")
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


async all(limit=100){

try{

const admin=await AuthGuard.admin();

if(!admin)
throw new Error("Akses admin diperlukan.");


const {data,error}=await supabaseClient
.from("activities")
.select(`
*,
profiles(
full_name
)
`)
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

}

};


window.ActivityService=ActivityService;
