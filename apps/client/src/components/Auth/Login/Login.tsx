import { TextField, Typography, Button } from '@mui/material';
import z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver} from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useLoginMutation } from '../../../store/slices/ApiSlices';
import {
  Section, Container, Card,
} from '../FormStyled';
import { Messages } from '../../../utils/messages';

const formSchema = z
  .object({
    email: z.string().email(Messages.EMAIL_INVALID_ERROR),
    password: z.string().min(7, Messages.PASSWORD_MIN_LENGTH_ERROR).max(20, Messages.PASSWORD_MAX_LENGTH_ERROR),
  });

  type FormSchema = z.infer<typeof formSchema>;

export function Login() {
  const navigate = useNavigate();
  const [errorMessage] = useState('');
  const [login] = useLoginMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, isSubmitting, errors },
  } = useForm<FormSchema>({ resolver: zodResolver(formSchema) });

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
      const accessToken = (await login(data).unwrap()).accessToken;
      console.log(accessToken);
      let token_string = accessToken.toString();
      token_string = token_string.slice(0, token_string.lastIndexOf(".")).slice(token_string.indexOf(".") + 1, token_string.length);
      console.log(token_string);
      const res = atob(token_string); 
      console.log(res);

      navigate('/');    
  };

  return (
    <Section>
      <Container>
        <Card>
          <Typography variant="h4" gutterBottom>Войти в аккаунт</Typography>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>

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
              helperText={errors.password?.message || errorMessage}
              label="Пароль"
              type="password"
              id="password"
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
              Войти
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
            Нет аккаунта?
            <Link to="/signup">
              Регистрация
            </Link>
          </Typography>
        </Card>
      </Container>
    </Section>
  );
}