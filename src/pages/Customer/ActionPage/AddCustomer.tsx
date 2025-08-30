import CustomerForm from "@/components/CustomerForm";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UseAppContext } from "@/context/UseAppContext";
import type { CustomerFormValues } from "@/lib/zodSchemas";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const AddCustomer = () => {
  const { addDataCustomer } = UseAppContext();

  async function onSubmit(values: CustomerFormValues) {
    try {
      await addDataCustomer(values);
      console.log("data kirim", values);
    } catch (error) {
      console.error("error kirim data", error);
    }
  }

  return (
    <>
      <div className="flex items-center gap-4">
        <Link
          to="/customer"
          className={buttonVariants({
            variant: "outline",
            size: "icon",
          })}
        >
          <ArrowLeft className="size-4" />
        </Link>
        <h1 className="text-xl font-bold">Add Customer</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>
            Fill Form With Your Profil Information
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Customer Form Component */}
          <CustomerForm onSubmit={onSubmit} />
        </CardContent>
      </Card>
    </>
  );
};

export default AddCustomer;
