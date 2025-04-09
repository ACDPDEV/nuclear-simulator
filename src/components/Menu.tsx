import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { MenuIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { usePropertiesSimulation } from "../context/PropertiesContext";
import { useTimerDispatch } from "../context/TimeContext";

const calculateTissueWeight = (tissueType: string) => {
  switch (tissueType) {
    case "redBoneMarrow":
      return 0.12;
    case "lungs":
      return 0.12;
    case "stomach":
      return 0.12;
    case "breast":
      return 0.12;
    case "colon":
      return 0.12;
    case "liver":
      return 0.05;
    case "thyroid":
      return 0.04;
    case "skin":
      return 0.01;
    case "boneSurface":
      return 0.01;
    case "others":
      return 0.12;
  }
};

const formSchema = z.object({
  emmisorType: z
    .string()
    .regex(/enrichedUranium|irradiatedUranium/, "Opción inválida"),
  mass: z.string().regex(/[0-9]+(\.[0-9]+)?/, "El valor debe ser numérico"),
  tissueType: z
    .string()
    .regex(
      /redBoneMarrow|lungs|stomach|breast|colon|liver|thyroid|skin|boneSurface|others/,
      "Opción inválida"
    ),
  regenerationFactor: z
    .string()
    .regex(/[0-9]+(\.[0-9]+)?/, "El valor debe ser numérico"),
});

export function Menu() {
  const { setConfig } = usePropertiesSimulation();
  const dispatch = useTimerDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const resetTimer = () => {
    dispatch({ type: "RESET" });
  };

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    const emmisorType = values.emmisorType as
      | "enrichedUranium"
      | "irradiatedUranium";
    const mass = Number(values.mass);
    const tissueWeight = calculateTissueWeight(values.tissueType) as number;
    const regenerationFactor = Number(values.regenerationFactor);

    setConfig({
      emmisorType,
      mass,
      tissueWeight,
      regenerationFactor,
    });

    resetTimer();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <MenuIcon className="w-6 h-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar propiedades de la simulación</DialogTitle>
          <DialogDescription>
            Haz tus cambios aquí. Haz click en guardar cuando termines.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="emmisorType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cápsula del reactor</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleciona una opción" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="enrichedUranium">
                        Uranio enriquecido al 5%
                      </SelectItem>
                      <SelectItem value="irradiatedUranium">
                        Uranio irradiado
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mass"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Masa del tejido</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="eg: 23, 4e2, 1e-6"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tissueType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de tejido</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleciona una opción" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="redBoneMarrow">
                        Médula osea roja (0.12)
                      </SelectItem>
                      <SelectItem value="lungs">Pulmones (0.12)</SelectItem>
                      <SelectItem value="stomach">Estómago (0.12)</SelectItem>
                      <SelectItem value="breast">Mama (0.12)</SelectItem>
                      <SelectItem value="colon">Colon (0.12)</SelectItem>
                      <SelectItem value="liver">Hígado (0.05)</SelectItem>
                      <SelectItem value="thyroid">Tiroides (0.04)</SelectItem>
                      <SelectItem value="skin">Piel (0.01)</SelectItem>
                      <SelectItem value="boneSurface">
                        Superficie Ósea (0.01)
                      </SelectItem>
                      <SelectItem value="others">
                        Otros tejidos (0.12)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="regenerationFactor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Factor de regeneración</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="eg: 1, 0.5, 0.25"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogClose>
              <Button type="submit">Guardar</Button>
            </DialogClose>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
