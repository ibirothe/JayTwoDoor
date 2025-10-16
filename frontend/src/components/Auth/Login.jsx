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
import { useAuth } from "../../hooks/useAuth";
import loginBgLight from '../../assets/flex_bg_light.png';
import loginBgDark from '../../assets/flex_bg_dark.png';

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
      height="95vh"
      align="center"
      justify="center"
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
            color={useColorModeValue("#1e191aff", "#f4e3d8ff")}
            textColor={"#ffffffff"}
            variant="outline"
            mt={6}
            type="submit"
            rounded="full"
          >
            Login
          </Button>

          <Button
            onClick={() => navigate("/register", { replace: true })}
            width="100%"
            color={useColorModeValue("#1e191aff", "#f4e3d8ff")}
            textColor={"#ffffffff"}
            variant="outline"
            mt={6}
            rounded="full"
          >
            Create Account
          </Button>
        </form>
      </Flex>
    </Flex>
  );
};
