/* =====================================================
   TERAVIA - User Management Admin
   File: assets/js/admin/user-management.js
===================================================== */

const UserManagement={

async list(limit=50){

try{

const admin=await AuthGuard.admin();

if(!admin)
throw new Error("Akses admin diperlukan.");


const {data,error}=await supabaseClient
.from("profiles")
.select(`
id,
full_name,
phone_whatsapp,
persona_type,
membership_type,
membership_status,
verified_badge,
is_verified_admin,
updated_at
`)
.order("updated_at",{ascending:false})
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


async detail(userId){

try{

const {data,error}=await supabaseClient
.from("profiles")
.select("*")
.eq("id",userId)
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


async verify(userId,badge="verified"){

return await this.update(userId,{

verified_badge:badge,

is_verified_admin:true

});

},


async suspend(userId){

return await this.update(userId,{

membership_status:"suspended"

});

},


async activate(userId){

return await this.update(userId,{

membership_status:"active"

});

},


async update(userId,payload){

try{

const admin=await AuthGuard.admin();

if(!admin)
throw new Error("Akses admin diperlukan.");


const {data,error}=await supabaseClient
.from("profiles")
.update({

...payload,

updated_at:new Date().toISOString()

})
.eq("id",userId)
.select()
.single();


if(error)throw error;


return{

success:true,

data,

message:"Data user berhasil diperbarui."

};


}catch(err){

return{

success:false,

message:err.message

};

}

}

};


window.UserManagement=UserManagement;
