import { supabase } from "../supabase.js";

const TABLE = "blogs";


export async function getBlogs(options={}){

    let query = supabase
        .from(TABLE)
        .select(`
            *,
            profiles:author_id(
                id,
                name,
                avatar
            )
        `);


    if(options.category){
        query = query.eq(
            "category",
            options.category
        );
    }


    if(options.status){
        query = query.eq(
            "status",
            options.status
        );
    }


    if(options.limit){
        query = query.limit(
            options.limit
        );
    }


    query = query.order(
        "created_at",
        {
            ascending:false
        }
    );


    const { data,error } = await query;


    if(error){
        console.error(
            "Get blogs error:",
            error
        );

        throw error;
    }


    return data;
}



export async function getBlogBySlug(slug){

    const { data,error } = await supabase
        .from(TABLE)
        .select(`
            *,
            profiles:author_id(
                id,
                name,
                avatar
            )
        `)
        .eq("slug",slug)
        .single();


    if(error){
        console.error(
            "Blog detail error:",
            error
        );

        throw error;
    }


    return data;
}



export async function createBlog(blogData){

    const { data:{ user } } =
    await supabase.auth.getUser();


    if(!user){
        throw new Error(
            "User belum login"
        );
    }


    const payload = {

        ...blogData,

        author_id:user.id,

        status:
        blogData.status || "draft",

        views:0

    };


    const { data,error } =
    await supabase
        .from(TABLE)
        .insert(payload)
        .select()
        .single();


    if(error){

        console.error(
            "Create blog error:",
            error
        );

        throw error;
    }


    return data;
}



export async function updateBlog(
    id,
    blogData
){


    const { data,error } =
    await supabase
        .from(TABLE)
        .update(blogData)
        .eq("id",id)
        .select()
        .single();


    if(error){

        console.error(
            "Update blog error:",
            error
        );

        throw error;
    }


    return data;
}



export async function deleteBlog(id){

    const { error } =
    await supabase
        .from(TABLE)
        .delete()
        .eq("id",id);


    if(error){

        console.error(
            "Delete blog error:",
            error
        );

        throw error;
    }


    return true;
}



export async function searchBlogs(keyword){

    const { data,error } =
    await supabase
        .from(TABLE)
        .select("*")
        .or(`
            title.ilike.%${keyword}%,
            content.ilike.%${keyword}%,
            category.ilike.%${keyword}%
        `)
        .order(
            "created_at",
            {
                ascending:false
            }
        );


    if(error){

        console.error(
            "Search blog error:",
            error
        );

        throw error;
    }


    return data;
}



export async function incrementViews(id){

    const blog =
    await getBlogBySlug(id);


    const { data,error } =
    await supabase
        .from(TABLE)
        .update({
            views:
            blog.views + 1
        })
        .eq("id",blog.id)
        .select()
        .single();



    if(error){

        console.error(
            "Views update error:",
            error
        );

        throw error;
    }


    return data;
}



export async function getBlogCategories(){

    const { data,error } =
    await supabase
        .from("blog_categories")
        .select("*")
        .order(
            "name",
            {
                ascending:true
            }
        );


    if(error){

        console.error(
            "Category error:",
            error
        );

        throw error;
    }


    return data;
}
