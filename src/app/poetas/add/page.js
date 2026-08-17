'use client'
import { TextField,Box,FormControl,Button } from "@mui/material";
export default function addPoetaPage(){
  return <Box className={'shadow p-4'}>
<form method={'POST'} action={'/poetas/add/action'} enctype="multipart/form-data">
    <TextField name='nombre'/>
    <TextField name='apellidos'/>
    <TextField name='nacionalidad'/>
    <TextField name='fecha_nacimiento' type='date'/>
    <TextField name='fechafallecimiento' type='date'/>
    <TextField name='Biografia'/>
    <Button type={'submit'}>Enviar</Button>
    </form>
    </Box>
}