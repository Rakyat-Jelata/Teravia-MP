import { supabase } from "../supabase.js";

const TABLE = "memberships";


export async function getMyMembership(){

    const { data:{ user } } = await supabase.auth.getUser();

    if(!user){
        throw new Error("User belum login");
    }


    const { data,error } = await supabase
        .from(TABLE)
        .select("*")
        .eq("user_id",user.id)
        .eq("status","active")
        .single();


    if(error && error.code !== "PGRST116"){
        console.error("Get membership error:",error);
        throw error;
    }


    return data || null;
}



export async function checkMembership(){

    const membership = await getMyMembership();

    if(!membership){
        return false;
    }


    const expired = new Date(membership.expired_at);
    const now = new Date();


    return expired > now;
}



export async function createMembership(paymentData){

    const { data:{ user } } = await supabase.auth.getUser();


    if(!user){
        throw new Error("User belum login");
    }


    const startDate = new Date();

    const expiredDate = new Date();
    expiredDate.setFullYear(
        expiredDate.getFullYear()+1
    );


    const payload = {
        user_id:user.id,
        plan:"premium",
        price:150000,
        listing_limit:10,
        listing_used:0,
        boost_total:10,
        boost_used:0,
        auto_boost_daily:true,
        status:"active",
        start_at:startDate,
        expired_at:expiredDate,
        payment_id:paymentData?.id || null
    };


    const { data,error } = await supabase
        .from(TABLE)
        .insert(payload)
        .select()
        .single();


    if(error){
        console.error("Create membership error:",error);
        throw error;
    }


    return data;
}



export async function canCreateListing(){

    const membership = await getMyMembership();


    if(!membership){
        return {
            allowed:false,
            message:"Upgrade akun kamu sekarang untuk mulai posting listing property."
        };
    }


    if(membership.listing_used >= membership.listing_limit){

        return {
            allowed:false,
            message:"Kuota listing kamu sudah habis. Upgrade membership untuk tambah listing."
        };
    }


    return {
        allowed:true,
        remaining:
        membership.listing_limit - membership.listing_used
    };
}



export async function useListingQuota(){

    const membership = await getMyMembership();


    if(!membership){
        throw new Error("Membership tidak ditemukan");
    }


    const { data,error } = await supabase
        .from(TABLE)
        .update({
            listing_used:
            membership.listing_used + 1
        })
        .eq("id",membership.id)
        .select()
        .single();


    if(error){
        console.error("Update quota error:",error);
        throw error;
    }


    return data;
}



export async function useBoost(){

    const membership = await getMyMembership();


    if(!membership){
        throw new Error("Membership tidak aktif");
    }


    if(membership.boost_used >= membership.boost_total){
        return false;
    }


    const { data,error } = await supabase
        .from(TABLE)
        .update({
            boost_used:
            membership.boost_used + 1
        })
        .eq("id",membership.id)
        .select()
        .single();


    if(error){
        console.error("Boost error:",error);
        throw error;
    }


    return data;
}



export const membershipPromo = {
    title:"Upgrade Sekarang & Maksimalkan Listing Kamu!",
    description:
    "Upgrade akun kamu supaya bisa posting listingan kamu di TERAVIA. Nikmati akses Premium dengan 10 slot listing, bonus 10x auto sundul, dan bantu property kamu tampil lebih sering dengan fitur auto sundul harian.",
    price:"Rp150.000",
    benefits:[
        "Posting hingga 10 listing property",
        "Bonus 10x auto sundul",
        "Auto sundul 1x setiap hari",
        "Listing tampil lebih optimal"
    ]
};
