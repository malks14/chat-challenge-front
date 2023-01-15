import * as Menu from '@radix-ui/react-context-menu';

interface ContextMenuProps {
  children: React.ReactNode;
  menuComponent: React.ReactNode;
}

export default function ContextMenu(contextMenuProps: ContextMenuProps) {
  const { children, menuComponent } = contextMenuProps;

  return (
    <Menu.Root>
      <Menu.Trigger asChild>{children}</Menu.Trigger>

      <Menu.Portal>
        <Menu.Content asChild>{menuComponent}</Menu.Content>
      </Menu.Portal>
    </Menu.Root>
  );
}
