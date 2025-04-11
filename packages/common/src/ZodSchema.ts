import {z} from 'zod';
export const SignUpSchema=z.object({
       email:z.string(),
       password:z.string(),
       name:z.string()
})

export const SignInSchema=z.object({
    email:z.string(),
    password:z.string()
})
export const CreateRoomScema=z.object({
    name:z.string()
})