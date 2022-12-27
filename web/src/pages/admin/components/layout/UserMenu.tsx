import { Avatar, Menu } from "@mantine/core";
import { Icon } from "@trampo/ui/icon";
import { useAuth } from "../../auth";

export const UserMenu = () => {
  const { user, logout } = useAuth();

  return (
    <Menu>
      <Menu.Target>
        <Avatar color="indigo" component="button" style={{ cursor: "pointer" }}>
          {user ? user.firstname.charAt(0) + user.lastname.charAt(0) : "??"}
        </Avatar>
      </Menu.Target>

      <Menu.Dropdown>
        {user && (
          <Menu.Label>{user.firstname + " " + user.lastname}</Menu.Label>
        )}
        <Menu.Item
          onClick={logout}
          icon={<Icon icon="logout" fontset="outlined" />}>
          Déconnexion
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
