import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { login } from "../helper/api";
import useUserStore from "@/store/userStore";
import useCountStore from "@/store/countStore";

// Zod validation schema
const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export default function ForgotPassword() {
  const setImportantItemsCount = useCountStore(
    (state) => state.setImportantItemsCount
  );
  const setFavoriteItemsCount = useCountStore(
    (state) => state.setFavoriteItemsCount
  );
  const setRecentItemsCount = useCountStore(
    (state) => state.setRecentItemsCount
  );
  const setTrashedItemsCount = useCountStore(
    (state) => state.setTrashedItemsCount
  );
  const setStorageUsed = useCountStore((state) => state.setStorageUsed);
  const setStorageLimit = useCountStore((state) => state.setStorageLimit);
  const setRootFolderCount = useCountStore((state) => state.setRootFolderCount);

  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      const response = await login(values);
      console.log(response.user);
      toast.success("Login successful");
      setUser(response.user);
      setImportantItemsCount(response.user.importantItemsCount || 0);
      setFavoriteItemsCount(response.user.favoriteItemsCount || 0);
      setRecentItemsCount(response.user.recentItemsCount || 0);
      setTrashedItemsCount(response.user.trashedItemsCount || 0);
      setStorageUsed(response.storageUsed || 0);
      setStorageLimit(response.storageLimit || 0);
      setRootFolderCount(response.user.rootFolderCount || 0);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex items-center justify-center border w-[300px] p-5 rounded-2xl">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 w-full"
          >
            <h1 className="underline text-2xl text-center uppercase">
              Forgot Password
            </h1>

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting
                ? "Logging in..."
                : "Change password"}
            </Button>

            <p className="text-sm text-center">
              <span
                onClick={() => navigate("/forgot-password")}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Register Or Login
              </span>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
}
