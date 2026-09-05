import { useAuthStore } from "@/stores/userStore";
import { ProComponent } from "./profileComponent";
import { useNavigate } from "@tanstack/react-router";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import InputForm from "@/components/layout/form/inputForm";
import { KeyRoundIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useRestPassword } from "@/API/user";
import { useState } from "react";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
const Profile = () => {
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore.getState().user;
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    setTimeout(() => {
      navigate({ to: "/login" });
    }, 200);
  };
  const changePassword = z.object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
  });
  type changePasswordType = z.infer<typeof changePassword>;
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<changePasswordType>({
    resolver: zodResolver(changePassword),
  });
  const { mutate, isPending } = useRestPassword();
  const handleChange = (data: changePasswordType) => {
    mutate(data, {
      onSuccess: () => {
        reset();
        setOpen(false);
        toast.success("Password changed successfully");
      },
    });
  };
  return (
    <>
      <div className="mx-auto w-full max-w-xl px-4 py-10 sm:p-12">
        <div className="flex justify-center">
          <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
            {user?.firstName.charAt(0)}
            {user?.lastName.charAt(0)}
          </div>
        </div>
        <ProComponent
          title="First Name"
          dataInformation={user?.firstName ?? ""}
        />
        <ProComponent
          title="Last Name"
          dataInformation={user?.lastName ?? ""}
        />
        <ProComponent
          title="Age"
          dataInformation={user?.age?.toString() ?? ""}
        />
        <ProComponent title="Email" dataInformation={user?.email ?? ""} />
        <ProComponent title="Phone" dataInformation={user?.phone ?? ""} />
        <ProComponent title="Role" dataInformation={user?.role ?? ""} />
        <div className="flex flex-col items-center">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className=" cursor-pointer mb-3">
                Reset Password
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm ">
              <DialogHeader>
                <DialogTitle>Change your Password</DialogTitle>
              </DialogHeader>
              <FieldGroup>
                <form onSubmit={handleSubmit(handleChange)}>
                  <Field>
                    <InputForm
                      name="password"
                      register={register}
                      type="password"
                      isPassword={true}
                      icon={<KeyRoundIcon />}
                      label="Password"
                      ariaInvalid={!!errors.password?.message}
                      errorMessage={errors.password?.message}
                      placeholder="password"
                    />
                  </Field>
                  <Field>
                    <InputForm
                      name="newPassword"
                      register={register}
                      type="password"
                      isPassword={true}
                      icon={<KeyRoundIcon />}
                      label="newPassword"
                      ariaInvalid={!!errors.newPassword?.message}
                      errorMessage={errors.newPassword?.message}
                      placeholder="newPassword"
                    />
                  </Field>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline" className="cursor-pointer">
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button
                      type="submit"
                      disabled={isPending}
                      className="cursor-pointer"
                    >
                      {isPending ? (
                        <Spinner data-icon="inline-start" />
                      ) : (
                        "Save changes"
                      )}
                    </Button>
                  </DialogFooter>
                </form>
              </FieldGroup>
            </DialogContent>
          </Dialog>
          <button
            onClick={handleLogout}
            className=" text-red-700 font p-2 cursor-pointer"
          >
            logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile;
