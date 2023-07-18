import { Outlet } from 'umi';

export default function Layout() {
  return (
    <div style={{ padding: 20 }}>
      <Outlet />
    </div>
  );
}
