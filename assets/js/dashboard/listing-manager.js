/* =====================================================
   TERAVIA - Dashboard Listing Manager
   File: assets/js/dashboard/listing-manager.js
===================================================== */

const ListingManager={

async list(limit=20,page=1){

try{

const result=await PropertyList.mine(limit,page);

if(!result.success)
throw new Error(result.message);


return{
success:true,
data:result.data,
count:result.count
};


}catch(err){

return{
success:false,
message:err.message
};

}

},


async remove(propertyId){

try{

const result=await PropertyDelete.remove(propertyId);


return result;


}catch(err){

return{
success:false,
message:err.message
};

}

},


async updateStatus(propertyId,status){

try{

const user=await AuthGuard.user();

if(!user)
throw new Error("Silakan login terlebih dahulu.");


const allowed=[
"approved",
"pending",
"sold",
"rented"
];


if(!allowed.includes(status))
throw new Error("Status tidak valid.");


const {data,error}=await supabaseClient
.from("properties")
.update({
status,
updated_at:new Date().toISOString()
})
.eq("id",propertyId)
.eq("user_id",user.id)
.select()
.single();


if(error)throw error;


return{
success:true,
data,
message:"Status listing diperbarui."
};


}catch(err){

return{
success:false,
message:err.message
};

}

},


async boost(propertyId){

return await PropertyBoost.boost(propertyId);

},


async refresh(){

return await this.list();

}

};


window.ListingManager=ListingManager;
