
# Requisitos para backend da aplicação "Mensagens para Telão"

## Visão Geral
A aplicação permite que usuários enviem mensagens de texto, imagens ou vídeos para serem exibidos em um telão. As mensagens são enviadas através de uma interface web, onde o usuário preenche informações e envia para aprovação. Após aprovadas, as mensagens são exibidas em um telão em modo de apresentação.

## Tipos de Dados

### Mensagem (Message)
```typescript
interface Message {
  id: string;
  type: 'text' | 'image' | 'video';
  content: string; // Texto ou URL do arquivo
  duration: number; // Duração em segundos
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string; // ISO date string
  userId?: string; // Opcional, se implementar autenticação
}
```

## Endpoints Necessários

### 1. GET /api/messages
- **Descrição**: Recupera todas as mensagens aprovadas para exibição no telão
- **Parâmetros**: Nenhum ou filtro de status
- **Resposta**:
  ```json
  {
    "messages": [
      {
        "id": "1",
        "type": "text",
        "content": "Feliz aniversário Maria!",
        "duration": 8,
        "status": "approved",
        "createdAt": "2025-05-17T14:30:00Z"
      },
      // ... mais mensagens
    ]
  }
  ```

### 2. POST /api/messages
- **Descrição**: Envia uma nova mensagem para aprovação
- **Body**:
  ```json
  {
    "type": "text", // ou "image" ou "video"
    "content": "Mensagem aqui...",
    "duration": 10
  }
  ```
- **Resposta**:
  ```json
  {
    "id": "123",
    "message": "Mensagem enviada com sucesso e aguardando aprovação"
  }
  ```

### 3. POST /api/files/upload
- **Descrição**: Upload de arquivos (imagens/vídeos)
- **Formato**: Multipart/form-data
- **Campos**:
  - `file`: Arquivo a ser enviado
  - `type`: "image" ou "video"
- **Resposta**:
  ```json
  {
    "url": "https://seuservidor.com/arquivos/imagem123.jpg",
    "fileId": "123"
  }
  ```

### 4. GET /api/messages/:id
- **Descrição**: Recupera uma mensagem específica
- **Parâmetros**: ID da mensagem
- **Resposta**: Objeto de mensagem completo

### 5. PUT /api/admin/messages/:id/approve
- **Descrição**: Aprova uma mensagem (requer autenticação de admin)
- **Parâmetros**: ID da mensagem
- **Resposta**: Confirmação de aprovação

### 6. PUT /api/admin/messages/:id/reject
- **Descrição**: Rejeita uma mensagem (requer autenticação de admin)
- **Parâmetros**: ID da mensagem
- **Resposta**: Confirmação de rejeição

## Sistema de Pagamento (opcional)
Se implementar pagamento para exibição de mensagens:

### 7. POST /api/payment/checkout
- **Descrição**: Cria uma sessão de checkout para pagamento
- **Body**:
  ```json
  {
    "messageId": "123",
    "amount": 1000, // valor em centavos
    "description": "Exibição de mensagem no telão"
  }
  ```
- **Resposta**:
  ```json
  {
    "checkoutUrl": "https://checkout.stripe.com/...",
    "sessionId": "sess_123"
  }
  ```

### 8. POST /api/payment/webhook
- **Descrição**: Endpoint para receber webhooks do serviço de pagamento
- **Segurança**: Verificação de assinatura

## Características Adicionais

1. **Autenticação (opcional)**:
   - Endpoints para registro e login de usuários
   - Proteção de rotas administrativas

2. **Validação**:
   - Tamanho máximo para mensagens de texto: 200 caracteres
   - Formatos suportados para imagens: JPG, PNG, GIF (max 5MB)
   - Formatos suportados para vídeos: MP4, MOV (max 50MB)
   - Duração máxima de vídeos: 30 segundos

3. **Moderação**:
   - API para moderação automática de conteúdo (opcional)
   - Interface administrativa para revisão manual

## Considerações Técnicas

1. **Armazenamento**:
   - Recomendado: Amazon S3, Google Cloud Storage ou similar para arquivos
   - Banco de dados: PostgreSQL, MongoDB ou similar para metadados

2. **Segurança**:
   - Validar todos os inputs
   - Sanitizar conteúdo das mensagens
   - Implementar rate limiting
   - CORS configurado corretamente

3. **Performance**:
   - Implementar cache para mensagens aprovadas
   - Considerar CDN para arquivos de mídia

4. **Websockets (opcional)**:
   - Para atualizações em tempo real no telão quando novas mensagens forem aprovadas
