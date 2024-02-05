import React, { useCallback, useState } from "react";
import Modal from "../ui/modal";
import useLoginModal from "@/hook/useLoginModal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import Button from "../ui/button";
import { LoginSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useRegisterModal from "@/hook/useRegisterModal";
import axios from "axios";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle } from "lucide-react";
import { signIn } from "next-auth/react";

const LoginModal = () => {
  const [error, setError] = useState("");

  const loginmodal = useLoginModal();
  const registormodal = useRegisterModal();

  const onToogle = useCallback(() => {
    loginmodal.onClose(), registormodal.onOpen();
  }, [registormodal, loginmodal]);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof LoginSchema>) {
    try {
      const { data } = await axios.post("/api/auth/login", values);
      if (data?.success) {
        loginmodal.onClose();
        signIn("credentials", { email: data?.email, password: data?.password });
      }
    } catch (error: any) {
      if (error?.response.data.error) {
        setError(error?.response.data.error);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  }

  const { isSubmitting } = form.formState;
  const body = (
    <div className="">
      {" "}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 px-10"
        >
          {error && (
            <>
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </>
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            label={"Login"}
            type="submit"
            secondary
            fullWidth
            large
            disabled={isSubmitting}
          />
        </form>
      </Form>{" "}
    </div>
  );

  const footer = (
    <div>
      <div className="text-neutral-400 text-center mb-4">
        <p>
          Firs time using X?{" "}
          <span
            className="text-white cursor-pointer hover:underline"
            onClick={onToogle}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
  return (
    <>
      <Modal
        body={body}
        onClose={loginmodal.onClose}
        isOpen={loginmodal.isOpen}
        footer={footer}
      />
    </>
  );
};

export default LoginModal;
