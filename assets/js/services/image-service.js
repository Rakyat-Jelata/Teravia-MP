const supabase =
    window.supabaseClient;

const BUCKET = "property-images";


export async function uploadPropertyImage(file, propertyId){

    if(!file){
        throw new Error("File gambar kosong");
    }


    const fileExt = file.name.split(".").pop();
    const fileName = `${propertyId}/${Date.now()}.${fileExt}`;


    const { data, error } = await supabase.storage
        .from(BUCKET)
        .upload(fileName,file,{
            cacheControl:"3600",
            upsert:false
        });


    if(error){
        console.error("Upload image error:",error);
        throw error;
    }


    const { data:urlData } = supabase.storage
        .from(BUCKET)
        .getPublicUrl(data.path);


    return {
        path:data.path,
        url:urlData.publicUrl
    };
}



export async function uploadMultipleImages(files,propertyId){

    const uploaded = [];


    for(const file of files){

        const result = await uploadPropertyImage(
            file,
            propertyId
        );

        uploaded.push(result);
    }


    return uploaded;
}



export async function savePropertyImages(images,propertyId){

    const payload = images.map(image=>({
        property_id:propertyId,
        image_url:image.url,
        storage_path:image.path
    }));


    const { data,error } = await supabase
        .from("property_images")
        .insert(payload)
        .select();


    if(error){
        console.error("Save images error:",error);
        throw error;
    }


    return data;
}



export async function getPropertyImages(propertyId){

    const { data,error } = await supabase
        .from("property_images")
        .select("*")
        .eq("property_id",propertyId)
        .order("created_at",{ascending:true});


    if(error){
        console.error("Get images error:",error);
        throw error;
    }


    return data;
}



export async function deletePropertyImage(id,path){


    const { error:storageError } = await supabase.storage
        .from(BUCKET)
        .remove([path]);


    if(storageError){
        console.error("Delete storage error:",storageError);
        throw storageError;
    }



    const { error } = await supabase
        .from("property_images")
        .delete()
        .eq("id",id);



    if(error){
        console.error("Delete database image error:",error);
        throw error;
    }


    return true;
}



export async function deleteAllPropertyImages(propertyId){

    const images = await getPropertyImages(propertyId);


    if(!images.length){
        return true;
    }


    const paths = images.map(
        image=>image.storage_path
    );


    const { error:storageError } = await supabase.storage
        .from(BUCKET)
        .remove(paths);



    if(storageError){
        console.error("Delete all storage error:",storageError);
        throw storageError;
    }



    const { error } = await supabase
        .from("property_images")
        .delete()
        .eq("property_id",propertyId);



    if(error){
        console.error("Delete all image database error:",error);
        throw error;
    }


    return true;
}
