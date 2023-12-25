import { TextField, Typography, Button } from '@mui/material';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Section, Container, Card,
} from '../FormStyled';
import { useSignupMutation } from '../../../store/slices/ApiSlices';
import { Messages } from '../../../utils/messages';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../../store/slices/AuthSlice';

const formSchema = z.object({
  name: z
    .string()
    .min(2, Messages.NAME_MIN_LENGTH_ERROR)
    .max(20, Messages.NAME_MAX_LENGTH_ERROR),
  email: z
    .string()
    .email(Messages.EMAIL_INVALID_ERROR),
  password: z
    .string()
    .min(6, Messages.PASSWORD_MIN_LENGTH_ERROR),
  confirmPassword: z
    .string()
    .min(6, Messages.CONFIRM_PASSWORD_MIN_LENGTH_ERROR),
}).refine((data) => data.password === data.confirmPassword, {
  message: Messages.PASSWORDS_NOT_MATCH_ERROR,
  path: ['confirmPassword'],
});

type FormSchema = z.infer<typeof formSchema>;

export function Signup() {
  const navigate = useNavigate();
  const [signup] = useSignupMutation();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, isSubmitting, errors },
  } = useForm<FormSchema>({ resolver: zodResolver(formSchema) });

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    try {
      const accessToken = (await signup(data).unwrap()).accessToken;
      console.log(accessToken);
      let token_string = accessToken.toString();
      token_string = token_string.slice(0, token_string.lastIndexOf(".")).slice(token_string.indexOf(".") + 1, token_string.length);
      console.log(token_string);
      const res = JSON.parse(atob(token_string)); 
      console.log(res);
      dispatch(setCredentials({ user: {name: data.name, role: res.role}, accessToken: token_string}));
      navigate('/');  
    } catch (err) {
      setErrorMessage("Такой пользователь уже есть");      
    }   
  };


  return (
    <Section>
      <Container>
        <Card>
          <Typography variant="h4" gutterBottom>Создание аккаунта</Typography>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
              {...register('name')}
              error={!!errors.name}
              helperText={errors.name?.message}
              label="Имя пользователя"
              type="text"
              id="username"
              variant="outlined"
              fullWidth
              margin="normal"
              autoComplete="off"
            />

            <TextField
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
              label="Адрес электронной почты"
              type="email"
              id="email"
              variant="outlined"
              fullWidth
              margin="normal"
              autoComplete="off"
            />

            <TextField
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
              label="Пароль"
              type="password"
              id="password"
              variant="outlined"
              fullWidth
              margin="normal"
              autoComplete="off"
            />

            <TextField
              {...register('confirmPassword')}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message || errorMessage}
              label="Подтверждение пароля"
              type="password"
              id="confirmPassword"
              variant="outlined"
              fullWidth
              margin="normal"
              autoComplete="off"
            />

            <Button
              type="submit"
              variant="contained"
              disabled={!isDirty || isSubmitting}
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Создать аккаунт
            </Button>

            <Button
              type="button"
              variant="outlined"
              disabled={!isDirty || isSubmitting}
              color="secondary"
              fullWidth
              onClick={() => reset()}
              sx={{ my: 2 }}
            >
              Очистить поля
            </Button>
          </form>
          <Typography variant="body1">
            Есть аккаунт?
            <Link to="/login">
              Войти
            </Link>
          </Typography>
        </Card>
      </Container>
    </Section>
  );
}