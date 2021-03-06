import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "Utils/AuthContext";
import { Switch, Route } from "react-router-dom";
import { PrivateRoute } from "Components/Others";
import AllPages from "Pages";
import { SignIn, SignUp, ForgotPassword } from "Pages/Auth";
import Theme from "Theme";

//React Query
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

function App() {
  return (
    <ChakraProvider theme={Theme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Switch>
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/forgotpassword" component={ForgotPassword} />
            <PrivateRoute exact component={AllPages}></PrivateRoute>
          </Switch>
        </AuthProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
