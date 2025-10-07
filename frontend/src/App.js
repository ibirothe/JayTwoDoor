import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { Flex, Spinner } from "@chakra-ui/react";

import { AuthProvider, AuthConsumer } from "./context/JWTAuthContext";
import { PublicRoute } from "./components/Auth/PublicRoute";
import { Authenticated } from "./components/Auth/Authenticated";
import { NavBar } from "./components/Navbar/NavBar";
import { Footer } from "./components/Footer/Footer";
import { Login } from "./components/Auth/Login";
import { Register } from "./components/Auth/Register";
import { TodoList } from "./components/Todo/TodoList";
import { TodoDetail } from "./components/Todo/TodoDetail";

function App() {
  return (
    <AuthProvider>
      <Router>
        <AuthConsumer>
          {(auth) =>
            !auth.isInitialized ? (
              <Flex height="100vh" alignItems="center" justifyContent="center">
                <Spinner
                  thickness="6px"
                  speed="0.5s"
                  emptyColor="gray.200"
                  color="gray.500"
                  size="lg"
                />
              </Flex>
            ) : (
              <Routes>
                {/* Public pages */}
                <Route path="/login" element={<PublicRoute><Login /><Footer /></PublicRoute>} />
                <Route path="/register" element={<PublicRoute><Register /><Footer /></PublicRoute>} />

                {/* Authenticated pages */}
                <Route
                  path="/"
                  element={
                    <Authenticated>
                      <NavBar />
                      <TodoList />
                      <Footer />
                    </Authenticated>
                  }
                />
                <Route
                  path="/:todoId"
                  element={
                    <Authenticated>
                      <NavBar />
                      <TodoDetail />
                      <Footer />
                    </Authenticated>
                  }
                />

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            )
          }
        </AuthConsumer>
      </Router>
    </AuthProvider>
  );
}

export default App;
