import z from "zod";

// Auth
export const loginFormSchema = z.object({
  phone: z
    .string()
    .min(10, { message: "Min 10 angka" })
    .max(15, { message: "Maksimal 15 angka" }),
  password: z.string().min(3, { message: "minimal 3 karakter" }),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;

// Customer
export const CustomerSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Minimal 3 karakter" })
    .max(50, { message: "Maksimal 50 karakter" }),
  identityNo: z.string().optional(),
  npwp: z.string().optional(),
  email: z.email().optional().or(z.literal("")),
  phone: z.string().optional(),
  mobile_phone: z.string().optional(),
  provinceCode: z
    .string()
    .min(2, { message: "Minimal 2 karakter" })
    .max(8, { message: "Maksimal 8 karakter" }),
  cityCode: z
    .string()
    .min(2, { message: "Minimal 2 karakter" })
    .max(8, { message: "Maksimal 8 karakter" }),
  address: z
    .string()
    .min(3, { message: "Minimal 3 karakter" })
    .max(100, { message: "Maksimal 100 karakter" }),
  companyType: z
    .string()
    .min(3, { message: "Minimal 3 karakter" })
    .max(10, { message: "Maksimal 10 karakter" }),
});

export type CustomerFormValues = z.infer<typeof CustomerSchema>;
