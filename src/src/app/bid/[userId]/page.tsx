"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/ui/button";
import ReactDatePicker from "react-datepicker";
import { Controller } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Wrapper } from "@/shared/wrapper/wrapper";
import { Briefcase, StarIcon, MapPin } from "lucide-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Textarea } from "@/shared/ui/textarea";

const servicePrices: Record<string, number> = {
  Электрик: 5000,
  Сантехник: 6000,
  "Натяжные потолки": 10000,
};

const formSchema = z.object({
  service: z.enum(["Электрик", "Натяжные потолки", "Сантехник"]),
  address: z.string().min(5, {
    message: "Адрес должен содержать не менее 5 символов",
  }),
  problem: z.string().min(5, {
    message: "Проблема должна содержать не менее 5 символов",
  }),
  description: z.string().min(5, {
    message: "Комментрий должен содержать не менее 5 символов",
  }),
  price: z.number(),
  date: z
    .preprocess((arg) => {
      if (typeof arg === "string" || arg instanceof Date) {
        return new Date(arg);
      }
      return arg;
    }, z.date())
    .transform((date) => formatDate(date)),
});

export function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}.${month}.${year} ${hours}:${minutes}`;
}

const CreateBid = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      service: "Электрик",
      address: "",
      problem: "",
      description: "",
      date: String(new Date()),
      price: 5000,
    },
  });

  const service = form.watch("service");

  useEffect(() => {
    const newPrice = servicePrices[service];
    form.setValue("price", newPrice);
  }, [service]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast.success("Заявка успешно отправлена");
  }

  return (
    <Wrapper className="pb-10">
      <div className="p-5 grid gap-5">
        <div className="flex gap-5">
          <Avatar className="w-30 h-30">
            <AvatarImage src="/person.png" alt="person" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="">
            <div className="text-2xl font-semibold pb-3">Имя Фамилия</div>
            <div className="flex gap-2 items-center">
              <MapPin size={16} />
              <div className="">Кокшетау</div>
            </div>
            <div className="flex gap-2 items-center">
              <StarIcon size={16} />
              <div className="">4.2</div>
            </div>
            <div className="flex gap-2 items-center">
              <Briefcase size={16} />
              <div className="">4 года</div>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="service"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Услуги</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите услугу" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Электрик">Электрик</SelectItem>
                        <SelectItem value="Сантехник">Сантехник</SelectItem>
                        <SelectItem value="Натяжные потолки">
                          Натяжные потолки
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    Укажите услугу которую хотите заказать
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Дата и время</FormLabel>
                  <FormControl>
                    <Controller
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <ReactDatePicker
                          selected={new Date(field.value)}
                          onChange={field.onChange}
                          showTimeSelect
                          dateFormat="dd.MM.yyyy HH:mm"
                          className="input-class border rounded px-3 py-2 w-full"
                          timeFormat="HH:mm"
                          timeIntervals={15}
                          placeholderText="Выберите дату и время"
                        />
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Адрес</FormLabel>
                  <FormControl>
                    <Input placeholder="Ул. Абая дом 3" {...field} />
                  </FormControl>
                  <FormDescription>Напиши свой адрес</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="problem"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Проблема</FormLabel>
                  <FormControl>
                    <Input placeholder="Не работает свет на кухни" {...field} />
                  </FormControl>
                  <FormDescription>Опишите свою проблему</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Цена</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Укажите цену"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Укажите удобную вам цену</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Комментарий</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Напишите, если есть особые инструкции"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Напишите комментарий к заказу
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Заказать</Button>
          </form>
        </Form>
      </div>
    </Wrapper>
  );
};

export default CreateBid;
