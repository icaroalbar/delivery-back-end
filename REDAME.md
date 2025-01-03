# Regras de Negócio do MVP de Pedido de Comida

Este documento descreve as principais regras de negócio implementadas no sistema de pedidos de comida.

## Entidades

### 1. **Food (Pedido)**

- **Atributos:**

  - `id`: Identificador único do pedido.
  - `phone`: Número de telefone do cliente.
  - `name`: Nome do pedido.
  - `products`: Lista de produtos do pedido (pode conter mais de um item).
  - `address`: Endereço de entrega do pedido.
  - `payment`: Informações de pagamento.
  - `delivery`: Informações da entrega, caso esteja atribuída.
  - `status`: Status do pedido (aguardando aceite, preparando, etc.).

- **Status do Pedido:**

  - `AGUARDANDO_ACEITE`: O pedido foi criado e aguarda aceitação.
  - `PREPARANDO`: O pedido foi aceito e está sendo preparado.
  - `RECUSADO`: O pedido foi recusado.
  - `AGUARDANDO_ENTREGADOR`: O pedido está pronto e aguarda a atribuição de um entregador.
  - `COM_ENTREGADOR`: O pedido está sendo entregue.
  - `ENTREGUE`: O pedido foi entregue.
  - `CANCELADO`: O pedido foi cancelado.

- **Métodos principais:**
  - `addDelivery(delivery)`: Atribui um entregador ao pedido, alterando o status para `COM_ENTREGADOR`.
  - `changeDelivery(delivery)`: Permite alterar o entregador, se já houver um atribuído.
  - `accepted()`: Altera o status para `PREPARANDO` quando o pedido é aceito.
  - `refuse()`: Altera o status para `RECUSADO` quando o pedido é recusado.
  - `ready()`: Altera o status para `AGUARDANDO_ENTREGADOR` quando o pedido está pronto para entrega.
  - `cancel()`: Cancela o pedido, alterando o status para `CANCELADO`.
  - `delivered()`: Marca o pedido como entregue, alterando o status para `ENTREGUE`.

### 2. **Menu (Produto)**

- **Atributos:**

  - `id`: Identificador único do produto.
  - `name`: Nome do produto.
  - `category`: Categoria do produto (ex: pizza salgada, pizza doce, etc.).
  - `price`: Preço do produto.
  - `quantity`: Quantidade do produto no pedido.
  - `description`: Descrição do produto.
  - `image`: Imagem do produto.

- **Métodos principais:**
  - `getTotal()`: Calcula o valor total do produto, multiplicando o preço pela quantidade.
  - `isAvailable()`: Verifica se o produto está disponível para venda.
  - `active()`: Ativa o produto (disponível para venda).
  - `deactivate()`: Desativa o produto (indisponível para venda).

### 3. **Payment (Pagamento)**

- **Atributos:**

  - `id`: Identificador único do pagamento.
  - `type`: Tipo de pagamento (ex: débito, crédito).
  - `value`: Valor do pagamento.

- **Métodos principais:**
  - Nenhum método específico adicional para a entidade `Payment`.

### 4. **Address (Endereço)**

- **Atributos:**

  - `id`: Identificador único do endereço.
  - `street`: Nome da rua.
  - `number`: Número da residência.
  - `district`: Bairro.

- **Métodos principais:**
  - Nenhum método específico adicional para a entidade `Address`.

### 5. **Delivery (Entrega)**

- **Atributos:**

  - `id`: Identificador único da entrega.
  - `name`: Nome do entregador.
  - `plate`: Placa do veículo do entregador.

- **Métodos principais:**
  - Nenhum método específico adicional para a entidade `Delivery`.

## Regras de Negócio

### 1. **Pedido**

- Um pedido pode conter múltiplos produtos (itens).
- O pedido é criado com o status `AGUARDANDO_ACEITE`, aguardando a aceitação do restaurante.
- O status do pedido pode ser alterado para `PREPARANDO` se o restaurante aceitar o pedido.
- O status é alterado para `AGUARDANDO_ENTREGADOR` quando o pedido está pronto para ser entregue.
- O entregador é atribuído ao pedido e o status muda para `COM_ENTREGADOR`.
- Após a entrega, o status do pedido é alterado para `ENTREGUE`.
- O pedido pode ser cancelado a qualquer momento, com o status sendo alterado para `CANCELADO`.

### 2. **Produto**

- O produto pode ter uma quantidade especificada no pedido.
- O preço do produto é multiplicado pela quantidade para calcular o total.
- O produto pode ser ativado ou desativado, com base na disponibilidade.

### 3. **Pagamento**

- O pagamento é realizado no valor total do pedido e deve ser especificado pelo tipo (ex: débito, crédito).

### 4. **Entrega**

- A entrega é atribuída a um entregador específico.
- A entrega é identificada pelo nome do entregador e a placa do veículo.

## Melhorias e Sugestões

### 1. **Notificação e Comunicação com o Cliente**

- Adicionar um mecanismo de notificação para informar o cliente sobre o status do pedido (aceitação, preparo, envio, entrega).
- Incluir uma comunicação direta com o entregador quando o pedido for atribuído a um.

### 2. **Controle de Estoque**

- Implementar o controle de estoque para cada produto, diminuindo a quantidade do produto quando um pedido for confirmado.

### 3. **Acompanhamento de Entrega**

- Implementar um sistema de acompanhamento de entrega, onde o cliente possa visualizar o status da entrega em tempo real (em trânsito, chegando, etc.).

### 4. **Pagamentos Parciais ou Diferidos**

- Permitir que o pagamento seja feito parcialmente ou de forma diferida (ex: pagamento ao entregador após a entrega).

### 5. **Histórico de Pedidos**

- Implementar um histórico de pedidos para que o cliente possa visualizar pedidos anteriores e reeditá-los, se necessário.

## Considerações Finais

As regras de negócio descritas aqui visam garantir a funcionalidade básica do sistema de pedidos de comida, assegurando uma gestão eficiente dos pedidos, pagamentos e entregas. As melhorias sugeridas podem ser implementadas ao longo do tempo para adicionar mais recursos e refinar a experiência do usuário.
