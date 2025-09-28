import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  Flex,
  FormControl,
  Heading,
  Input,
  useColorModeValue,
  FormErrorMessage,
  Button,
  useToast,
  Text
} from "@chakra-ui/react";
import { ThemeToggler } from "../Theme/ThemeToggler";
import { useAuth } from "../../hooks/useAuth";

export const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();
  const { login } = useAuth();
  const toast = useToast();

  const onSubmit = async (values) => {
    try {
      await login(values.email, values.password)
    } catch (error) {
      toast({
        title:"Invalid email or password",
        status:"error",
        isClosable:true,
        duration:2000
      })
    }
  };

  return (
    <Flex
      height="100vh"
      align="center"
      justify="center"
      background={useColorModeValue(
        "linear-gradient(90deg, #f4e3d8ff, #f6d2d6ff)",
        "linear-gradient(90deg, #1e191aff, #251a28ff)"
      )}
    >
      <Flex
        direction="column"
        align="center"
        background={useColorModeValue(
          "linear-gradient(90deg, #d1a9adff, #cb99abff)",
          "linear-gradient(90deg, #3e3234ff, #36292eff)"
        )}
        p={10}
        rounded={12}
        width="sm"
      >
        {/* Toggler in top right */}
        <Flex width="100%" justify="flex-end" align="center" mb={6}>
            <ThemeToggler showLabel={true} />
        </Flex>

        <Heading mb={0}>LOGIN</Heading>
        <Text mb={2}>J A Y 2 D o o r</Text>

        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          {/* Email field */}
          <FormControl isInvalid={errors.email}>
            <Input
              placeholder="Email"
              background={useColorModeValue("gray.200", "gray.800")}
              type="email"
              size="sm"
              fontSize={"xs"}
              mt={6}
              textAlign="center"
              {...register("email", { required: "Required field" })}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>

          {/* Password field */}
          <FormControl isInvalid={errors.password}>
            <Input
              placeholder="Password"
              background={useColorModeValue("gray.200", "gray.800")}
              type="password"
              size="sm"
              fontSize={"xs"}
              mt={6}
              textAlign="center"
              {...register("password", { required: "Required field" })}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>

          {/* Buttons */}
          <Button
            isLoading={isSubmitting}
            loadingText="Logging in..."
            width="100%"
            colorScheme="blue"
            variant="outline"
            mt={6}
            type="submit"
          >
            Login
          </Button>

          <Button
            onClick={() => navigate("/register", { replace: true })}
            width="100%"
            colorScheme="gray"
            variant="outline"
            mt={6}
          >
            Create account
          </Button>
        </form>
      </Flex>
    </Flex>
  );
};
