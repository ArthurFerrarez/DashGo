import { Box, Button, Stack, Text } from "@chakra-ui/react";
import { PaginationItem } from "./PaginationItem";


interface PaginationProps {
    totalCountOfRegisters: number;
    registerPerPage?: number;
    currentPage?: number;
    onPageChange:(page: number) => void;
}

//Paginação 
const siblingsCount = 1;

function generatePagesArray(from: number, to: number) {
    return[...new Array(to - from)]
        .map((_, index) =>{
            return from + index + 1;
        })
        .filter(page => page > 0)
}

export function Pagination({
    totalCountOfRegisters,
    registerPerPage = 10, 
    currentPage = 1,
    onPageChange,
}: PaginationProps){
    const lastPage = Math.floor(totalCountOfRegisters / registerPerPage);// Arrendondar o valor pra cima 

    const previousPage = currentPage > 1
        ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
        : []

     const nextPage = currentPage < lastPage
        ? generatePagesArray(currentPage, Math.min(currentPage + siblingsCount, lastPage))
        : []

        //Prop drilling = Repassar uma prop de um componente pai pro filho, e pra outro filho etc

    return(
        <Stack
            direction={["column", "row"]}
            mt="8"
            justify="space-between"
            align="center"
            spacing="6"
        >
           
           <Box>
               <strong>0</strong> - <strong>10</strong> de <strong>100</strong>
           </Box>
           <Stack direction="row" spacing="2">


               {/*Paginaçao--------------------------------------*/}

               {currentPage > (1 + siblingsCount) && (
                   <>
                        <PaginationItem onPageChange={onPageChange} number={1}/>
                        {currentPage > (2 + siblingsCount) && (
                        <Text color="gray.300" wd="8" textAlign="center">...</Text>)}
                   </>
               )}

               {previousPage.length > 0 && previousPage.map(page => {
                   return <PaginationItem onPageChange={onPageChange} key={page} number={page}/>// Paginas anteriores
               })}

               <PaginationItem onPageChange={onPageChange} number={currentPage} isCurrent /*Pagina atual*//>

               {nextPage.length > 0 && nextPage.map(page => {
                   return <PaginationItem onPageChange={onPageChange} key={page} number={page}/>// Paginas posteriores
               })}

                {(currentPage + siblingsCount) < lastPage && (
                    <>
                        {(currentPage + 1 + siblingsCount) < lastPage && (
                        <Text color="gray.300" wd="8" textAlign="center">...</Text>)}
                        <PaginationItem onPageChange={onPageChange} number={lastPage}/>
                    </>
                )}
           
           </Stack>
        </Stack>
    );
}