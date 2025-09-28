import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./components/Auth/Login";
import { Register } from "./components/Auth/Register";
import { AuthContext, AuthConsumer, AuthProvider } from "./context/JWTAuthContext"
import { Flex, Spinner } from "@chakra-ui/react";
import { PublicRoute } from "./components/Auth/PublicRoute";
import { Authenticated } from "./components/Auth/Authenticated";
import { TodoList } from "./components/Todo/TodoList";


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
            <Route path="/login" element={ <PublicRoute><Login /></PublicRoute> } />
            <Route path="/register" element={ <PublicRoute><Register /></PublicRoute> } />
            <Route path="/" element={ <Authenticated><TodoList/></Authenticated> } />
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