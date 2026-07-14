import { supabase } from "../supabase.js";

const TABLE = "properties";

export async function getProperties(options = {}) {
    let query = supabase.from(TABLE).select(`
        *,
        profiles:user_id (
            id,
            name,
            avatar
        )
    `);

    if(options.category){
        query = query.eq("category", options.category);
    }

    if(options.type){
        query = query.eq("property_type", options.type);
    }

    if(options.location){
        query = query.ilike("location", `%${options.location}%`);
    }

    if(options.status){
        query = query.eq("status", options.status);
    }

    query = query.order("created_at", { ascending:false });

    if(options.limit){
        query = query.limit(options.limit);
    }

    const { data, error } = await query;

    if(error){
        console.error("Get properties error:", error);
        throw error;
    }

    return data;
}


export async function getPropertyById(id){
    const { data, error } = await supabase
        .from(TABLE)
        .select(`
            *,
            profiles:user_id (
                id,
                name,
                avatar,
                phone
            )
        `)
        .eq("id", id)
        .single();

    if(error){
        console.error("Property detail error:", error);
        throw error;
    }

    return data;
}


export async function createProperty(propertyData){

    const { data:{ user } } = await supabase.auth.getUser();

    if(!user){
        throw new Error("User belum login");
    }

    const payload = {
        ...propertyData,
        user_id:user.id,
        status:"pending"
    };


    const { data, error } = await supabase
        .from(TABLE)
        .insert(payload)
        .select()
        .single();


    if(error){
        console.error("Create property error:", error);
        throw error;
    }

    return data;
}


export async function updateProperty(id, propertyData){

    const { data, error } = await supabase
        .from(TABLE)
        .update(propertyData)
        .eq("id", id)
        .select()
        .single();


    if(error){
        console.error("Update property error:", error);
        throw error;
    }

    return data;
}


export async function deleteProperty(id){

    const { error } = await supabase
        .from(TABLE)
        .delete()
        .eq("id", id);


    if(error){
        console.error("Delete property error:", error);
        throw error;
    }

    return true;
}


export async function getMyProperties(){

    const { data:{ user } } = await supabase.auth.getUser();

    if(!user){
        throw new Error("User belum login");
    }


    const { data, error } = await supabase
        .from(TABLE)
        .select("*")
        .eq("user_id", user.id)
        .order("created_at",{ascending:false});


    if(error){
        console.error("My properties error:", error);
        throw error;
    }


    return data;
}


export async function updatePropertyStatus(id,status){

    const { data,error } = await supabase
        .from(TABLE)
        .update({
            status
        })
        .eq("id",id)
        .select()
        .single();


    if(error){
        console.error("Status update error:",error);
        throw error;
    }


    return data;
}


export async function searchProperties(keyword){

    const { data,error } = await supabase
        .from(TABLE)
        .select("*")
        .or(`
            title.ilike.%${keyword}%,
            location.ilike.%${keyword}%,
            description.ilike.%${keyword}%
        `)
        .order("created_at",{ascending:false});


    if(error){
        console.error("Search property error:",error);
        throw error;
    }


    return data;
                                       }
