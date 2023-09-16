import { format } from "date-fns"
import ptBR from "date-fns/locale/pt-BR"
import { CalendarIcon } from "lucide-react"
import { AlertOctagon } from "lucide-react"
import moment from "moment"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { UploadFileResponse } from "uploadthing/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Minus } from "@styled-icons/boxicons-regular/Minus"
import { Plus } from "@styled-icons/boxicons-regular/Plus"
import { cn } from "@/lib/utils"
import { HomeLayout } from "@/components/layouts/home-layout/HomeLayout"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { UploadFileCarousel } from "@/components/upload-file/components/carousel/UploadFileCarousel"
import { usePosts } from "@/hooks/use-posts/usePosts"
import {
  CreatePostFormOutput,
  CreatePostFormInput,
  createPostFormSchema,
} from "@/actions/create-post/schema-form"
import { queryClient } from "@/services/queryClient"

type MediaString = Record<string, string>

export default function NewPostPage() {
  const { getCreatePostMutation } = usePosts()
  const { mutateAsync: mutateAsyncCreatePost, isLoading: isLoadingCreatePost } =
    getCreatePostMutation({
      onSuccess: async () => {
        queryClient.invalidateQueries(["posts"])
        reset()
      },
    })

  const form = useForm<
    CreatePostFormInput & {
      medias_url: UploadFileResponse[]
    }
  >({
    defaultValues: {
      announcement_date: moment().add(7, "days").toDate(),
      medias_url: [],
      price: "",
      text: "",
      title: "",
    },
    resolver: zodResolver(createPostFormSchema),
    mode: "onTouched",
  })

  const { handleSubmit, reset } = form

  const submitHandler: SubmitHandler<CreatePostFormInput> = async formData => {
    const form = formData as unknown as CreatePostFormOutput
    await mutateAsyncCreatePost({ form })
  }

  return (
    <HomeLayout>
      <div className="w-full max-w-[560px] h-[calc(100dvh_-_52px)] overflow-y-scroll bg-white mx-auto scroll-thin">
        <div className="p-6 flex items-center justify-between">
          <button className="py-1.5 rounded-lg px-5 bg-black text-white flex items-center justify-center">
            <span>Voltar</span>
          </button>
          <button
            className={cn(
              "py-1.5 rounded-lg px-5 bg-emerald-500 text-white flex items-center justify-center",
              {
                "bg-emerald-600 text-neutral-300": isLoadingCreatePost,
              }
            )}
            type="submit"
            form="new_post_form"
            disabled={isLoadingCreatePost}
          >
            <span>{isLoadingCreatePost ? "Publicando" : "Publicar"}</span>
          </button>
        </div>
        <div className="px-6">
          <div className="pl-3 pt-3">
            <div className="relative py-2 leading-none px-4 rounded-md bg-red-100 border border-red-500">
              <div className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 h-6 w-6 rounded-full grid place-items-center bg-red-500">
                <AlertOctagon
                  size={14}
                  className="text-white"
                />
              </div>
              <h1 className="text-red-900">
                Campos com valores troll resultarão na rejeição do post.
              </h1>
            </div>
          </div>
        </div>
        <Form {...form}>
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="flex flex-col gap-3 p-6 pb-24"
            id="new_post_form"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input
                      type="title"
                      className="peer border-neutral-500 bg-white px-3 h-11 rounded-lg focus:outline-1 focus:outline-offset-1 focus:outline-blue-600 focus:outline-double ring-0"
                      placeholder="Insira o título do seu post aqui..."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="peer-focus:opacity-100 opacity-0 transition-all duration-200 peer-focus:translate-y-0 translate-y-2 ease-in-out">
                    Esse será o texto principal mostrado à outros usuários.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea
                      className="peer border-neutral-500 bg-white px-3 rounded-lg focus:outline-1 focus:outline-offset-1 focus:outline-blue-600 focus:outline-double ring-0"
                      {...field}
                      placeholder="Descrição do seu post..."
                    />
                  </FormControl>
                  <FormDescription className="peer-focus:opacity-100 opacity-0 transition-all duration-200 peer-focus:translate-y-0 translate-y-2 ease-in-out">
                    Texto com detalhes sobre o produto, forneça o máximo de informações sobre o seu
                    produto aqui.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="medias_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Imagens do produto</FormLabel>
                  <FormControl>
                    <UploadFileCarousel<CreatePostFormInput>
                      formField="medias_url"
                      endpoint="newPostMedias"
                      containerClassname="peer"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription
                    className={cn(
                      "transition-all duration-200 ease-in-out",
                      `
                    translate-y-2 
                    opacity-0 
                    peer-focus-within:opacity-100
                    peer-focus-within:translate-y-0
                  `
                    )}
                  >
                    Fotos do estado do produto.{" "}
                    <strong>
                      Seu post será rejeitado caso tenha imagens que não tenham relação com o
                      produto ou que não se alinhem com os valores da Auction App.
                    </strong>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="299,90"
                      className=" peer border-neutral-500 bg-white px-3 h-11 rounded-lg focus:outline-1 focus:outline-offset-1 focus:outline-blue-600 focus:outline-double ring-0"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="peer-focus:opacity-100 opacity-0 transition-all duration-200 peer-focus:translate-y-0 translate-y-2 ease-in-out">
                    O valor que você deseja vender esse produto.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="announcement_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de anúncio</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "peer w-full pl-3 text-left font-normal border-neutral-500 bg-white px-3 h-11 rounded-lg focus:outline-1 focus:outline-offset-1 focus:outline-blue-600 focus:outline-double ring-0",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP", { locale: ptBR })
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto p-0 border-neutral-500"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={date => moment(date).isBefore(moment().add(3, "days"))}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormDescription className="peer-focus:opacity-100 opacity-0 transition-all duration-200 peer-focus:translate-y-0 translate-y-2 ease-in-out">
                    Defina a data de encerramento do post, onde será anunciado o vencedor.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </HomeLayout>
  )
}

type RowButtonPropsAction = "add" | "remove"

interface RowButtonProps {
  onClickHandle: (mediaString?: MediaString) => void
  mediaString: MediaString
  action: RowButtonPropsAction
}

const RowButton: React.FC<RowButtonProps> = ({ onClickHandle, mediaString, action }) => {
  const isAdd = action === "add"
  const iconProps = {
    width: 16,
    height: 16,
  }

  const icon: Record<RowButtonPropsAction, JSX.Element> = {
    add: <Plus {...iconProps} />,
    remove: <Minus {...iconProps} />,
  }

  return (
    <button
      type="button"
      onClick={() => (mediaString ? onClickHandle(mediaString) : onClickHandle())}
      className={cn("p-2 rounded-lg flex items-center leading-none justify-center", {
        "bg-emerald-100 text-emerald-500": isAdd,
        "bg-red-100 text-red-500": !isAdd,
      })}
    >
      <p className="my-auto">{icon[action]}</p>
    </button>
  )
}