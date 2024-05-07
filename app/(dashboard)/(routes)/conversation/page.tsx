'use client';

import * as z from 'zod';

import axios from "axios";

import React, {useState} from "react";
import Heading from "@/components/heading";
import {MessageSquare} from "lucide-react";
import {useForm} from "react-hook-form";

import {formSchema} from "./constants";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
// @ts-ignore
import {ChatCompletionUserMessageParam} from "openai/src/resources/chat/completions";


const ConversationPage = () => {

    const router = useRouter();

    const [messages, setMessages] = useState<ChatCompletionUserMessageParam[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ''
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmitForm = async (values: z.infer<typeof formSchema>) => {
        try {
            const userMessage: ChatCompletionUserMessageParam = {
                role: "user",
                content: values.prompt
            };
            const newMessages = [...messages, userMessage];
            const response = await axios.post("/api/conversation", {
                messages: "hello"
            });

            console.log(response);
            console.log(response.data);

            setMessages((current) => [...current, userMessage, response.data]);
            form.reset();
        } catch (error: any) {
            // Todo: OPEN PRO MODEL
            console.error(`Error: ${error}`);
        } finally {
            router.refresh();
        }
    }

    return (
        <div>
            <Heading title="Conversation" description="our most advanced conversation model" icon={MessageSquare}
                     iconColor="text-violet-500" bgColor="bg-violet-500/10"/>
            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmitForm)}
                              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within shadow-sm grid grid-cols-12 gap-2">
                            <FormField
                                name="prompt"
                                render={({field}) => (
                                    <FormItem
                                        className="col-span-12 lg:col-span-10"
                                    >
                                        <FormControl className="m-0 p-0">
                                            <Input
                                                className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                                disabled={isLoading}
                                                placeholder="How do I calculate the radius of the earth?"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
                                Generate
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className="space-y-4 mt-4">
                    <div className="flex flex-col-reverse gap-y-4">
                        {messages.map((message) => (
                            <div key={message.content}>
                                {message.content}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConversationPage;
