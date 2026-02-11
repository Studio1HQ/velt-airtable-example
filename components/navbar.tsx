"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Menu,
  Mail,
  Settings,
  User,
  CircleHelp as HelpCircle,
  ChevronDown,
} from "lucide-react";
import useTheme, { ThemeToggleButton } from "@/hooks/use-theme";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  VeltPresence,
  VeltNotificationsTool,
  VeltSidebarButton,
  VeltCommentsSidebar,
  useVeltClient,
} from "@veltdev/react";
import { names, userIds, useUserStore } from "@/helper/userdb";

const navItems = [
  { name: "Compose", icon: Mail },
  { name: "Settings", icon: Settings },
  { name: "Profile", icon: User },
  { name: "Help", icon: HelpCircle },
];

export function Navbar() {
  const { user, setUser } = useUserStore();
  const { client } = useVeltClient();
  const prevUserRef = useRef(user);
  const isInitializingRef = useRef(false);

  const predefinedUsers = useMemo(
    () =>
      userIds.map((uid, index) => {
        const avatarUrls = [
          "https://api.dicebear.com/7.x/pixel-art/svg?seed=Nany",
          "https://api.dicebear.com/7.x/pixel-art/svg?seed=Mary",
        ];
        return {
          uid: uid,
          displayName: names[index],
          email: `${names[index].toLowerCase()}@gmail.com`,
          photoUrl: avatarUrls[index],
        };
      }),
    [],
  );

  // Initialize user from localStorage if none exists
  useEffect(() => {
    if (typeof window !== "undefined" && !user) {
      const storedUser = localStorage.getItem("user-storage");
      if (!storedUser) {
        setUser(predefinedUsers[0]);
      }
    }
  }, [user, setUser, predefinedUsers]);

  // Handle Velt client initialization, user identification, and document setting
  useEffect(() => {
    if (!client || !user || isInitializingRef.current) {
      return;
    }

    const initializeVelt = async () => {
      isInitializingRef.current = true;
      try {
        prevUserRef.current = user;

        const veltUser = {
          userId: user.uid,
          organizationId: "organization_id",
          name: user.displayName,
          email: user.email,
          photoUrl: user.photoUrl,
        };
        await client.identify(veltUser);
        await client.setDocuments([
          {
            id: "email-composer-velt-demo",
            metadata: { documentName: "email-composer-velt-demo" },
          },
        ]);
      } catch (error) {
        console.error("Error initializing Velt:", error);
      } finally {
        isInitializingRef.current = false;
      }
    };

    initializeVelt();
  }, [client, user]);

  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  // Shared user-switcher dropdown (used in both desktop & mobile)
  const UserSwitcher = ({ compact = false }: { compact?: boolean }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={`flex items-center space-x-2 bg-white text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-200 dark:border dark:border-white/30 dark:!bg-[#121212] dark:hover:!bg-gray-700 ${compact ? "h-9 w-full justify-start" : "h-8"}`}
        >
          <Avatar className="w-5 h-5">
            <AvatarImage
              src={user?.photoUrl || "https://via.placeholder.com/100"}
              alt={user?.displayName || "User"}
            />
            <AvatarFallback className="text-xs">
              {user?.displayName}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm truncate max-w-[100px]">
            {user?.displayName}
          </span>
          <ChevronDown size={14} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-64 bg-white text-gray-600 dark:text-gray-400 dark:bg-[#121212] dark:border dark:border-white/30"
      >
        <DropdownMenuLabel>Select User</DropdownMenuLabel>
        <DropdownMenuSeparator className="dark:bg-white/40" />
        {predefinedUsers.map((currentUser) => (
          <DropdownMenuItem
            key={currentUser.uid}
            onClick={() => setUser(currentUser)}
            className="flex items-center space-x-3 p-3 cursor-pointer hover:!bg-gray-100 dark:hover:!bg-gray-700"
          >
            <Avatar className="w-8 h-8">
              <AvatarImage
                src={currentUser.photoUrl}
                alt={currentUser.displayName}
              />
              <AvatarFallback className="text-xs">
                {currentUser.displayName}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900 dark:text-white/70">
                {currentUser.displayName}
              </div>
              <div className="text-xs text-gray-500 dark:text-white/60">
                {currentUser.email}
              </div>
            </div>
            {user?.uid === currentUser.uid && (
              <div className="w-2 h-2 bg-blue-600 rounded-full" />
            )}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center space-x-2 text-blue-600 hover:dark:bg-[#515881]">
          <User size={16} />
          <span className="hover:dark:text-white/70">Manage Users</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <>
      {/* Velt Comments Sidebar — rendered outside the nav bar */}
      <VeltCommentsSidebar darkMode={theme === "dark"} />

      <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center justify-between px-4">
          {/* ─── Logo ─── */}
          <div className="flex items-center space-x-2">
            <Mail className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">MailCraft</span>
          </div>

          {/* ─── Desktop Navigation ─── */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Nav links */}
            {navItems.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                size="sm"
                className="flex items-center space-x-1.5 hover:bg-accent transition-colors"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Button>
            ))}
          </div>
          {/* Toolbar */}
          <div className="hidden md:flex flex items-center space-x-2">
            <UserSwitcher />
            <VeltPresence />
            <VeltNotificationsTool darkMode={theme === "dark"} />
            <ThemeToggleButton />
            <VeltSidebarButton darkMode={theme === "dark"} />
          </div>

          {/* ─── Mobile Navigation ─── */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggleButton />
            <VeltNotificationsTool darkMode={theme === "dark"} />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <Menu className="h-4 w-4" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[360px]">
                <div className="flex flex-col space-y-4 mt-6">
                  {/* Mobile header */}
                  <div className="flex items-center space-x-2 pb-4 border-b">
                    <Mail className="h-6 w-6 text-primary" />
                    <span className="font-bold text-xl">MailCraft</span>
                  </div>

                  {/* User switcher */}
                  <div className="pb-2">
                    <UserSwitcher compact />
                  </div>

                  {/* Nav links */}
                  {navItems.map((item) => (
                    <Button
                      key={item.name}
                      variant="ghost"
                      className="justify-start flex items-center space-x-3 h-11 text-base"
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </Button>
                  ))}

                  {/* Velt tools */}
                  <div className="border-t pt-4 flex items-center space-x-3">
                    <VeltPresence />
                    <VeltSidebarButton darkMode={theme === "dark"} />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </>
  );
}
