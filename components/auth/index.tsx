"use client";

import Image from "next/image";
import React, { useCallback } from "react";
import Button from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import useRegisterModal from "@/hook/useRegisterModal";
import RegisterModal from "../modals/register-modal";
import useLoginModal from "@/hook/useLoginModal";
import LoginModal from "../modals/login-modal";
import { signIn, useSession } from "next-auth/react";

const Auth = () => {
  const registermodal = useRegisterModal();
  const loginmodal = useLoginModal();

  const { data } = useSession();
  console.log(data);
  const onOpenRegisterModal = useCallback(() => {
    registermodal.onOpen();
  }, [registermodal]);

  const onOpenLoginModal = useCallback(() => {
    loginmodal.onOpen();
  }, [loginmodal]);

  return (
    <>
      <RegisterModal />
      <LoginModal />
      <div className="grid  grid-cols-1 md:grid-cols-2 gap-10 items-center h-screen">
        <Image
          src={"/images/x.svg"}
          alt="X"
          width={500}
          height={"500"}
          className="justify-self-center hidden  md:block"
        />
        <div className="flex flex-col justify-center gap-6 md:justify-between h-full md:h-[70vh]">
          <div className="block md:hidden">
            <Image
              src={"/images/x.svg"}
              alt="X"
              width={50}
              height={"50"}
              className="justify-self-center"
            />
          </div>
          <h1 className=" text-5xl md:text-6xl font-bold">Happpening now</h1>
          <div className=" w-full md:w-[60%]">
            <h2 className="font-bold text-3xl mb-4">Join today.</h2>
            <div className="flex flex-col space-y-2">
              <Button
                onClick={() => signIn("google")}
                label={
                  <div className="flex gap-2 items-center justify-center">
                    <FcGoogle />
                    Signup with google
                  </div>
                }
                fullWidth
                secondary
              />
              <Button
                onClick={() => signIn("github")}
                label={
                  <div className="flex gap-2 items-center justify-center">
                    <FaGithub />
                    Signup with github
                  </div>
                }
                fullWidth
                secondary
              />

              <div className="flex items-center justify-center">
                <div className="h-px bg-gray-700 w-1/2"></div>
                <p className="mx-4">or</p>
                <div className="h-px bg-gray-700 w-1/2"></div>
              </div>

              <Button
                label={"Create account"}
                fullWidth
                onClick={onOpenRegisterModal}
              />
              <div className="text-[10px] text-gray-400">
                By signing up, you agree to the
                <span className="text-sky-500"> Terms of Service </span> and
                <span className="text-sky-500"> Privacy Policy</span>, includes
                <span className="text-sky-500"> Cookie Use </span>
              </div>
            </div>
          </div>
          <div className="w-full md:w-[60%]">
            <h3 className="font-medium text-xl mb-4">
              Already have a account?
            </h3>

            <Button
              label={"Signin"}
              outline
              fullWidth
              onClick={onOpenLoginModal}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
