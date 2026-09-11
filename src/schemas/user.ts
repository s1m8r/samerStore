import { z } from "zod";

export const loginScema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const addressSchema = z.object({
  street: z.string().min(1, "Street is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(1, "ZIP code is required"),
  country: z.string().min(1, "Country is required"),
});

export const registerSchema = z.object({
  id: z.number().optional(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .optional(),
  age: z.number(),
  address: addressSchema.optional(),
  phone: z
    .string()
    .regex(/^\d{11}$/, "Phone number must be 11 digits"),
  role: z.string().optional(),
  roleId: z.number().optional(),
  isActive: z.boolean().optional(),
});
