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
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const EditCustomer = () => {
  const { code } = useParams();
  const { customerByCode, fetchCustomerByCode, editDataCustomer } =
    UseAppContext();

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
    try {
      await editDataCustomer(values, code);
      console.log("data update", values);
    } catch (error) {
      console.error("error update data", error);
    }
  }

  useEffect(() => {
    if (code) {
      fetchCustomerByCode(code);
    }
  }, [code]);

  if (!customerByCode) return <p>Loading customer detail...</p>;

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
            initialValues={mapCustomerValues(customerByCode)}
            onSubmit={onSubmit}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default EditCustomer;
