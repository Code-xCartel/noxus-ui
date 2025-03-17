import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  LoginFormShape,
  RegisterFormShape,
  LoginSchema,
  RegisterSchema,
} from "@/schemas/authSchema.ts";

const AuthLayout = () => {
  const [tab, setTab] = useState("login");

  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
    reset: loginReset,
  } = useForm<LoginFormShape>({ resolver: zodResolver(LoginSchema) });

  const {
    register: registerRegister,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors },
    reset: registerReset,
  } = useForm<RegisterFormShape>({ resolver: zodResolver(RegisterSchema) });

  const onSubmitLogin: SubmitHandler<LoginFormShape> = async (data) => {
    console.log(data);
    loginReset();
  };

  const onSubmitRegister: SubmitHandler<RegisterFormShape> = async (data) => {
    console.log(data);
    registerReset();
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-5">
      <img className="h-44 w-44" src="" alt="logo" />
      <Tabs defaultValue="login" className="w-[350px] md:w-[400px]" value={tab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login" onClick={() => setTab("login")}>
            Login
          </TabsTrigger>
          <TabsTrigger value="register" onClick={() => setTab("register")}>
            Register
          </TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardDescription>
                Login to your existing Noxus account.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleLoginSubmit(onSubmitLogin)}>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="email">email</Label>
                  <Input
                    id="email"
                    type="text"
                    placeholder="john@doe.com"
                    {...loginRegister("email")}
                  />
                  <span className="text-red-500 text-[10px]">
                    {loginErrors.email?.message}
                  </span>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="password"
                    {...loginRegister("password")}
                  />
                  <span className="text-red-500 text-[10px]">
                    {loginErrors.password?.message}
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Login</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="register">
          <Card>
            <CardHeader>
              <CardDescription>Register a new PetPal account.</CardDescription>
            </CardHeader>
            <form onSubmit={handleRegisterSubmit(onSubmitRegister)}>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="john Doe"
                    {...registerRegister("username")}
                  />
                  <span className="text-red-500 text-[10px]">
                    {registerErrors.username?.message}
                  </span>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@doe.com"
                    {...registerRegister("email")}
                  />
                  <span className="text-red-500 text-[10px]">
                    {registerErrors.email?.message}
                  </span>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="@johndoe"
                    {...registerRegister("password")}
                  />
                  <span className="text-red-500 text-[10px]">
                    {registerErrors.password?.message}
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Register</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthLayout;
