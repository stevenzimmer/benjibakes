"use client";
import {useState} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {CalendarIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import {format} from "date-fns";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Textarea} from "@/components/ui/textarea";
import {useToast} from "@/hooks/use-toast";
import {Calendar} from "@/components/ui/calendar";

import {Input} from "@/components/ui/input";

const formSchema = z.object({
    username: z
        .string()
        .min(2)
        .max(50),
    eventDate: z.date({
        required_error: "A date for the event is required.",
    }),
    email: z.string().email(),
    details: z
        .string()
        .min(20, {
            message:
                "Please provide a little bit more details about your catering needs.",
        })
        .max(400, {
            message: "Please provide a little bit less details.",
        }),
});

export default function CateringForm() {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            details: "",
        },
    });

    const [formCompleted, setFormCompleted] = useState(false);
    const [loading, setIsLoading] = useState(false);
    const {toast} = useToast();

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log({values});

        setIsLoading(true);

        const res = await fetch("/api/catering-request", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        });

        const {error} = await res.json();

        if (error) {
            // setCheckoutError(error);
            console.log({error});
            return;
        }

        setFormCompleted(true);
        setIsLoading(false);
        toast({
            title: "Success",
            description: "Your catering request has been submitted.",
        });
    }
    return (
        <Form {...form}>
            {!formCompleted ? (
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <FormField
                        control={form.control}
                        name="username"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="font-semibold">
                                    Your name
                                </FormLabel>
                                <FormControl>
                                    <Input className="bg-white" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="font-semibold">
                                    Your email address
                                </FormLabel>
                                <FormControl>
                                    <Input className="bg-white" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="eventDate"
                        render={({field}) => (
                            <FormItem className="flex flex-col">
                                <FormLabel className="font-semibold">
                                    Date of your event
                                </FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={`
                                                "w-[240px] pl-3 text-left font-normal ${!field.value &&
                                                    "text-muted-foreground"}
                                            `}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>
                                                        Select your event date
                                                    </span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className="w-auto p-0"
                                        align="start"
                                    >
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date < new Date() ||
                                                date < new Date("1900-01-01")
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="details"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="font-semibold">
                                    Catering details
                                </FormLabel>
                                <FormControl>
                                    <Textarea
                                        rows={5}
                                        placeholder="Let us know what catering options you're interested in."
                                        className="resize-none bg-white"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        className="disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed group text-white font-semibold py-6 hover:text-white text-base md:text-lg flex justify-end bg-bb-brown hover:bg-bb-brown/90 shadow-lg"
                        variant="ghost"
                        type="submit"
                        disabled={loading}
                    >
                        Submit catering request{" "}
                        {loading && (
                            <svg
                                className="animate-spin ml-2 h-5 w-5 text-bb-blue"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                        )}
                    </Button>
                </form>
            ) : (
                <div>
                    <h3 className="text-xl font-semibold text-center mb-3">
                        Thank you for considering us for your event!
                    </h3>
                    <p>
                        We will get back to you within 24 hours to discuss
                        options, pricing and delivery. We look forward to making
                        your event much sweeter!
                    </p>
                </div>
            )}
        </Form>
    );
}
