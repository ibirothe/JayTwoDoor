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
  Text,
} from "@chakra-ui/react";
import { ThemeToggler } from "../Theme/ThemeToggler";
import axiosInstance from "../../services/axios";
import loginBgLight from '../../assets/flex_bg_light.png';
import loginBgDark from '../../assets/flex_bg_dark.png';

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
      height="95vh"
      align="center"
      justify="center"
      backgroundSize="cover"
      background={useColorModeValue(
        "linear-gradient(90deg, #f6d8baff, #fae1e1ff)",
        "linear-gradient(90deg, #1e191aff, #251a28ff)"
      )}
    >
      <Flex
        direction="column"
        align="center"
        backgroundImage={useColorModeValue(
                  `url(${loginBgLight})`,
                  `url(${loginBgDark})`
                )}
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        p={10}
        rounded={12}
        width="sm"
      >
        {/* Toggler in top right */}
        <Flex width="100%" justify="flex-end" align="center" mb={6}>
            <ThemeToggler showLabel={true} />
        </Flex>

        <Heading mb={0} align="center">CREATE ACCOUNT</Heading>
        <Text mb={2}>J A Y 2 D o o r</Text>

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
              rounded="full"
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
              rounded="full"
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
              rounded="full"
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
            color={useColorModeValue("#1e191aff", "#f4e3d8ff")}
            textColor={"#ffffffff"}
            variant="outline"
            mt={6}
            rounded="full"
            type="submit"
          >
            Create Account
          </Button>

          <Button
            onClick={() => navigate("/login", { replace: true })}
            width="100%"
            color={useColorModeValue("#1e191aff", "#f4e3d8ff")}
            textColor={"#ffffffff"}
            variant="outline"
            mt={6}
            rounded="full"
          >
            Login
          </Button>
        </form>
      </Flex>
    </Flex>
  );
};