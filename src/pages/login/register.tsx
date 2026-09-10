import { useRegister } from "@/API/user";
import { registerSchema } from "@/schemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AuthLayout from "@/components/layout/authLayout";
import InputForm from "@/components/layout/form/inputForm";
import { Button } from "@/components/ui/button";
import {
  Building2,
  Calendar,
  Globe,
  Lock,
  Mail,
  Phone,
  UserRound,
} from "lucide-react";

type registerFormData = z.infer<typeof registerSchema>;

const Register = () => {
  const { mutate, isPending } = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });
  const navigate = useNavigate();
  const handleRegister = (data: registerFormData) => {
    const dataFormat = {
      ...data,
      address: {
        street: "Al-Sadr City",
        city: data.address?.city ?? "",
        state: "Baghdad",
        zipCode: "10001",
        country: data.address?.country ?? "",
      },
      role: "user",
      roleId: 3,
      isActive: true,
    };
    mutate(dataFormat, {
      onSuccess: () => {
        navigate({ to: "/login" });
      },
    });
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join Samer Shop to start shopping."
      tagline="Wear the street. Not the trend."
      taglineDetail="Create an account to save your sizes, track orders, and get new drops first."
      footer={
        <Link
          to="/login"
          className="flex justify-center text-sm text-muted-foreground underline underline-offset-4 transition hover:text-foreground"
        >
          I already have an account
        </Link>
      }
    >
      <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
        <InputForm
          register={register}
          icon={<UserRound />}
          name="firstName"
          placeholder="First Name"
          label="First Name"
          ariaInvalid={!!errors.firstName?.message}
          errorMessage={errors.firstName?.message}
        />

        <InputForm
          register={register}
          icon={<UserRound size={22} />}
          name="lastName"
          placeholder="Last Name"
          label="Last Name"
          ariaInvalid={!!errors.lastName?.message}
          errorMessage={errors.lastName?.message}
        />

        <InputForm
          register={register}
          icon={<Calendar size={22} />}
          name="age"
          placeholder="Age"
          label="Age"
          type="number"
          options={{ valueAsNumber: true }}
          ariaInvalid={!!errors.age?.message}
          errorMessage={errors.age?.message}
        />

        <InputForm
          register={register}
          icon={<Mail size={22} />}
          name="email"
          placeholder="Email"
          label="Email"
          ariaInvalid={!!errors.email?.message}
          errorMessage={errors.email?.message}
        />

        <InputForm
          register={register}
          icon={<Lock size={22} />}
          name="password"
          placeholder="Password"
          label="Password"
          type="password"
          ariaInvalid={!!errors.password?.message}
          errorMessage={errors.password?.message}
          isPassword={true}
        />

        <InputForm
          register={register}
          icon={<Phone size={22} />}
          name="phone"
          placeholder="Phone"
          label="Phone"
          ariaInvalid={!!errors.phone?.message}
          errorMessage={errors.phone?.message}
        />

        <InputForm
          register={register}
          icon={<Building2 size={22} />}
          name="address.city"
          placeholder="City"
          label="City"
          ariaInvalid={!!errors.address?.city?.message}
          errorMessage={errors.address?.city?.message}
        />

        <InputForm
          register={register}
          icon={<Globe size={22} />}
          name="address.country"
          placeholder="Country"
          label="Country"
          ariaInvalid={!!errors.address?.country?.message}
          errorMessage={errors.address?.country?.message}
        />

        <Button className="w-full" disabled={isPending}>
          Create account
        </Button>
      </form>
    </AuthLayout>
  );
};

export default Register;
