import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { register } from "../helper/api";
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
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import useUserStore from "@/store/userStore";
import useCountStore from "@/store/countStore";

// ✅ Validation Schema
const registerSchema = z.object({
  userName: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function RegisterForm() {
  const setUser = useUserStore((state) => state.setUser);
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

  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    console.log("Register data:", values);
    let res = await register(values);
    setUser(res.user);
    setImportantItemsCount(res.user.importantItemsCount || 0);
    setFavoriteItemsCount(res.user.favoriteItemsCount || 0);
    setRecentItemsCount(res.user.recentItemsCount || 0);
    setTrashedItemsCount(res.user.trashedItemsCount || 0);
    setStorageUsed(res.storageUsed || 0);
    setStorageLimit(res.storageLimit || 0);
    setRootFolderCount(res.user.rootFolderCount || 0);
    console.log(res);
    toast.success("register success");
    navigate("/");
  };

  return (
    <div className="h-full flex items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full"
        >
          <h1 className="underline text-2xl text-center uppercase">Register</h1>

          {/* Username */}
          <FormField
            control={form.control}
            name="userName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter email" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Registering..." : "Register"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
