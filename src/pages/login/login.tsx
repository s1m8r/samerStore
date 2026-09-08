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
import AuthLayout from "@/components/layout/authLayout";

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
    <AuthLayout
      title="Sign in"
      subtitle="Welcome back to Samer Shop."
      tagline="Wear the street. Not the trend."
      taglineDetail="Sign in to track your orders and pick up right where you left off."
      footer={
        <Link
          to="/register"
          className="flex justify-center text-sm text-muted-foreground underline underline-offset-4 transition hover:text-foreground"
        >
          I don't have an account
        </Link>
      }
    >
      <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
        <InputForm
          register={register}
          icon={<MailIcon />}
          name="email"
          placeholder="Email"
          label="Email"
          ariaInvalid={!!errors.email?.message}
          errorMessage={errors.email?.message}
        />

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

        <Button disabled={isPending} className="w-full">
          Sign in
        </Button>
      </form>
      {isError && <ErrorMessage>{error.message}</ErrorMessage>}
    </AuthLayout>
  );
};

export default Login;
