import { FormControl, FormErrorMessage, FormLabel, Input as ChakraInput, InputProps as ChakraInputProps } from "@chakra-ui/react";
import { forwardRef } from "react";
import { FieldError } from 'react-hook-form';

interface InputProps extends ChakraInputProps{
    name:string;
    label?: string;
    error?: FieldError;
}

const InputBase = ({name, error = null, label, ...rest}: InputProps, ref) => {
    return(

        <FormControl isInvalid={!!error}>
           { !!label && <FormLabel htmlFor={name}>{label}</FormLabel>}

                <ChakraInput
                  name={name}
                  id={name} 
                  focusBorderColor='pink.500'
                  bgColor="gray.900"
                  variant="filled"

                  _hover={{
                    bgColor: "gray.900",
                  }}

                  size="lg"
                  ref={ref}

                  {...rest}//Para pegar todas as outras propriedades
                />
                
              {!!error && (
                <FormErrorMessage>
                  {error.message}
                </FormErrorMessage>
              )}
            </FormControl>
    );
}

export const Input = forwardRef(InputBase); //Encaminhar a nossa REF
