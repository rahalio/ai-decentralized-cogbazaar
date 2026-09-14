import { NavLink } from "react-router-dom";
import type { Role } from "../lib/roles";

const NAV: Record<Role, Array<{ to: string; label: string }>> = {
  buyer: [
    { to: "/", label: "Buyer home" },
    { to: "/catalogue", label: "Catalogue" },
    { to: "/composer", label: "Job composer" },
    { to: "/jobs", label: "Jobs" },
    { to: "/pocw", label: "PoCW" },
    { to: "/statements", label: "Statements" },
    { to: "/disputes", label: "Disputes" },
  ],
  provider: [
    { to: "/provider", label: "Matched jobs" },
    { to: "/catalogue?aisle=compute", label: "Compute offers" },
    { to: "/pocw", label: "PoCW submissions" },
    { to: "/statements", label: "Payouts" },
  ],
  publisher: [
    { to: "/publisher", label: "Kernel royalties" },
    { to: "/catalogue?aisle=kernel", label: "Kernel listings" },
    { to: "/statements", label: "Royalty ledger" },
  ],
  fundAdmin: [
    { to: "/grants", label: "Grant pools" },
  ],
  compliance: [
    { to: "/policy", label: "Policy rules" },
    { to: "/policy?queue=dualUse", label: "Dual-use queue" },
    { to: "/policy?queue=agentCaps", label: "Agent caps" },
  ],
  operator: [
    { to: "/statements", label: "Statements" },
    { to: "/pocw", label: "Audit export" },
    { to: "/jobs", label: "Jobs" },
  ],
};

export function Shell({
  role,
  onRoleChange,
  children,
}: {
  role: Role;
  onRoleChange: (r: Role) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="wordmark">
          <span className="wordmark-seal">C</span>
          Cogbazaar
        </div>
        <div className="role-switch">
          <label htmlFor="role">Workspace</label>
          <select
            id="role"
            value={role}
            onChange={(e) => onRoleChange(e.target.value as Role)}
          >
            <option value="buyer">Research lead / Buyer</option>
            <option value="provider">Compute provider</option>
            <option value="publisher">Kernel publisher</option>
            <option value="fundAdmin">PoR fund admin</option>
            <option value="compliance">Compliance</option>
            <option value="operator">Platform operator</option>
          </select>
        </div>
        <nav className="nav">
          {NAV[role].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <p className="muted" style={{ fontSize: "0.75rem", marginTop: "auto" }}>
          Settle useful cognitive work
        </p>
      </aside>
      <main className="main">{children}</main>
    </div>
  );
}
