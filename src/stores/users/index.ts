import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import baseRequest from "@/utils/baseApi";
import ApiError from "@/utils/ApiError";
import type {User} from "@/stores/users/types";


export const usePeopleStore = defineStore('users',()=>{
    const users = ref<User[]>([])
    const currentUser = ref<User|null>(null)
    const isLoading = ref<boolean>(false)
    const error = ref<string|null>('')



    const getUser = async(id:number) =>{
        try{
            const url = `users?id=${id}`
            const response = await baseRequest<User[]>('GET',url)
            if(response?.data){
                currentUser.value = response.data[0]
            }

        }catch (e) {
            if(e instanceof ApiError){
                error.value = e.message
            }else{
                console.error('Something went wrong');
            }
        }
    }


    const userSearch = async (query?:string) =>{
        try{
            if(!query){
                return
            }
            const url = query ? `users?email=${query}` : 'users';
            const result =await baseRequest<User[]>('GET',url)
            if(result?.statusCode === 200){
                console.log(result.data)
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
    return {
        users,
        isLoading,
        currentUser,
        getUser,
        userSearch
    }
})



