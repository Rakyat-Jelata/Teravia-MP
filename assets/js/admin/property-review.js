/* =====================================================
   TERAVIA - Property Review Admin
   File: assets/js/admin/property-review.js
===================================================== */

const PropertyReview={

async pending(limit=20){

try{

const admin=await AuthGuard.admin();

if(!admin)
throw new Error("Akses admin diperlukan.");


const {data,error}=await supabaseClient
.from("properties")
.select(`
*,
profiles(
full_name,
phone_whatsapp
)
`)
.eq("status","pending")
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


async approve(propertyId){

return await this.updateStatus(
propertyId,
"approved"
);

},


async reject(propertyId,note=""){

return await this.updateStatus(
propertyId,
"rejected",
note
);

},


async updateStatus(propertyId,status,note=""){

try{

const admin=await AuthGuard.admin();

if(!admin)
throw new Error("Akses admin diperlukan.");


const allowed=[
"approved",
"rejected"
];


if(!allowed.includes(status))
throw new Error("Status tidak valid.");


const {data,error}=await supabaseClient
.from("properties")
.update({

status,

admin_note:note,

reviewed_at:new Date().toISOString(),

reviewed_by:admin.id

})
.eq("id",propertyId)
.select()
.single();


if(error)throw error;


return{

success:true,

data,

message:
status==="approved"
?"Listing disetujui."
:"Listing ditolak."

};


}catch(err){

return{

success:false,

message:err.message

};

}

}

};


window.PropertyReview=PropertyReview;
