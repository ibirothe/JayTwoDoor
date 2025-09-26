import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./components/Auth/Login";
import { Register } from "./components/Auth/Register";
import { AuthContext, AuthConsumer, AuthProvider } from "./context/JWTAuthContext"
import { Flex, Spinner } from "@chakra-ui/react";


function App() {
  return (
    <>
    <AuthProvider>
    <Router>
      <AuthConsumer>
        {(auth) => !auth.isInitialized ? (
          <Flex
          height="100vh"
          alignItems={"center"}
          justifyContent={"center"}
          >
            <Spinner
            thickness="6px"
            speed="0.5s"
            emptyColor="gray.200"
            color="gray.500"
            size="lg"
            />
          </Flex>
        ): (
          <Routes>
            <Route path="/login" element={ <Login />} />
            <Route path="/register" element={ <Register />} />
            <Route path="/" element={<h1>home placeholder</h1>} />
            <Route path="*" element={ <Navigate to="/" />} />
          </Routes>
        )}
      </AuthConsumer>
    </Router>
    </AuthProvider>
    </>
    
  );
}

export default App;
