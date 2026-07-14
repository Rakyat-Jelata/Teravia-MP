/* =====================================================
   TERAVIA - Image Compress
   File: assets/js/upload/image-compress.js
===================================================== */

const ImageCompress={

async compress(file,maxWidth=1600,quality=0.8){

try{

if(!file)
throw new Error("File gambar tidak ditemukan.");

if(!file.type.startsWith("image/"))
throw new Error("File harus berupa gambar.");


return new Promise((resolve,reject)=>{

const img=new Image();

const reader=new FileReader();


reader.onload=(e)=>{

img.src=e.target.result;

};


img.onload=()=>{

let width=img.width;
let height=img.height;


if(width>maxWidth){

height=Math.round(height*(maxWidth/width));
width=maxWidth;

}


const canvas=document.createElement("canvas");

canvas.width=width;
canvas.height=height;


const ctx=canvas.getContext("2d");

ctx.drawImage(
img,
0,
0,
width,
height
);


canvas.toBlob((blob)=>{

if(!blob){

reject(new Error("Gagal compress gambar."));
return;

}


const compressed=new File(
[blob],
file.name,
{
type:"image/jpeg",
lastModified:Date.now()
}
);


resolve(compressed);


},"image/jpeg",quality);


};


img.onerror=()=>{

reject(new Error("Gagal membaca gambar."));

};


reader.onerror=()=>{

reject(new Error("Gagal membaca file."));

};


reader.readAsDataURL(file);


});


}catch(err){

return Promise.reject(err);

}

}

};


window.ImageCompress=ImageCompress;
