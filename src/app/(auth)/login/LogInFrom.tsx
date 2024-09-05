"use client";

import { LoginValues, SignUpValues, loginSchema, signUpSchema } from "@/lib/validation";
import { useForm } from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { login } from "./actions";
import { PasswordInput } from "@/components/PasswordInput";
import LoadingButton from "@/components/LoadingButton";
export default function SignUpForm() {

    const [error, setError] = useState<string>();
    
    const [isPending, startTransition] = useTransition();

    const form = useForm<LoginValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: ""
        }
    });

    async function onSubmit(values: LoginValues){
        setError(undefined);
        startTransition(async () => {
            const {error} = await login(values);
            if(error) setError(error);
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                {error && <p className="text-center text-destructive">{error}</p>}
                <FormField
                    control={form.control}
                    name="username"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="Username" {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                ></FormField>

                <FormField
                    control={form.control}
                    name="password"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <PasswordInput placeholder="Password" {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                ></FormField>
                <LoadingButton loading={isPending} type="submit" className="w-full">Log in</LoadingButton>
            </form>
        </Form>
    )
}