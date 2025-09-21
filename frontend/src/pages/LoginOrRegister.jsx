import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const LoginOrRegister = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Card className="w-[400px] shadow-xl h-110">
        <CardHeader className="grid grid-cols-2 relative h-15 border-b overflow-hidden -mt-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`z-10 font-semibold h-15 transition-colors ${
              isLogin ? "text-white" : "text-black"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`z-10 font-semibold h-15 transition-colors ${
              !isLogin ? "text-white" : "text-black"
            }`}
          >
            Register
          </button>

          {/* Animated highlight bar */}
          <motion.span
            className="absolute top-0 h-full w-1/2 bg-black rounded-tl-2xl rounded-tr-2xl"
            animate={{ x: isLogin ? "0%" : "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </CardHeader>

        <CardContent>{isLogin ? <Login /> : <Register />}</CardContent>
      </Card>
    </div>
  );
};

export default LoginOrRegister;
