import { AuthProvider } from "@/app/context/AuthContext";

export default function RootServer({ children }: Readonly<{children: React.ReactNode}>) {
    return(
        <AuthProvider>
            {children}
        </AuthProvider>
    );
}