import { Button } from "./ui/button";
import { X } from "lucide-react";
import { Input } from "./ui/input";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/Redux/store";
import { CloseButton } from "@/Redux/reducers/EditToggle";
import axios from "axios";
import { toast } from "sonner";
import React from "react";

export default function Edit() {
  const Toggle = useSelector((state: any) => state.EditToggle.Toggle);
  const Data = useSelector((state: any) => state.EditToggle.data);
  const dispatch = useDispatch<AppDispatch>();
  const name = React.useRef<HTMLInputElement>(null);
  const location = React.useRef<HTMLInputElement>(null);

  async function UpdateList(id: number) {
    if (!name.current?.value || !location.current?.value) {
      toast("All fields are required");
      return;
    }
    await axios
      .patch(`http://localhost:3000/company/${id}`, {
        name: name.current?.value,
        location: location.current?.value,
      })
      .then(() => {
        toast.success("Data Updated");
      });
  }

  return (
    <div
      className={`${
        Toggle ? "block" : "hidden"
      } absolute inset-0 w-full h-screen backdrop-blur-sm flex justify-center items-center`}
    >
      <div className="relative w-4/12 h-auto bg-black border-white p-4 rounded-lg shadow-md">
        <Button
          variant="default"
          size="icon"
          className="absolute right-2 top-2 rounded-full"
          onClick={() => {
            dispatch(CloseButton());
          }}
        >
          <X />
        </Button>
        <div className="w-full pt-2 pb-6">
          <span className="text-3xl font-bold tracking-tight">Edit Form</span>
        </div>
        <div className="grid gap-4">
          <Input placeholder="id" defaultValue={Data.id} />
          <Input placeholder="name" defaultValue={Data.name} ref={name} />
          <Input
            placeholder="location"
            defaultValue={Data.location}
            ref={location}
          />
          <Button
            onClick={() => {
              UpdateList(Data.id);
              dispatch(CloseButton());
            }}
          >
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
}
