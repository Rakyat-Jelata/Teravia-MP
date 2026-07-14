/* =====================================================
   TERAVIA - Property List
   File: assets/js/property/property-list.js
===================================================== */

const PropertyList={

async all(limit=12,page=1){

try{

const from=(page-1)*limit;
const to=from+limit-1;

const {data,error,count}=await supabaseClient
.from("properties")
.select("*",{count:"exact"})
.eq("status","approved")
.order("created_at",{ascending:false})
.range(from,to);

if(error)throw error;

return{
success:true,
data,
count,
page,
limit
};

}catch(err){

return{
success:false,
message:err.message
};

}

},

async mine(limit=12,page=1){

try{

const user=await AuthGuard.user();

if(!user)throw new Error("Silakan login.");

const from=(page-1)*limit;
const to=from+limit-1;

const {data,error,count}=await supabaseClient
.from("properties")
.select("*",{count:"exact"})
.eq("user_id",user.id)
.order("created_at",{ascending:false})
.range(from,to);

if(error)throw error;

return{
success:true,
data,
count,
page,
limit
};

}catch(err){

return{
success:false,
message:err.message
};

}

},

async byCategory(category,limit=12,page=1){

try{

const from=(page-1)*limit;
const to=from+limit-1;

const {data,error,count}=await supabaseClient
.from("properties")
.select("*",{count:"exact"})
.eq("status","approved")
.eq("category",category)
.order("created_at",{ascending:false})
.range(from,to);

if(error)throw error;

return{
success:true,
data,
count,
page,
limit
};

}catch(err){

return{
success:false,
message:err.message
};

}

}

};

window.PropertyList=PropertyList;
