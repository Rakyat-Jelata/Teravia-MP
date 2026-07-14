/* =====================================================
   TERAVIA - Blog Page Controller
   File: assets/js/pages/blog.js
===================================================== */

const BlogPage={

async list(limit=10,page=1){

try{

const from=(page-1)*limit;
const to=from+limit-1;


const {data,error,count}=await supabaseClient
.from("blogs")
.select(`
*,
blog_categories(
id,
name
)
`,{count:"exact"})
.eq("status","published")
.order("created_at",{ascending:false})
.range(from,to);


if(error)throw error;


return{

success:true,

data,

count

};


}catch(err){

return{

success:false,

message:err.message

};

}

},


async detail(id){

try{

if(!id)
throw new Error("ID artikel tidak ditemukan.");


const {data,error}=await supabaseClient
.from("blogs")
.select(`
*,
blog_categories(
id,
name
)
`)
.eq("id",id)
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


async category(categoryId){

try{

const {data,error}=await supabaseClient
.from("blogs")
.select("*")
.eq("category_id",categoryId)
.eq("status","published")
.order("created_at",{ascending:false});


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


window.BlogPage=BlogPage;
