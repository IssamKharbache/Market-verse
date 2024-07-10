"use server"
export const createAd = (formData:FormData) => {
    const {files,location,...data} = Object.fromEntries(formData)

    console.log("Server",{files,location,data});

    return true;

}