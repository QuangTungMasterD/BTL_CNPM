
import ProtectedPage from "@/ui/components/ProtectedPage";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <ProtectedPage>
      {children}
    </ProtectedPage>
  );
}
