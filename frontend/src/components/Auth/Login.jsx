import { useForm } from "react-hook-form"
import { Flex, FormControl, Heading, Input, useColorModeValue, FormErrorMessage, Button } from "@chakra-ui/react";

export const Login = () => {
    const {
        handleSubmit,
        register,
        formState: {errors, isSubmitting}
    } = useForm();
    
    const onSubmit = (values) => {
        console.log(values)
    }
    
    return <Flex height="100vh" align="center" justifyContent="center">
        <Flex
        direction="column"
        alignItems="center"
        background={useColorModeValue("gray.300", "gray.900")}
        p={10}
        rounded={12}>
            <Heading mb={6}>Login</Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={errors.email}>
                    <Input
                    placeholder="Email"
                    background={useColorModeValue("gray.200", "gray.800")}
                    type="email"
                    size="lg"
                    mt={6}
                    textAlign={"center"}
                    {...register("email", {
                        registered: "Required field"
                    })}
                    />
                    <FormErrorMessage>
                        {errors.email && errors.email.message}
                    </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.email}>
                    <Input
                    placeholder="Password"
                    background={useColorModeValue("gray.200", "gray.800")}
                    type="password"
                    size="lg"
                    mt={6}
                    textAlign={"center"}
                    {...register("password", {
                        registered: "Required field"
                    })}
                    />
                    <FormErrorMessage>
                        {errors.password && errors.password.message}
                    </FormErrorMessage>
                </FormControl>
                <Button width="100%" colorScheme="gray" variant={"outline"} mt={6}>
                    Login
                </Button>
            </form>
        </Flex>
    </Flex>;
};