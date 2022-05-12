import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps{
    showProfileData?: boolean;
}

export function Profile({showProfileData = true}:ProfileProps){
    return(
        <Flex align="center">
                { showProfileData && (
                    <Box mr="4" textAlign="right">
                        <Text>Arthur Fernandes</Text>
                        <Text color="gray.300" fontSize="small">
                            arthurroque007@gmail.com
                        </Text>
                    </Box>
                )}

                <Avatar size="md" name="Arthur Fernandes" src="http://github.com/arthurferrarez.png"/>
        </Flex>
    );
}