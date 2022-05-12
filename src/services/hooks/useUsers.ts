import { useQuery } from "react-query";
import { api } from "../api";


type User = {
    id: string;
    name: string;
    email: string;
    created_at: string;
}
type GetUserResponse = {
    totalCount: number;
    users: User[];
}



//Chamada para nossa API de useUsers
export async function getUsers(page: number): Promise<GetUserResponse> {
    const { data, headers } = await api.get('/users',{
        params: {
            page,
        }
    })

    const totalCount = Number(headers['x-total-count'])


    //Formatando o como os dados serão exibidos 02/03/2022
    const users = data.users.map(user => {
        return {
            id:user.id,
            name:user.name,
            email: user.email,
            created_at: new Date(user.created_at).toLocaleDateString('pt-BR',{
                day:'2-digit',
                month:'long',
                year:'numeric'
            } ),
        };
    });

    return {
        users,
        totalCount,
    };
}

//Local cache
export function useUsers(page: number, options) {
    return useQuery(['users', page],() => getUsers(page),{ 
        staleTime: 1000 * 60 * 10, // 10 minutos
        ...options,
    
}  )
}