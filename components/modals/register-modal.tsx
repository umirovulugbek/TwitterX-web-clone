import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import Modal from "../ui/modal";
import useRegisterModal from "@/hook/useRegisterModal";
import { RegisterStep1Schema1, RegisterStep1Schema2 } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import Button from "../ui/button";
import useLoginModal from "@/hook/useLoginModal";
import axios from "axios";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle } from "lucide-react";
import { signIn } from "next-auth/react";
const RegisterModal = () => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({ name: "", email: "" });
  const registermodal = useRegisterModal();
  const loginmodal = useLoginModal();

  const onToogle = useCallback(() => {
    loginmodal.onOpen(), registermodal.onClose();
  }, [registermodal, loginmodal]);

  const body =
    step === 1 ? (
      <RegisterStep1 setData={setData} setStep={setStep} />
    ) : (
      <RegisterStep2 data={data} />
    );
  const footer = (
    <div className="text-neutral-400 text-center mb-4">
      <p>
        Already have an account?{" "}
        <span
          className="text-white cursor-pointer hover:underline"
          onClick={onToogle}
        >
          Sign in
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      body={body}
      footer={footer}
      onClose={registermodal.onClose}
      isOpen={registermodal.isOpen}
      step={step}
      totalStep={2}
    />
  );
};

export default RegisterModal;

const RegisterStep1 = ({
  setData,
  setStep,
}: {
  setData: Dispatch<SetStateAction<{ email: string; name: string }>>;
  setStep: Dispatch<SetStateAction<number>>;
}) => {
  const [error, setError] = useState("");
  const form = useForm<z.infer<typeof RegisterStep1Schema1>>({
    resolver: zodResolver(RegisterStep1Schema1),
    defaultValues: {
      email: "",
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof RegisterStep1Schema1>) {
    try {
      const { data } = await axios.post("/api/auth/register?step=1", values);

      if (data.success) {
        setData(values);
        setStep(2);
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
  return (
    <>
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <Button
            label={"Next"}
            type="submit"
            secondary
            fullWidth
            large
            disabled={isSubmitting}
          />
        </form>
      </Form>
    </>
  );
};
const RegisterStep2 = ({ data }: { data: { name: string; email: string } }) => {
  const [error, setError] = useState("");
  const registermodal = useRegisterModal();

  const form = useForm<z.infer<typeof RegisterStep1Schema2>>({
    resolver: zodResolver(RegisterStep1Schema2),
    defaultValues: {
      password: "",
      username: "",
    },
  });

  async function onSubmit(values: z.infer<typeof RegisterStep1Schema2>) {
    try {
      const { data: response } = await axios.post("/api/auth/register?step=2", {
        ...data,
        ...values,
      });

      if (response?.success) {
        registermodal.onClose();
        signIn("credentials", values);
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
  return (
    <>
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
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Username" {...field} />
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
            label={"Register"}
            type="submit"
            secondary
            fullWidth
            large
            disabled={isSubmitting}
          />
        </form>
      </Form>
    </>
  );
};
