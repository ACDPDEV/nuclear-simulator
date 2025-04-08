import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Definir el esquema de validación con Zod
const formSchema = z.object({
  capsuleType: z.enum(["Uranio enriquecido", "Uranio irradiado"], {
    errorMap: () => ({ message: "Selecciona un tipo de cápsula válido." }),
  }),
  mass: z.number().min(1, "La masa debe ser mayor a 0."),
  tissueWeight: z.number().min(1, "El peso tisular debe ser mayor a 0."),
  errorMargin: z.number().min(0, "El margen de error no puede ser negativo."),
});

const CapsuleFormDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Inicializar React Hook Form
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      capsuleType: "Uranio enriquecido",
      mass: 0,
      tissueWeight: 0,
      errorMargin: 0,
    },
  });

  // Manejar el envío del formulario
  const onSubmit = (data: any) => {
    // Aquí puedes manejar los datos del formulario
    console.log(data);
    // Cerrar el diálogo después de enviar
    setIsDialogOpen(false);
  };

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button>Configurar Cápsula</Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Configuración de Cápsula</DialogTitle>
          </DialogHeader>

          <Form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={control}
              name="capsuleType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de cápsula</FormLabel>
                  <FormControl>
                    <Select {...field}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Uranio enriquecido">
                          Uranio enriquecido
                        </SelectItem>
                        <SelectItem value="Uranio irradiado">
                          Uranio irradiado
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage>{errors.capsuleType?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="mass"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Masa (g)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Masa de la cápsula"
                      {...field}
                      className={errors.mass ? "border-red-500" : ""}
                    />
                  </FormControl>
                  <FormMessage>{errors.mass?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="tissueWeight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Peso tisular (g)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Peso tisular"
                      {...field}
                      className={errors.tissueWeight ? "border-red-500" : ""}
                    />
                  </FormControl>
                  <FormMessage>{errors.tissueWeight?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="errorMargin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Margen de error (%)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Margen de error"
                      {...field}
                      className={errors.errorMargin ? "border-red-500" : ""}
                    />
                  </FormControl>
                  <FormMessage>{errors.errorMargin?.message}</FormMessage>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit">Enviar</Button>
              <Button type="button" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
            </DialogFooter>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CapsuleFormDialog;
