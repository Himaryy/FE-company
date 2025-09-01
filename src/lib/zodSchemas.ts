import z from "zod";

export const companyTypeEnum = ["person", "company"] as const;

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
    .max(50, { message: "Maksimal 50 karakter" })
    .uppercase({ message: "Nama harus uppercase" }),
  identityNo: z.string().optional(),
  npwp: z.string().optional(),
  email: z.string().optional(),
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
  companyType: z.enum(companyTypeEnum, { message: "Company Type harus diisi" }),
});

export type CustomerFormValues = z.infer<typeof CustomerSchema>;

// CHange Password
export const ChangePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, { message: "Password minimal 8 karakter" }),
    newPassword: z
      .string()
      .min(8, { message: "Password baru minimal 8 karater" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).+$/,
        "Password harus ada uppercase, lowecase, dan spesial karakter"
      ),
    newPasswordConfirmation: z.string(),
  })
  .refine((data) => data.newPassword === data.newPasswordConfirmation, {
    path: ["newPasswordConfirmation"],
    message: "Password tidak sama",
  });

export type ChangePasswordFormValues = z.infer<typeof ChangePasswordSchema>;

// Register user
export const RegisterUserSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Minimal 3 karakter" })
    .max(50, { message: "Maksimal 50 karakter" }),
  phone: z
    .string()
    .min(10, { message: "Minimal 10 digit" })
    .max(15, { message: "Maksimal 15 digit" }),
  email: z.email({ message: "Email tidak valid" }),
  address: z
    .string()
    .min(3, { message: "Minimal 3 karakter" })
    .max(100, { message: "Maksimal 100 karakter" }),
  password: z
    .string()
    .min(8, { message: "Password minimal 8 karakter" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).+$/,
      "Password harus mengandung uppercase, lower case, dan ada spesial karakter"
    ),
});

export type RegisterFormValues = z.infer<typeof RegisterUserSchema>;
