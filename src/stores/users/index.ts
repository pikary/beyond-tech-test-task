import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {User} from './types'
import baseRequest from "@/utils/baseApi";
import ApiError from "@/utils/ApiError";


export const usePeopleStore = defineStore('users',()=>{
    const users = ref<User[]>([])
    const isLoading = ref<boolean>(false)
    const error = ref<string|null>('')


    const userSearch = async (query?:string) =>{
        try{
            const url = query ? `users?email=${query}` : 'users';
            const result =await baseRequest<User[]>('GET',url)
            if(result?.statusCode === 200){
                users.value = result.data
            }
        }catch (e) {
            if(e instanceof ApiError){
                error.value = e.message
            }else{
                console.error('Something went wrong');
            }
        }
    }
    return {users,findUser,isLoading}
})



