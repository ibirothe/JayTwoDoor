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
} from "@chakra-ui/react";
import { ThemeToggler } from "../Theme/ThemeToggler";
import axiosInstance from "../../services/axios";

export const Register = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();
  const toast = useToast();

  const onSubmit = async (values) => {
    try {
      await axiosInstance.post("/users/create", values)
      toast({
        title: "Account created successfully",
        status: "success",
        isClosable: true,
        duration: 2000
      });
      navigate("/login", {replace: true});
    } catch (error) {
      toast({
        title: `${error.response.data.detail}`,
        status: "error",
        isClosable: true,
        duration: 2000
      });
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

        <Heading mb={2}>Create Account</Heading>

        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          {/* Username field */}
          <FormControl isInvalid={errors.username}>
            <Input
              placeholder="Username"
              background={useColorModeValue("gray.200", "gray.800")}
              type="text"
              size="sm"
              fontSize={"xs"}
              mt={6}
              textAlign="center"
              {...register("username", {
                required: "Required field",
                minLength: { value: 5, message: "Username must be at least 5 characters long"},
                maxLength: { value: 30, message: "Username must be at most 30 characters long"}
            })}
            />
            <FormErrorMessage>
              {errors.username && errors.username.message}
            </FormErrorMessage>
          </FormControl>
          
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
              {...register("password", {
                required: "Required field",
                minLength: { value: 8, message: "Password must be at least 8 characters long"},
                maxLength: { value: 32, message: "Password must be at most 32 characters long"}
            })}
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
            colorScheme="purple"
            variant="outline"
            mt={6}
            type="submit"
          >
            Create Account
          </Button>

          <Button
            onClick={() => navigate("/login", { replace: true })}
            width="100%"
            colorScheme="gray"
            variant="outline"
            mt={6}
          >
            Login
          </Button>
        </form>
      </Flex>
    </Flex>
  );
};
