import React, { useState } from 'react'
import './styles.scss'

import { useForm, Controller } from 'react-hook-form'
import { api } from '../../routes/api'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

export function Contact() {
  const [response, setResponse] = useState('')
  const [showModal, setShowModal] = useState(false)

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Informe seu nome'),
    email: Yup.string()
      .email('Email inválido')
      .required('Informe um e-mail válido'),
    segment: Yup.string().required('Informe sua área de profissão'),
    messageField: Yup.string().required('O campo não pode ser vazio'),
    checkbox: Yup.bool().oneOf(
      [true],
      'Você deve concordar com a política de privacidade'
    )
  })

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      checkbox: false
    }
  })

  const onSubmit = async data => {
    try {
      await api.post('/api/contact', {
        name: data.name
      })
      setResponse(`Agradecemos o contato ${data.name}!`)
      setShowModal(true)
    } catch (error) {
      console.error('Erro ao enviar o formulário:', error)
    }
  }

  return (
    <section className="contact-container">
      <h1 className="contact-title">Não fique parado, fale conosco</h1>

      <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <input
                className="input-name"
                {...field}
                type="text"
                placeholder="Seu nome"
              />
            )}
          />
          {errors.name && <div className="error">{errors.name.message}</div>}
        </div>
        <div>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <input
                className="input-email"
                {...field}
                type="email"
                placeholder="Seu email"
              />
            )}
          />
          {errors.email && <div className="error">{errors.email.message}</div>}
        </div>
        <div className="select-input">
          <Controller
            name="segment"
            control={control}
            render={({ field }) => (
              <select {...field}>
                <option value="">Selecione um segmento</option>
                <option value="Educação">Educação</option>
                <option value="Engenharia">Engenharia</option>
                <option value="Saúde">Saúde</option>
                <option value="Tecnologia">Tecnologia</option>
              </select>
            )}
          />
          {errors.segment && (
            <div className="error">{errors.segment.message}</div>
          )}
        </div>
        <div className="text-area-content">
          <Controller
            name="messageField"
            control={control}
            render={({ field }) => (
              <textarea
                className="text-area"
                {...field}
                rows={10}
                placeholder="Fale um pouco sobre seu negócio"
              />
            )}
          />
          {errors.messageField && (
            <div className="error">{errors.messageField.message}</div>
          )}
        </div>
        <div className="information-confirmation-container">
          <Controller
            name="checkbox"
            control={control}
            render={({ field }) => (
              <div className="information-confirmation-content">
                <input {...field} className="checkbox" type="checkbox" />
                <label className="label" htmlFor="concordoPolitica">
                  Declaro que conheço a Política de Privacidade e autorizo a
                  utilização das minhas informações pelo SP Labs.
                </label>
              </div>
            )}
          />
          {errors.checkbox && (
            <div className="error">{errors.checkbox.message}</div>
          )}
        </div>
        <div className="button-submit">
          <button type="submit">Enviar</button>
        </div>
      </form>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-button">
              <button onClick={() => setShowModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <p>{response}</p>
          </div>
        </div>
      )}
    </section>
  )
}
