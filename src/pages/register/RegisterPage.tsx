import React from "react";
import { UserLayout } from "../../layouts/UserLayout";
import { RegisterForm } from "./RegisterForm";

export const RegisterPage: React.FC = () => {
    return <UserLayout>
        <RegisterForm />
    </UserLayout>
}