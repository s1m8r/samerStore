import { useRegister } from "@/API/user";
import RegisterForm from "@/components/layout/form/register";
import { registerSchema } from "@/schemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
      age: data.age,
      address: {
        street: "Al-Sadr City",
        city: "Baghdad",
        state: "Baghdad",
        zipCode: "10001",
        country: "Iraq",
      },
      phone: "07722759695",
      role: "user",
      roleId: 3,
      isActive: true,
    };
    mutate(dataFormat, {
      onSuccess: () => {
        navigate({
          to: "/login",
        });
      },
    });
  };
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <RegisterForm
        title="Register"
        handleSubmit={handleSubmit}
        onsubmit={handleRegister}
        errors={errors}
        register={register}
        isPending={isPending}
        isRegister={true}
      />
    </div>
  );
};

export default Register;
