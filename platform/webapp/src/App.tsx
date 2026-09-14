import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes, useParams } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Shell } from "./components/Shell";
import { ROLE_HOME, type Role } from "./lib/roles";
import {
  BuyerHomePage,
  CataloguePage,
  ComposerPage,
  DisputesPage,
  GrantsPage,
  JobDetailPage,
  JobsPage,
  PocwPage,
  PolicyPage,
  ProviderPage,
  PublicPocwViewerPage,
  PublisherPage,
  StatementsPage,
} from "./app/pages";
import "./styles/bazaar.css";

const qc = new QueryClient();

function JobDetailRoute() {
  const { jobId } = useParams();
  return <JobDetailPage jobId={jobId!} />;
}

function PublicPocwRoute() {
  const { attestationId } = useParams();
  return <PublicPocwViewerPage attestationId={attestationId!} />;
}

function AppRoutes() {
  const [role, setRole] = useState<Role>(() => {
    return (localStorage.getItem("cogbazaar.role") as Role) || "buyer";
  });

  useEffect(() => {
    localStorage.setItem("cogbazaar.role", role);
  }, [role]);

  return (
    <Routes>
      <Route path="/public/pocw/:attestationId" element={<PublicPocwRoute />} />
      <Route
        path="*"
        element={
          <Shell
            role={role}
            onRoleChange={(r) => {
              setRole(r);
              window.location.href = ROLE_HOME[r];
            }}
          >
            <Routes>
              <Route path="/" element={<BuyerHomePage />} />
              <Route path="/catalogue" element={<CataloguePage />} />
              <Route path="/composer" element={<ComposerPage />} />
              <Route path="/jobs" element={<JobsPage />} />
              <Route path="/jobs/:jobId" element={<JobDetailRoute />} />
              <Route path="/pocw" element={<PocwPage />} />
              <Route path="/statements" element={<StatementsPage />} />
              <Route path="/provider" element={<ProviderPage />} />
              <Route path="/publisher" element={<PublisherPage />} />
              <Route path="/grants" element={<GrantsPage />} />
              <Route path="/policy" element={<PolicyPage />} />
              <Route path="/disputes" element={<DisputesPage />} />
              <Route path="*" element={<Navigate to={ROLE_HOME[role]} replace />} />
            </Routes>
          </Shell>
        }
      />
    </Routes>
  );
}

export function App() {
  return (
    <QueryClientProvider client={qc}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
