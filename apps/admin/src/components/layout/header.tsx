'use client';

import * as Avatar from '@radix-ui/react-avatar';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { LogOut, Settings, User } from 'lucide-react';

export function Header() {
  return (
    <header className="border-input flex h-16 items-center justify-between border-b px-6">
      <span className="text-muted-foreground text-sm">Dashboard</span>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className="focus-visible:ring-ring flex items-center gap-2 rounded-full focus-visible:outline-none focus-visible:ring-2">
            <Avatar.Root className="bg-accent flex h-9 w-9 items-center justify-center overflow-hidden rounded-full">
              <Avatar.Fallback className="text-sm font-medium">U</Avatar.Fallback>
            </Avatar.Root>
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            align="end"
            sideOffset={8}
            className="border-input bg-background min-w-48 rounded-md border p-1 shadow-md"
          >
            <DropdownMenu.Item className="hover:bg-accent flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none">
              <User className="h-4 w-4" />
              Profile
            </DropdownMenu.Item>
            <DropdownMenu.Item className="hover:bg-accent flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none">
              <Settings className="h-4 w-4" />
              Settings
            </DropdownMenu.Item>
            <DropdownMenu.Separator className="bg-input my-1 h-px" />
            <DropdownMenu.Item className="text-destructive hover:bg-accent flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none">
              <LogOut className="h-4 w-4" />
              Sign out
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </header>
  );
}
