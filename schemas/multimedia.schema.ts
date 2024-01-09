import z from 'zod'

export const createMultimediaSchema = z.object({
  title: z.string().min(3, {
    message: 'El título debe tener al menos 3 caracteres'
  }),
  synopsis: z.string().min(3, {
    message: 'La sinopsis debe tener al menos 3 caracteres'
  }),
  year: z.string().min(4, {
    message: 'El año debe ser mayor a 1900'
  }),
  mediaType: z.number(),
  genres: z.array(z.number()).min(1, {
    message: 'Debes seleccionar al menos un género'
  }),
  poster: z.string().min(1, {
    message: 'El poster es obligatorio'
  }),
  thumb: z.string().min(1, {
    message: 'El thumbnail es obligatorio'
  }),
  file: z.string().min(1, {
    message: 'El archivo es obligatorio'
  }),
  duration: z.string().min(1, {
    message: 'La duración es obligatoria'
  }).optional(),
})