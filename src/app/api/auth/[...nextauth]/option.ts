import  GoogleProvider  from 'next-auth/providers/google';


if(!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET ){
    throw "google client id or secret is missing"
}
//

export const authOptions = {
    
    secret:process.env.SECRET,
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
          })
    ]
    
    }