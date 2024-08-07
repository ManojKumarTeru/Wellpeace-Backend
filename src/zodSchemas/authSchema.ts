import {object as zodObject, string as zodString} from 'zod'

export const SignupSchema=zodObject({
    email:zodString({message:'Email should be string'}).email('Invalid email address'),
    password:zodString({message:'Password should be string'}).min(8,'Minimum password length should be 8.').regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/,'Password must include a capital letter and a number.'),
    token:zodString({message:'token should be string.'})
})

export const LoginSchema =zodObject({
    email:zodString({message:'Email should be string'}).email("Invalid email address."),
    password:zodString({message:'Password should be string'}),
    token:zodString({message:'token should be string.'})
})