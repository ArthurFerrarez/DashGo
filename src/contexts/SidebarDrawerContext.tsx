import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { createContext, ReactNode, useContext, useEffect } from "react";

interface SidebarDrawerProviderProps{
    children: ReactNode;
}

type SidebarDrawerContextData = UseDisclosureReturn

const SidebarDrawerContext = createContext({} as SidebarDrawerContextData);

export function SidebarDrawerProvider({ children }: SidebarDrawerProviderProps ){
    const disclosure = useDisclosure()

    //Para siderbar fechar quando trocar de tela 
    const router = useRouter()
    useEffect(() => { disclosure.onClose() }, [router.asPath])
    // Disparar uma função toda vez que o router.asPath mudar (caminho da rota) vou fechar a sidebar
    //

    return(
        <SidebarDrawerContext.Provider value={disclosure}>
            {children}
        </SidebarDrawerContext.Provider>
    );
}

export const useSidebarDrawer = () => useContext(SidebarDrawerContext)