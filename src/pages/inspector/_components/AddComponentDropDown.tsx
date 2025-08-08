import { DropdownMenu } from "@/components/Dropdown";
import React from "react";

type AddComponentDropDownProps = {
  children: React.ReactNode;
};

export default function AddComponentDropDown({ children }: AddComponentDropDownProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>{children}</DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item>
          <p>Hi</p>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
