import {
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { UseAppContext } from "@/context/UseAppContext";

const CustomerDetail = () => {
  const { detailCustomer } = UseAppContext();

  return (
    <DrawerContent>
      <DrawerHeader className="gap-1">
        <DrawerTitle>Detail Data - {detailCustomer?.name}</DrawerTitle>
        <DrawerDescription>Showing the details customer</DrawerDescription>
      </DrawerHeader>
      <Separator />
      <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm my-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <Label htmlFor="name">Name</Label>
            <Input readOnly id="name" value={detailCustomer?.name} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="identityNo">Identity Number</Label>
              <Input
                readOnly
                id="identityNo"
                value={detailCustomer?.identityNo ?? "-"}
              />
            </div>

            <div className="flex flex-col gap-3">
              <Label htmlFor="type">Type</Label>
              <Input readOnly id="type" value={detailCustomer?.type} />
            </div>

            <div className="flex flex-col gap-3">
              <Label htmlFor="phone">Phone Number</Label>
              <Input readOnly id="phone" value={detailCustomer?.phone ?? "-"} />
            </div>

            <div className="flex flex-col gap-3">
              <Label htmlFor="mobilePhone">Mobile Phone Number</Label>
              <Input
                readOnly
                id="mobilePhone"
                value={detailCustomer?.mobilePhone ?? "-"}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Label htmlFor="npwp">NPWP</Label>
            <Input readOnly id="npwp" value={detailCustomer?.npwp ?? "-"} />
          </div>

          <div className="flex flex-col gap-3">
            <Label htmlFor="address">Address</Label>
            <Input
              readOnly
              id="address"
              value={detailCustomer?.address ?? "-"}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="companyType">Company Type</Label>
              <Input
                readOnly
                id="companyType"
                value={detailCustomer?.companyType ?? "-"}
              />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="area">Company Type</Label>
              <Input readOnly id="area" value={detailCustomer?.area ?? "-"} />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Label htmlFor="email">Email</Label>
            <Input readOnly id="email" value={detailCustomer?.email ?? "-"} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="provinceCode">Province Code</Label>
              <Input
                readOnly
                id="provinceCode"
                value={detailCustomer?.province.code ?? "-"}
              />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="provinceName">Province Code</Label>
              <Input
                readOnly
                id="provinceName"
                value={detailCustomer?.province.name ?? "-"}
              />
            </div>

            <div className="flex flex-col gap-3">
              <Label htmlFor="cityCode">City Code</Label>
              <Input
                readOnly
                id="cityCode"
                value={detailCustomer?.city.code ?? "-"}
              />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="cityName">City Name</Label>
              <Input
                readOnly
                id="cityName"
                value={detailCustomer?.city.name ?? "-"}
              />
            </div>

            <div className="flex flex-col gap-3">
              <Label htmlFor="groupCode">Group Code</Label>
              <Input
                readOnly
                id="groupCode"
                value={detailCustomer?.group.code ?? "-"}
              />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="groupName">Group Name</Label>
              <Input
                readOnly
                id="groupName"
                value={detailCustomer?.group.name ?? "-"}
              />
            </div>

            <div className="flex flex-col gap-3">
              <Label htmlFor="status">Status</Label>
              <Input
                readOnly
                id="status"
                value={detailCustomer?.status ?? "-"}
              />
            </div>

            <div className="flex flex-col gap-3">
              <Label htmlFor="target">Target</Label>
              <Input
                readOnly
                id="target"
                value={detailCustomer?.target ?? "-"}
              />
            </div>

            <div className="flex flex-col gap-3">
              <Label htmlFor="achievement">Achievement</Label>
              <Input
                readOnly
                id="achievement"
                value={detailCustomer?.achievement ?? "-"}
              />
            </div>

            <div className="flex flex-col gap-3">
              <Label htmlFor="percentage">Percentage</Label>
              <Input
                readOnly
                id="percentage"
                value={detailCustomer?.percentage ?? "-"}
              />
            </div>
          </div>
        </div>
      </div>
    </DrawerContent>
  );
};

export default CustomerDetail;
