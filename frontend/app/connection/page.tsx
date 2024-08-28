"use client"
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginForm from "@/components/connection/LoginForm";
import SignUpForm from "@/components/connection/SignUpForm";
import ForgetSign from "@/components/connection/ForgetSign";



const LoginPage = () => {

  return (
    <Tabs defaultValue="Connection" className="w-[90%] mt-[60px]">
      <TabsList className="flex items-center justify-center">
        <TabsTrigger value="Connection" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white rounded-lg border w-1/2 h-[40px] lg:h-[60px]">Connection</TabsTrigger>
        <TabsTrigger value="Enregistrement" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white rounded-lg border w-1/2 h-[40px] lg:h-[60px]">Enregistrement</TabsTrigger>
      </TabsList>
      <TabsContent value="Connection">
        <Card>
          <CardHeader>
            <CardTitle>Bonjour !</CardTitle>
            <CardDescription>Connectez-vous pour décourvrir toutes nos fonctionnalités</CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
          <CardFooter>
            <Dialog>
              <DialogTrigger>Mot de passe oublié?</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Veuillez entrer votre adresse mail</DialogTitle>
                  <DialogDescription>
                    <div className="flex flex-col space-y-1.5">
                      <ForgetSign />
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="Enregistrement">
        <Card>
          <CardHeader>
            <CardTitle>Hey !</CardTitle>
            <CardDescription>Enregistrez-vous pour profiter de nos fonctionnalités</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center items-center gap-4 mb-3.5">
              <Button className="bg-rose-500 text-white gap-2 lg:w-1/4"><FaInstagram className=" text-lg rounded-lg" />Instagram</Button>
              <Button className="gap-2 bg-blue-700 text-white lg:w-1/4"><FaFacebook className="text-lg rounded-full" />Facebook</Button>
            </div>
            <div>
              or conitnue with
            </div>
            <SignUpForm />
          </CardContent>
        </Card>
      </TabsContent>
      <ToastContainer pauseOnFocusLoss={false} autoClose={5000} />
    </Tabs>
  )
}

export default LoginPage
