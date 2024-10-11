import { accountExists } from "./queries"

export async function validate(email:string, password: string){
    let errors: {email?: string, password?: string} = {}
    
    //Email Checks
    if (!email){
        errors.email = "Email Required"
    } else if (!email.includes("@")){
        errors.email = "Please give valid email address"
    }
    
    if (await accountExists(email)) {
        errors.email = "Email already in use"
    }

    //Password Checks
    if (!password){
        errors.password = "Password Required"
    } else if (password.length < 8){
        errors.password = "Password must be at least 8 characters"
    }


    return Object.keys(errors).length ? errors : null;
}