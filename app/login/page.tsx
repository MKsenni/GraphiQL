"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useDict } from "../utils/useDictHook";
import { useState } from "react";
import { Signin } from "../components/signin";
import { Signup } from "../components/signup";

function Page() {
  const { status } = useSession();
  const dict = useDict();
  if (status === "authenticated") redirect("/main");
  const [isRegistrated, setIsRegistrated] = useState(true);
  return (
    <>
      <div className="flex flex-col items-center">
        {isRegistrated ? <Signin /> : <Signup />}
        <div>{isRegistrated ? dict.notHaveAnAccount : dict.haveAnAccount}</div>
        <button
          className=" font-bold text-blue-500 ml-3"
          onClick={() => setIsRegistrated(!isRegistrated)}
        >
          {isRegistrated ? dict.register : dict.login}
        </button>
      </div>
    </>
  );
}

export default Page;
