

export async function accountExists(
    email: string,
){
    //DB query, find entry where email field === email
    //let account = db.findUnique( - where email ==  email)


    // return Boolean(account)
}

export async function createAccount(
    email: string,
    password: string,
){

    // db.createEntry({
    //     id: randomUUID
    //     email: email,
    //     password: hash(password)
    // })

}