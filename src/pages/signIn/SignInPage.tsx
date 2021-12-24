import React from "react";
import { UserLayout } from "../../layouts/UserLayout";
import { SignInForm } from "./SignInForm";

export const SignInPage: React.FC = () => {
    return <UserLayout>
        <SignInForm />
    </UserLayout>
}