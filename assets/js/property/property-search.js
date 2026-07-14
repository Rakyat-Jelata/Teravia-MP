/* =====================================================
   TERAVIA - Property Search
   File: assets/js/property/property-search.js
===================================================== */

const PropertySearch={

async find(filters={},limit=12,page=1){

try{

let query=supabaseClient
.from("properties")
.select("*",{count:"exact"})
.eq("status","approved");


if(filters.keyword){

query=query.or(
`title.ilike.%${filters.keyword}%,description.ilike.%${filters.keyword}%`
);

}


if(filters.category)
query=query.eq("category",filters.category);


if(filters.property_type)
query=query.eq("property_type",filters.property_type);


if(filters.listing_type)
query=query.eq("listing_type",filters.listing_type);


if(filters.province)
query=query.eq("province",filters.province);


if(filters.city)
query=query.eq("city",filters.city);


if(filters.min_price)
query=query.gte("price",filters.min_price);


if(filters.max_price)
query=query.lte("price",filters.max_price);


if(filters.bedrooms)
query=query.gte("bedrooms",filters.bedrooms);


if(filters.certificate)
query=query.eq("certificate",filters.certificate);


const from=(page-1)*limit;
const to=from+limit-1;


const {data,error,count}=await query
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


window.PropertySearch=PropertySearch;
