import CustomerForm from "@/components/Customer/CustomerForm";
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
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";

const EditCustomer = () => {
  const { code } = useParams();
  const { customerByCode, fetchCustomerByCode, editDataCustomer, navigate } =
    UseAppContext();

  const [isLoading, setIsLoading] = useState(false);

  const mapCustomerValues = (customer: any) => ({
    name: customer.name || "",
    identityNo: customer.identityNo || "",
    npwp: customer.npwp || "",
    email: customer.email || "",
    phone: customer.phone || "",
    mobile_phone: customer.mobilePhone || "",
    provinceCode: customer.province?.code || "",
    cityCode: customer.city?.code || "",
    address: customer.address || "",
    companyType: customer.companyType || "",
  });

  async function onSubmit(values: CustomerFormValues) {
    setIsLoading(true);
    try {
      const res = await editDataCustomer(values, code);

      if (res.responseCode === "20000") {
        navigate("/customer");

        toast.success("Berhasil edit data customer", {
          richColors: true,
          position: "top-right",
        });
      }
    } catch {
      toast.error("Gagal menambah data customer", {
        description: "Unexpected error occured",
        richColors: true,
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (code) {
      fetchCustomerByCode(code);
    }
  }, [code]);

  if (!customerByCode)
    return (
      <div className="flex items-center justify-center h-[60vh] gap-4">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
        Loading ...
      </div>
    );

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
        <h1 className="text-xl font-bold">Edit Customer</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Update customer information below</CardTitle>
          <CardDescription>
            Edit the customer details and make sure all information is correct
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Customer Form Component */}
          <CustomerForm
            isLoadingPostData={isLoading}
            initialValues={mapCustomerValues(customerByCode)}
            onSubmit={onSubmit}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default EditCustomer;
