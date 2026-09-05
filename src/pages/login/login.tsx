import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "@/API/user";
import { loginScema } from "@/schemas/user";
import ErrorMessage from "@/components/layout/form/error";
import { Link } from "@tanstack/react-router";
import { KeySquareIcon, MailIcon } from "lucide-react";
import InputForm from "@/components/layout/form/inputForm";
import { Button } from "@/components/ui/button";

const Login = () => {
  type loginSchemaType = z.infer<typeof loginScema>;

  const { mutate, isPending, isError, error } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginSchemaType>({
    resolver: zodResolver(loginScema),
  });

  const handleLogin = (data: loginSchemaType) => {
    mutate(data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md animate-in fade-in-0 zoom-in-95 rounded-xl border border-border bg-card p-6 shadow-sm duration-300">
        <h1 className="mb-6 text-center text-xl font-semibold">Login</h1>
        <div>
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
            <div className="space-y-1">
              <InputForm
                register={register}
                icon={<MailIcon />}
                name="email"
                placeholder="Email"
                label="Email"
                ariaInvalid={!!errors.email?.message}
                errorMessage={errors.email?.message}
              />
            </div>

            <div className="space-y-1">
              <InputForm
                register={register}
                icon={<KeySquareIcon />}
                name="password"
                placeholder="Password"
                label="Password"
                type="password"
                ariaInvalid={!!errors.password?.message}
                errorMessage={errors.password?.message}
                isPassword={true}
              />
            </div>
            <Button disabled={isPending} className="w-full">
              Login
            </Button>
          </form>
          {isError && <ErrorMessage>{error.message}</ErrorMessage>}
          <Link
            to="/register"
            className="mb-2 mt-2 flex justify-center text-sm text-muted-foreground underline underline-offset-4 transition hover:text-foreground"
          >
            I don't have an account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
