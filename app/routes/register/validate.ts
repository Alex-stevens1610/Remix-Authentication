export function validate(email:string, password: string){
    let errors: {email?: string, password?: string} = {}
    if (!email){
        errors.email = "Email Required"
    } else if (!email.includes("@")){
        errors.email = "Please give valid email address"
    }

    if (!password){
        errors.password = "Password Required"
    } else if (password.length < 8){
        errors.password = "Password must be at least 8 characters"
    }

    return Object.keys(errors).length ? errors : null;
}