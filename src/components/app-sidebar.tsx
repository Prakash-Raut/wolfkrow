"use client";

import {
  ClockIcon,
  CreditCardIcon,
  FolderIcon,
  KeyIcon,
  LogOutIcon,
  StarIcon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

// Menu items.
const menuItems = [
  {
    title: "Home",
    items: [
      {
        title: "Workflows",
        icon: FolderIcon,
        url: "/workflows",
      },
      {
        title: "Credentials",
        icon: KeyIcon,
        url: "/credentials",
      },
      {
        title: "Executions",
        icon: ClockIcon,
        url: "/executions",
      },
    ],
  },
];

export function AppSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleUpgradeAccount = () => {};

  const handleBilling = () => {};

  const handleSignout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link href="/workflows" prefetch>
              <Image
                src="/logo/wolfkrow.svg"
                alt="WolfKrow AI"
                width={25}
                height={25}
              />
              <span className="text-lg font-semibold">WolfKrow</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarHeader>
      <SidebarContent>
        {menuItems.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      isActive={
                        item.url === "/"
                          ? pathname === item.url
                          : pathname.startsWith(item.url)
                      }
                      className="gap-x-4 h-10 px-4"
                      asChild
                    >
                      <Link href={item.url} prefetch>
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuItem>
          <SidebarMenuButton
            tooltip="Upgrade to pro"
            className="gap-x-4 h-10 px-4"
            onClick={handleUpgradeAccount}
          >
            <StarIcon className="size-4" />
            <span>Upgrade to Pro</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton
            tooltip="Billing Portal"
            className="gap-x-4 h-10 px-4"
            onClick={handleBilling}
          >
            <CreditCardIcon className="size-4" />
            <span>Billing Portal</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton
            tooltip="Sign out"
            className="gap-x-4 h-10 px-4"
            onClick={handleSignout}
          >
            <LogOutIcon className="size-4" />
            <span>Sign out</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarFooter>
    </Sidebar>
  );
}
