/* =====================================================
   TERAVIA - Admin Dashboard
   File: assets/js/admin/admin-dashboard.js
===================================================== */

const AdminDashboard={

async check(){

try{

const admin=await AuthGuard.admin();

if(!admin)
throw new Error("Akses admin diperlukan.");


return{
success:true
};


}catch(err){

return{
success:false,
message:err.message
};

}

},


async summary(){

try{

const access=await this.check();


if(!access.success)
throw new Error(access.message);


const [
users,
properties,
pending,
membership
]=await Promise.all([


supabaseClient
.from("profiles")
.select("id",{count:"exact"}),


supabaseClient
.from("properties")
.select("id",{count:"exact"}),


supabaseClient
.from("properties")
.select("id",{count:"exact"})
.eq("status","pending"),


supabaseClient
.from("profiles")
.select("id",{count:"exact"})
.eq("membership_status","active")

]);


return{

success:true,

data:{

users:users.count||0,

properties:properties.count||0,

pending:pending.count||0,

activeMembership:membership.count||0

}

};


}catch(err){

return{

success:false,

message:err.message

};

}

}

};


window.AdminDashboard=AdminDashboard;
